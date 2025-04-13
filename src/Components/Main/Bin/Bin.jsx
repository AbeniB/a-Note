import Note from "../Main/Note";
import "../../Component Styles/content.css";

export default function Bin({binList}){
    return (
    <>
        <div className="content">
            <div className="noteList">
                {
                    binList.map(note => {
                        const attribute_prop = {
                            id: note.id,
                            title: note.title, 
                            body: note.body, 
                            date_created: note.date_created
                        }
                        const method_prop = {
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