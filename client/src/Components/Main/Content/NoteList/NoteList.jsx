import Note from './Note/Note'
import './NoteList.css';
import MainContext from "../../../../Contexts/MainContext";
import ContentContext from "../../../../Contexts/ContentContext";
import { useContext } from 'react';

export default function NoteList(){
    const {noteList} = useContext(ContentContext);
    
    const {currentPage} = useContext(MainContext);

    function listNotes(){
        const renderdList = noteList.filter(note => note.state === currentPage).reverse();
        return renderdList.map(note => {
                const note_prop = {
                    id: note.id,
                    title: note.title, 
                    body: note.body, 
                    date_created: note.date_created,
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