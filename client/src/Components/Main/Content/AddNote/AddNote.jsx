import './AddNote.css';
import ContentContext from "../../../../Contexts/ContentContext";
import { useContext } from 'react';

export default function AddNote(){
    const {note, handleChange, addNote } = useContext(ContentContext);
    return(
    <div className="addNote">
        <input name="title" type="text" placeholder="title" onChange={handleChange} value={note.title}/>
        <textarea name="body" cols={100} rows={30} placeholder="Type Something...." onChange={handleChange} value={note.body}></textarea>
        <a href='#noteList'><button className='addNoteBtn button' onClick={addNote}><span>Add Note</span><img width="30" height="30" src="https://img.icons8.com/external-icongeek26-outline-icongeek26/50/external-notes-documents-icongeek26-outline-icongeek26.png" alt="external-notes-documents-icongeek26-outline-icongeek26"/></button></a>
    </div>);
}