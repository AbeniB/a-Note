import Note from './Note/Note'
import './NoteList.css';

export default function NoteList({note_list_prop}){
    const {
        noteList,
        archiveNote,
        trashNote,
        currentPage,
        openEditor
    } = note_list_prop;
    
    function listNotes(){
        const renderdList = noteList.filter(note => note.state === currentPage);
        return renderdList.map(note => {
                const note_prop = {
                    id: note.id,
                    title: note.title, 
                    body: note.body, 
                    date_created: note.date_created,
                    archiveNote: archiveNote,
                    trashNote: trashNote,
                    openEditor: openEditor
                }
                return <Note key={note.id} note_prop={note_prop}/>
            })
        
    }
    return (
        <div className="noteList">
            <p>{currentPage} :page</p>
            {listNotes()}
        </div>
    );
}