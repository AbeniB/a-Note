import Note from "./Note";

import "../Component Styles/content.css";

export default function Content(){
    return (
    <>
        <div className="content">
            <div className="addNote">
                <input type="text" placeholder="title" />
                <textarea cols={100} rows={5} placeholder="Content"></textarea>
                <button>Add Note +</button>
            </div>
            <div className="noteList">
                <Note />
            </div>
        </div>
    </>
    );
}