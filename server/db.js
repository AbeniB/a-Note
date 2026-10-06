import 'dotenv/config';
import crypto from 'crypto';
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB_NAME || 'a_note';
const memoryUsers = new Map();
const memoryNotes = new Map();

const normalizeEmail = (email = '') => String(email).trim().toLowerCase();
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export function hashPassword(password) {
  return crypto.createHash('sha256').update(String(password)).digest('hex');
}

export function verifyPassword(password, storedHash) {
  return hashPassword(password) === storedHash;
}

const isMongoReady = () => !!uri && mongoose.connection && mongoose.connection.readyState === 1;
const useMemoryStorage = () => process.env.NODE_ENV !== 'production' && !isMongoReady();

export async function connectDatabase() {
  if (!uri) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI is required in production.');
    }

    console.warn('MONGODB_URI is not configured; using in-memory data storage.');
    return false;
  }

  try {
    await mongoose.connect(uri, { dbName: databaseName });
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw error;
    }

    console.warn('MongoDB connection unavailable; switching to in-memory data storage.');
    return false;
  }
}

const coll_Notes_Schema = new mongoose.Schema({
  title: String,
  content: String,
  state: { type: String, default: 'note' },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

const coll_Users_Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  notes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Note'
  }]
}, { timestamps: true });

coll_Users_Schema.plugin(passportLocalMongoose, { usernameField: 'email' });

export const coll_Notes = mongoose.model('Note', coll_Notes_Schema);
export const coll_Users = mongoose.model('User', coll_Users_Schema);

export async function findUserByEmail(email) {
  const normalizedEmail = normalizeEmail(email);

  if (!useMemoryStorage()) {
    return coll_Users.findOne({ email: normalizedEmail });
  }

  return [...memoryUsers.values()].find((user) => user.email === normalizedEmail) || null;
}

export async function findUserById(id) {
  const normalizedId = String(id);

  if (!useMemoryStorage()) {
    return coll_Users.findById(normalizedId);
  }

  return [...memoryUsers.values()].find((user) => String(user.id) === normalizedId) || null;
}

export async function register(userInfo) {
  const payload = {
    username: String(userInfo.username || '').trim(),
    email: normalizeEmail(userInfo.email),
    password: hashPassword(userInfo.password)
  };

  if (!payload.username || payload.username.length > 50 || !isValidEmail(payload.email) || !userInfo.password) {
    const error = new Error('Enter a valid username, email and password');
    error.code = 'INVALID_SIGNUP';
    throw error;
  }

  if (useMemoryStorage()) {
    if (memoryUsers.has(payload.email)) {
      const error = new Error('Email address is already in use');
      error.code = 'EMAIL_TAKEN';
      throw error;
    }

    const user = {
      id: crypto.randomUUID(),
      username: payload.username,
      email: payload.email,
      password: payload.password,
      notes: []
    };

    memoryUsers.set(payload.email, user);
    return user;
  }

  try {
    const response = await coll_Users.register({
      username: payload.username,
      email: payload.email,
      notes: []
    }, userInfo.password);

    return response;
  } catch (err) {
    if (err.code === 11000 || err.name === 'UserExistsError') {
      const error = new Error('Email address is already in use');
      error.code = 'EMAIL_TAKEN';
      throw error;
    }

    console.error('User registration failed:', err.name || 'DatabaseError');
    throw new Error('Registration failed');
  }
}

export async function updateUserProfile(userId, profileData) {
  const normalizedId = String(userId);
  const username = String(profileData.username || '').trim();
  const email = normalizeEmail(profileData.email);

  if (!username || username.length > 50 || !isValidEmail(email) || email.length > 254) {
    const error = new Error('Enter a valid username and email address');
    error.code = 'INVALID_PROFILE';
    throw error;
  }

  if (useMemoryStorage()) {
    const userEntry = [...memoryUsers.entries()].find(([, user]) => String(user.id) === normalizedId);
    if (!userEntry) return null;

    const [currentEmail, currentUser] = userEntry;
    const existingEmail = [...memoryUsers.entries()].find(
      ([storedEmail, user]) => storedEmail === email && String(user.id) !== normalizedId
    );
    if (existingEmail) {
      const error = new Error('Email address is already in use');
      error.code = 'EMAIL_TAKEN';
      throw error;
    }

    memoryUsers.delete(currentEmail);
    const updatedUser = { ...currentUser, username, email };
    memoryUsers.set(email, updatedUser);
    return updatedUser;
  }

  try {
    return await coll_Users.findByIdAndUpdate(
      normalizedId,
      { username, email },
      { new: true, runValidators: true }
    );
  } catch (cause) {
    if (cause.code === 11000) {
      const error = new Error('Email address is already in use');
      error.code = 'EMAIL_TAKEN';
      throw error;
    }

    throw new Error('Failed to update profile');
  }
}

