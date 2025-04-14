import Note from './Note/Note'
import './NoteList.css';

export default function NoteList({note_list_prop}){
    const {
        noteList,
        archiveNote,
        trashNote,
        currentPage,
        openEditor,
        restoreNote,
        deletePermanently
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
                    openEditor: openEditor,
                    restoreNote,
                    deletePermanently,
                    state: note.state
                }
                return <Note key={note.id} note_prop={note_prop}/>
            })
        
    }
    return (
        <div id="noteList" className="noteList">
            <p className='currentPage_info'>{currentPage.toUpperCase()}: </p>
            <div className='notes_holder'>
                {listNotes()}
            </div>
        </div>
    );
}