import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

import Note from "../Note";
import "../Component Styles/content.css";

export default function Content({handleArchive}){
    const [noteList, setNoteList] = useState([]);
    const [note, setNote] = useState({
        id: null,
        title: "",
        body: "",
        date_created: null
    });

    function handleChange(e){
        const {value, name} = e.target;
        setNote(pv => ({...pv, [name]: value}));
    }

    function addNote(){
        const newNote = {
            ...note,
            id: uuidv4(),
            date_created: new Date().toDateString()
        }
        setNoteList((pV) => [...pV, newNote]);
    }

    function deleteNote(id){
        const newList = noteList.filter((note) => note.id !== id);
        setNoteList(newList);
    }

    function archiveNote(id){
        const note = noteList.find(note => note.id === id);
        deleteNote(id);
        handleArchive(note);
    }

    return (
    <>
        <div className="content">
            <div className="addNote">
                <input name="title" type="text" placeholder="title" onChange={handleChange} value={note.title}/>
                <textarea name="body" cols={100} rows={5} placeholder="Type Something...." onChange={handleChange} value={note.body}></textarea>
                <button onClick={addNote} >Add Note +</button>
            </div>
            <div className="noteList">
                {
                    noteList.map(note => {
                        const attribute_prop = {
                            id: note.id,
                            title: note.title, 
                            body: note.body, 
                            date_created: note.date_created
                        }
                        const method_prop = {
                            archiveNote: archiveNote,
                            deleteNote: deleteNote
                        }
                        return <Note key={note.id} attribute_prop={attribute_prop} method_prop={method_prop}/>
                    })
                }
            </div>
        </div>
    </>
    );
}