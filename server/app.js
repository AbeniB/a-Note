import 'dotenv/config';
import express from "express";
import passport from "passport";
import session from "express-session";
import { initialize, checkAuthenticated, checkNotAuthenticated } from "./auth.js";
import {register, createNote, getUserNotes, updateNote, deleteNote} from "./db.js";
import cors from "cors";

const app = express();
const hostname = 'localhost';
const PORT = process.env.PORT || 5000;

initialize(passport);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
  }))
app.use(session({
    secret: process.env.LONG_ENCRYPTION_STRING,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true})); 




app.route('/api/signup')
.post(checkNotAuthenticated, (req, res)=>{
    const userInfo = req.body;

    register(userInfo).then(resp => {
        res.status(201).json({
            message: "Signup Successfull",
            user: resp.username
        });
    }).catch(err => res.status(409).json({ error: `Some error during registration ${err}` }));
});


app.route('/api/login')
.post(
checkNotAuthenticated,
passport.authenticate('local',{ 
    failWithError: true  // Forces 401 instead of redirect
}), 
(req, res) => {
    // Successful authentication
    res.status(200).json({
        message: "Login Successful",
        user: {
            username: req.user.username,
            email: req.user.email
        }
    });
}, 
(err, req, res, next) => { 
    // Error handler
    // This will handle authentication errors
    res.status(401).json({
        message: "Login failed",
        error: err.message
    });
});


app.post('/api/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            console.error(err);
            return res.status(404).json({message: 'logOut Unsuccessfull'});
        }
        res.status(201).json({message: 'logOut sucess'});
    });
})


app.post('/api/createNote', checkAuthenticated, (req, res)=>{
    const noteData = req.body.noteData;
    createNote(req.user.id, noteData).then(resp => console.log(resp)).catch(e => console.error(e));
});
app.post('/api/getUserNotes', checkAuthenticated, (req, res)=>{
    getUserNotes(req.user.id).then(resp => resp).catch(e => console.error(e));
});
app.post('/api/updateNote', checkAuthenticated, (req, res)=>{
    const noteData = req.body.noteData;
    updateNote(req.user.id, noteData).then(resp => console.log(resp)).catch(e => console.error(e));
});
app.post('/api/deleteNote', checkAuthenticated, (req, res)=>{
    const noteData = req.body.noteData;
    deleteNote(req.user.id, noteData).then(resp => console.log(resp)).catch(e => console.error(e));
});

app.listen(PORT, () => console.log(`Server is running at http://${hostname}:${PORT}/`));