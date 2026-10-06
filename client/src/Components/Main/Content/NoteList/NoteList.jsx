import Note from './Note/Note'
import './NoteList.css';
import MainContext from '../../../../Contexts/MainContext';
import ContentContext from '../../../../Contexts/ContentContext';
import { useContext } from 'react';

export function DashboardOverview({ noteList }) {
    const activeNotes = noteList.filter((note) => note.state === 'note').length;
    const archivedNotes = noteList.filter((note) => note.state === 'archive').length;
    const trashedNotes = noteList.filter((note) => note.state === 'trash').length;

    return (
        <section className='noteListOverview' aria-label='Notes dashboard'>
            <div className='overviewCard'>
                <span>Active</span>
                <strong>{activeNotes}</strong>
            </div>
            <div className='overviewCard'>
                <span>Archived</span>
                <strong>{archivedNotes}</strong>
            </div>
            <div className='overviewCard'>
                <span>Trashed</span>
                <strong>{trashedNotes}</strong>
            </div>
        </section>
    );
}

export default function NoteList() {
    const { noteList } = useContext(ContentContext);
    const { currentPage } = useContext(MainContext);

    function listNotes() {
        const renderdList = noteList.filter((note) => note.state === currentPage).reverse();
        return renderdList.map((note) => {
            const note_prop = {
                id: note.id,
                title: note.title,
                body: note.body,
                date_created: note.date_created,
                state: note.state
            };
            return <Note key={note.id} note_prop={note_prop} />;
        });
    }

    return (
        <div id='noteList' className='noteList'>
            <p className='currentPage_info'>{currentPage.toUpperCase()}: </p>
            <div className='notes_holder'>
                {listNotes()}
            </div>
        </div>
    );
}