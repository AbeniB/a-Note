import './AddNote.css';

export default function AddNote({add_note_prop}){
    const {note, handleChange, addNote } = add_note_prop;
    return(
    <div className="addNote">
        <input name="title" type="text" placeholder="title" onChange={handleChange} value={note.title}/>
        <textarea name="body" cols={100} rows={10} placeholder="Type Something...." onChange={handleChange} value={note.body}></textarea>
        <button className='addNoteBtn button' onClick={addNote}><span>Add Note</span><img width="30" height="30" src="https://img.icons8.com/external-icongeek26-outline-icongeek26/50/external-notes-documents-icongeek26-outline-icongeek26.png" alt="external-notes-documents-icongeek26-outline-icongeek26"/></button>
    </div>);
}