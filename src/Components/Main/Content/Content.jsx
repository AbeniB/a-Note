import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

import NoteList from "./NoteList/NoteList";
import AddNote from './AddNote/AddNote';
import "./content.css";

export default function Content({content_prop}){
    const {currentPage} = content_prop;

    const [note, setNote] = useState({
        id: null,
        title: "",
        body: "",
        date_created: null,
        rPage: "note"
    });

    const [noteList, setNoteList] = useState([]);

    function handleChange(e){
        const {value, name} = e.target;
        setNote(pV => ({...pV, [name]: value}));
    }

    function addNote(){
        const newNote = {
            ...note,
            id: uuidv4(),
            date_created: new Date().toDateString()
        }
        setNoteList(pV => [...pV, newNote]);
    }

    function archiveNote(id) {
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, rPage: 'archive' } : note
            )
        );
    }

    function trashNote(id){
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, rPage: 'trash' } : note
            )
        );
    }

    const add_note_prop = {
        note: note,
        handleChange: handleChange,
        addNote: addNote
    }

    const note_list_prop = {
        noteList: noteList,
        archiveNote: archiveNote,
        trashNote: trashNote,
        currentPage: currentPage
    }

    return (
    <>
        <div className="content">
            {currentPage === 'note' && <AddNote add_note_prop={add_note_prop}/>}
            <NoteList note_list_prop={note_list_prop}/>
        </div>
    </>
    );
}