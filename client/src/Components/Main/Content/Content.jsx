import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import MainContext from "../../../Contexts/MainContext";
import ContentContext from "../../../Contexts/ContentContext";
import { useContext } from 'react';

import NoteList from "./NoteList/NoteList";
import AddNote from './AddNote/AddNote';
import "./content.css";

export default function Content(){
    const {currentPage} = useContext(MainContext);
    const [openEdit, setOpenEdit] = useState(true);
    
    const [noteU, setNoteU] = useState({});
    const [note, setNote] = useState({
        id: null,
        title: "",
        body: "",
        date_created: null,
        state: "note"
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
                note.id === id ? { ...note, state: 'archive' } : note
            )
        );
    }

    function trashNote(id){
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, state: 'trash' } : note
            )
        );
    }

    function restoreNote(id) {
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...note, state: 'note' } : note
            )
        );
    }

    function deletePermanently(id){
        setNoteList(prevNotes =>
            prevNotes.map(note => note.id !== id)
        );
    }


    function openEditor(id){
        const note = noteList.find(note => note.id === id);
        setNoteU(note);
        setOpenEdit(false);
    }

    function handleChangeU(e){
        const {value, name} = e.target;
        setNoteU(pV => ({...pV, [name]: value}));
    }

    function closeEditor(){
        setOpenEdit(true);
    }

    function updateNote(id){
        setNoteList(prevNotes =>
            prevNotes.map(note =>
                note.id === id ? { ...noteU } : note
            )
        );
        setOpenEdit(true);
        console.log(noteU);
    }


    return (
    <ContentContext.Provider value={{note, handleChange, addNote, noteList, archiveNote, trashNote, openEditor, restoreNote, deletePermanently}}>
        <div className={`content ${currentPage !== 'note' && 'archive-trash' }`}>
            {currentPage === 'note' && <AddNote />}
            <NoteList />
            <div className={`editor-container ${openEdit && 'collapse'}`}>
                <div className='editor-inner' onChange={handleChangeU}>
                    <div><button className='button' onClick={closeEditor}>Close</button></div><br/>
                    <div>
                        <input name='title' type='text' value={noteU.title}/>
                    </div><br/>
                    <textarea name='body' cols={40} rows={45} value={noteU.body}></textarea>
                    <button className='button' onClick={() => updateNote(noteU.id)}>Update</button>
                </div>
            </div>
        </div>
    </ContentContext.Provider>
    );
}