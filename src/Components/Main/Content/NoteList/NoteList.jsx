import Note from './Note/Note'
import './NoteList.css';

export default function NoteList({note_list_prop}){
    const {
        noteList,
        archiveNote,
        trashNote,
        currentPage
    } = note_list_prop;
    
    function listNotes(currentPage){
        const renderdList = noteList.filter(note => note.rPage === currentPage);
        return renderdList.map(note => {
                const note_prop = {
                    id: note.id,
                    title: note.title, 
                    body: note.body, 
                    date_created: note.date_created,
                    archiveNote: archiveNote,
                    trashNote: trashNote
                }
                console.log(noteList);
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