import Note from "../Main/Note";
import "../../Component Styles/content.css";

export default function Archived({archivedList, deleteNote}){
    return (
    <>
        <div className="content">
            <div className="noteList">
                {
                    archivedList.map(note => {
                        const attribute_prop = {
                            id: note.id,
                            title: note.title, 
                            body: note.body, 
                            date_created: note.date_created
                        }
                        const method_prop = {
                            deleteNote: ()=>{console.log("deleted")}
                        }
                        return <Note key={note.id} attribute_prop={attribute_prop} method_prop={method_prop}/>
                    })
                }
            </div>
        </div>
    </>
    );
}