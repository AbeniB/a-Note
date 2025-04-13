import "./Note.css";

export default function Note({note_prop}){
    const {id, title, body, date_created, archiveNote, trashNote, openEditor} = note_prop;

    return(
    <>
        <div className="note">
            <p>{title}</p>
            <textarea cols={30} rows={20} readOnly value={body}></textarea>
            <div>
                <button onClick={() => trashNote(id)}>Delete</button>
                <button onClick={() => archiveNote(id)}>Archive</button>
                <button onClick={() => openEditor(id)}>Update</button>
            </div>
            <p>Created_At: {date_created}</p>
        </div>
    </>)
}