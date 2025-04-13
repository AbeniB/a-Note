import './AddNote.css';

export default function AddNote({add_note_prop}){
    const {note, handleChange, addNote } = add_note_prop;
    return(
    <div className="addNote">
        <input name="title" type="text" placeholder="title" onChange={handleChange} value={note.title}/>
        <textarea name="body" cols={100} rows={5} placeholder="Type Something...." onChange={handleChange} value={note.body}></textarea>
        <button onClick={addNote} >Add Note +</button>
    </div>);
}