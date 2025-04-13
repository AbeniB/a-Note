import "../Component Styles/Note.css";

export default function Note({attribute_prop, method_prop}){
    const {id, title, body, date_created} = attribute_prop;
    const {archiveNote, deleteNote} = method_prop;

    return(
    <>
        <div className="note">
            <p>{title}</p>
            <textarea cols={30} rows={20} readOnly>{body}</textarea>
            <div>
                <button>Edit</button>
                <button onClick={() => deleteNote(id)}>Delete</button>
                <button onClick={() => archiveNote(id)}>Archive</button>
            </div>
            <p>Created_At: {date_created}</p>
        </div>
    </>)
}