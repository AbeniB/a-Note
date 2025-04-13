import "./Note.css";

export default function Note({note_prop}){
    const {id, title, body, date_created, archiveNote, trashNote} = note_prop;
    console.log(note_prop)

    return(
    <>
        <div className="note">
            <p>{title}</p>
            <textarea cols={30} rows={20} readOnly>{body}</textarea>
            <div>
                <button onClick={() => trashNote(id)}>Delete</button>
                <button onClick={() => archiveNote(id)}>Archive</button>
            </div>
            <p>Created_At: {date_created}</p>
        </div>
    </>)
}