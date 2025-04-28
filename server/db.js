import 'dotenv/config';
import * as mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const uri = process.env.MONGODB_URI;

mongoose.connect(uri);

const coll_Notes_Schema = new mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const coll_Users_Schema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note'
    }]
  }, { timestamps: true });

coll_Users_Schema.plugin(passportLocalMongoose, {usernameField: 'email'});
  
export const coll_Notes = mongoose.model('Note', coll_Notes_Schema);
export const coll_Users = mongoose.model('User', coll_Users_Schema);

export async function register(userInfo){
    try{
        const response = await coll_Users.register({
            username: userInfo.username, 
            email: userInfo.email,
            notes: []
        }, userInfo.password);

        return response;
    }catch(err){
        throw new Error(`Registration Failed: ${err}`);
    }
}

export async function login(userLogInInfo) {
    const {email, password} = userLogInInfo;
    const user = await coll_Users.authenticate()(email, password);
    if (!user) throw new Error('Incorrect Credentials');
  
    return user;
}

export async function createNote(userId, noteData) {
    try {
        const newNote = new coll_Notes({
            title: noteData.title,
            content: noteData.content,
            user: userId
        });
        
        const savedNote = await newNote.save();
        
        await coll_Users.findByIdAndUpdate(
            userId,
            { $push: { notes: savedNote._id } }
        );
        
        return savedNote;
    } catch (err) {
        throw new Error(`Failed to create note: ${err}`);
    }
}

export async function getUserNotes(userId) {
    try {
        const user = await coll_Users.findById(userId).populate('notes');
        return user.notes;
    } catch (err) {
        throw new Error(`Failed to get user notes: ${err}`);
    }
}

export async function updateNote(noteId, noteData) {
    try {
        const updatedNote = await coll_Notes.findByIdAndUpdate(
            noteId,
            { title: noteData.title, content: noteData.content },
            { new: true }
        );
        return updatedNote;
    } catch (err) {
        throw new Error(`Failed to update note: ${err}`);
    }
}

export async function deleteNote(userId, noteId) {
    try {
        await coll_Notes.findByIdAndDelete(noteId);
        
        await coll_Users.findByIdAndUpdate(
            userId,
            { $pull: { notes: noteId } }
        );
        
        return { success: true };
    } catch (err) {
        throw new Error(`Failed to delete note: ${err}`);
    }
}