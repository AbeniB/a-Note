import "./Note.css";

export default function Note({note_prop}){
    const {id, title, body, date_created, archiveNote, trashNote, openEditor,
        restoreNote, deletePermanently, state} = note_prop;

    return(
    <>
        <div className="note">
            <p>{title}</p>
            <textarea cols={25} rows={20} readOnly value={body}></textarea>
            <div className="button_Holder">
                {state !== 'trash' && <button className="button" onClick={() => openEditor(id)}>View</button>}
                {state !== 'archive' && state !== 'trash' && <button className="button" onClick={() => archiveNote(id)}>Archive</button>}
                {state === 'archive' && state !== 'trash' && <button className="button" onClick={() => restoreNote(id)}>Unarchive</button>}
                {state !== 'trash' && <button className="button" onClick={() => trashNote(id)}>Trash</button>}
                {state === 'trash' && <button className="button" onClick={() => restoreNote(id)}>Restore</button>}
                {state === 'trash' && <button className="button" onClick={() => deletePermanently(id)}>Delete</button>}
            </div>
            <p>Created: {date_created}</p>
        </div>
    </>)
}