export async function login(userLogInInfo) {
  const { email, password } = userLogInInfo;
  const normalizedEmail = normalizeEmail(email);

  if (useMemoryStorage()) {
    const user = [...memoryUsers.values()].find((entry) => entry.email === normalizedEmail);
    if (!user || !verifyPassword(password, user.password)) {
      throw new Error('Incorrect Credentials');
    }
    return user;
  }

  const user = await coll_Users.findOne({ email: normalizedEmail });
  if (!user || !(await user.authenticate(password))) {
    throw new Error('Incorrect Credentials');
  }

  return user;
}

export async function createNote(userId, noteData) {
  const notePayload = {
    title: String(noteData.title || '').trim(),
    content: String(noteData.content ?? noteData.body ?? '').trim(),
    state: noteData.state || 'note',
    user: String(userId)
  };

  if (useMemoryStorage()) {
    const note = {
      id: crypto.randomUUID(),
      ...notePayload,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const userNotes = memoryNotes.get(String(userId)) || [];
    userNotes.push(note);
    memoryNotes.set(String(userId), userNotes);
    return note;
  }

  try {
    const newNote = new coll_Notes({
      title: notePayload.title,
      content: notePayload.content,
      state: notePayload.state,
      user: userId
    });

    const savedNote = await newNote.save();

    await coll_Users.findByIdAndUpdate(
      userId,
      { $push: { notes: savedNote._id } }
    );

    return savedNote;
  } catch (err) {
    console.error('Note creation failed:', err.name || 'DatabaseError');
    throw new Error('Failed to create note');
  }
}

export async function getUserNotes(userId) {
  const normalizedId = String(userId);

  if (useMemoryStorage()) {
    return memoryNotes.get(normalizedId) || [];
  }

  try {
    const user = await coll_Users.findById(normalizedId).populate('notes');
    return user ? user.notes : [];
  } catch (err) {
    console.error('Fetching notes failed:', err.name || 'DatabaseError');
    throw new Error('Failed to fetch notes');
  }
}

export async function updateNote(userId, noteId, noteData) {
  const normalizedUserId = String(userId);
  const notePayload = {
    title: String(noteData.title || '').trim(),
    content: String(noteData.content ?? noteData.body ?? '').trim(),
    state: noteData.state || 'note'
  };

  if (useMemoryStorage()) {
    const notes = memoryNotes.get(normalizedUserId) || [];
    const noteIndex = notes.findIndex((note) => String(note.id) === String(noteId));
    if (noteIndex === -1) return null;

    const updatedNote = {
      ...notes[noteIndex],
      title: notePayload.title,
      content: notePayload.content,
      state: notePayload.state,
      updatedAt: new Date().toISOString()
    };

    notes[noteIndex] = updatedNote;
    return updatedNote;
  }

  try {
    if (!mongoose.isValidObjectId(noteId)) return null;

    return await coll_Notes.findOneAndUpdate(
      { _id: noteId, user: normalizedUserId },
      { title: notePayload.title, content: notePayload.content, state: notePayload.state },
      { new: true }
    );
  } catch (err) {
    console.error('Note update failed:', err.name || 'DatabaseError');
    throw new Error('Failed to update note');
  }
}

export async function deleteNote(userId, noteId) {
  const normalizedUserId = String(userId);
  const normalizedNoteId = String(noteId);

  if (useMemoryStorage()) {
    let deleted = false;

    for (const [userKey, notes] of memoryNotes.entries()) {
      if (userKey !== normalizedUserId) continue;

      const remainingNotes = notes.filter((note) => String(note.id) !== normalizedNoteId);
      if (remainingNotes.length !== notes.length) {
        memoryNotes.set(userKey, remainingNotes);
        deleted = true;
      }
    }

    return deleted ? { success: true } : { success: false };
  }

  try {
    if (!mongoose.isValidObjectId(normalizedNoteId)) return { success: false };

    const deletedNote = await coll_Notes.findOneAndDelete({
      _id: normalizedNoteId,
      user: normalizedUserId
    });
    if (!deletedNote) return { success: false };

    await coll_Users.findByIdAndUpdate(
      normalizedUserId,
      { $pull: { notes: normalizedNoteId } }
    );

    return { success: true };
  } catch (err) {
    console.error('Note deletion failed:', err.name || 'DatabaseError');
    throw new Error('Failed to delete note');
  }
}