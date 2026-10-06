import { useContext, useEffect, useState } from 'react';
import { api } from '../../../api';
import MainContext from '../../../Contexts/MainContext';
import ContentContext from '../../../Contexts/ContentContext';
import AppContext from '../../../Contexts/AppContext';
import NoteList, { DashboardOverview } from './NoteList/NoteList';
import AddNote from './AddNote/AddNote';
import './content.css';

const normalizeNote = (note) => ({
    id: note._id || note.id,
    title: note.title || '',
    body: note.content || note.body || '',
    date_created: note.createdAt ? new Date(note.createdAt).toDateString() : new Date().toDateString(),
    state: note.state || 'note'
});

export default function Content() {
    const { currentPage } = useContext(MainContext);
    const { user } = useContext(AppContext);
    const [openEdit, setOpenEdit] = useState(true);
    const [noteU, setNoteU] = useState({});
    const [note, setNote] = useState({
        id: null,
        title: '',
        body: '',
        date_created: null,
        state: 'note'
    });
    const [noteList, setNoteList] = useState([]);

    useEffect(() => {
        if (!openEdit) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [openEdit]);

    useEffect(() => {
        if (!user) return;

        api
            .get('/api/notes')
            .then(({ data }) => {
                setNoteList((data.notes || []).map(normalizeNote));
            })
            .catch(() => {
                setNoteList([]);
            });
    }, [user]);

    function handleChange(e) {
        const { value, name } = e.target;
        setNote((prev) => ({ ...prev, [name]: value }));
    }

    function addNote() {
        if (!note.title.trim() && !note.body.trim()) return Promise.resolve(false);

        return api
            .post('/api/notes', { title: note.title, body: note.body, state: 'note' })
            .then(({ data }) => {
                const createdNote = normalizeNote(data.note);
                setNoteList((prev) => [createdNote, ...prev]);
                setNote({ id: null, title: '', body: '', date_created: null, state: 'note' });
                return true;
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }

    function updateNoteState(id, nextState) {
        const noteToUpdate = noteList.find((entry) => entry.id === id);
        if (!noteToUpdate) return;

        api
            .put(
                `/api/notes/${id}`,
                {
                    title: noteToUpdate.title,
                    body: noteToUpdate.body,
                    state: nextState
                },
            )
            .then(({ data }) => {
                const updatedNote = normalizeNote(data.note);
                setNoteList((prev) => prev.map((entry) => (entry.id === id ? updatedNote : entry)));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function archiveNote(id) {
        updateNoteState(id, 'archive');
    }

    function trashNote(id) {
        updateNoteState(id, 'trash');
    }

    function restoreNote(id) {
        updateNoteState(id, 'note');
    }

    function deletePermanently(id) {
        api
            .delete(`/api/notes/${id}`)
            .then(() => {
                setNoteList((prev) => prev.filter((entry) => entry.id !== id));
            })
            .catch((error) => {
                console.error(error);
            });
    }

    function openEditor(id) {
        const selectedNote = noteList.find((entry) => entry.id === id);
        if (!selectedNote) return;

        setNoteU({ ...selectedNote });
        setOpenEdit(false);
    }

    function handleChangeU(e) {
        const { value, name } = e.target;
        setNoteU((prev) => ({ ...prev, [name]: value }));
    }

    function closeEditor() {
        setOpenEdit(true);
    }

    function updateNote(id) {
        api
            .put(
                `/api/notes/${id}`,
                {
                    title: noteU.title,
                    body: noteU.body,
                    state: noteU.state || 'note'
                },
            )
            .then(({ data }) => {
                const updatedNote = normalizeNote(data.note);
                setNoteList((prev) => prev.map((entry) => (entry.id === id ? updatedNote : entry)));
                setOpenEdit(true);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <ContentContext.Provider value={{ note, handleChange, addNote, noteList, archiveNote, trashNote, openEditor, restoreNote, deletePermanently }}>
            <div className={`content ${currentPage !== 'note' && 'archive-trash'}`}>
                <DashboardOverview noteList={noteList} />
                <div className='content-workspace'>
                    {currentPage === 'note' && <AddNote />}
                    <NoteList />
                </div>
                <div className={`editor-container ${openEdit && 'collapse'}`}>
                    <div className='editor-inner'>
                        <input aria-label='Note title' name='title' type='text' value={noteU.title || ''} onChange={handleChangeU} />
                        <textarea name='body' cols={40} rows={40} value={noteU.body || ''} onChange={handleChangeU}></textarea>
                        <div className='editor-actions'>
                            <button className='button' type='button' onClick={() => updateNote(noteU.id)}>Update</button>
                            <button className='button dismiss-btn' type='button' onClick={closeEditor}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </ContentContext.Provider>
    );
}