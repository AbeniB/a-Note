import "../Component Styles/Note.css";

export default function Note(){
    return(<>
        <div className="note">
            <p>Note Title</p>
            <textarea cols={20} rows={10}>Note Body</textarea>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    </>)
}