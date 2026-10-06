import 'dotenv/config';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';
import { initialize, checkAuthenticated, checkNotAuthenticated } from './auth.js';
import { connectDatabase, register, createNote, getUserNotes, updateNote, deleteNote, updateUserProfile } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.LONG_ENCRYPTION_STRING;
const allowedOrigins = process.env.CLIENT_ORIGINS
  ? process.env.CLIENT_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : isProduction
    ? []
    : ['http://localhost:3000', 'http://localhost:5173'];

if (isProduction && (!sessionSecret || sessionSecret.length < 32)) {
  throw new Error('LONG_ENCRYPTION_STRING must be set to at least 32 characters in production.');
}

if (isProduction && allowedOrigins.length === 0) {
  throw new Error('CLIENT_ORIGINS must include the deployed frontend origin in production.');
}

if (isProduction) {
  app.set('trust proxy', 1);
}

initialize(passport);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(session({
  secret: sessionSecret || 'a-note-dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true, sameSite: 'lax', secure: isProduction }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/session', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(200).json({ authenticated: false });
  }

  const user = req.user;
  return res.status(200).json({
    authenticated: true,
    user: {
      id: user.id || user._id?.toString(),
      username: user.username,
      email: user.email
    }
  });
});

app.route('/api/signup')
  .post(checkNotAuthenticated, async (req, res) => {
    try {
      const user = await register(req.body);
      return res.status(201).json({
        message: 'Signup Successful',
        user: {
          id: user.id || user._id?.toString(),
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      const status = error.code === 'INVALID_SIGNUP' ? 400 : error.code === 'EMAIL_TAKEN' ? 409 : 500;
      const message = status < 500 ? error.message : 'Signup failed';
      return res.status(status).json({ message });
    }
  });

app.route('/api/login')
  .post(checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', { failWithError: true }, (error, user, info) => {
      if (error) {
        return next(error);
      }

      if (!user) {
        return res.status(401).json({ message: info?.message || 'Login failed' });
      }

      req.login(user, (loginError) => {
        if (loginError) {
          return next(loginError);
        }

        return res.status(200).json({
          message: 'Login Successful',
          user: {
            id: user.id || user._id?.toString(),
            username: user.username,
            email: user.email
          }
        });
      });
    })(req, res, next);
  });

app.post('/api/logout', (req, res) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({ message: 'Logout unsuccessful' });
    }

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Logout successful' });
    });
  });
});

app.put('/api/profile', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id?.toString();
    const user = await updateUserProfile(userId, req.body || {});
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user.id || user._id?.toString(),
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    const status = error.code === 'INVALID_PROFILE' ? 400 : error.code === 'EMAIL_TAKEN' ? 409 : 500;
    const message = status < 500 ? error.message : 'Unable to update profile';
    return res.status(status).json({ message });
  }
});

app.get('/api/notes', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id?.toString();
    const notes = await getUserNotes(userId);
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to fetch notes' });
  }
});

app.post('/api/notes', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id?.toString();
    const noteData = req.body || {};
    const createdNote = await createNote(userId, noteData);
    return res.status(201).json({ message: 'Note created', note: createdNote });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to create note' });
  }
});

app.put('/api/notes/:id', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id?.toString();
    const updatedNote = await updateNote(userId, req.params.id, req.body || {});
    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json({ message: 'Note updated', note: updatedNote });
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to update note' });
  }
});

app.delete('/api/notes/:id', checkAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id || req.user._id?.toString();
    const response = await deleteNote(userId, req.params.id);
    if (!response.success) {
      return res.status(404).json({ message: 'Note not found' });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ message: error.message || 'Unable to delete note' });
  }
});

await connectDatabase();
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}.`));