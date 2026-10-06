import './AddNote.css';
import ContentContext from "../../../../Contexts/ContentContext";
import AppContext from '../../../../Contexts/AppContext';
import { useContext, useState } from 'react';
import { createPortal } from 'react-dom';

export default function AddNote() {
    const { note, handleChange, addNote } = useContext(ContentContext);
    const { darkMode } = useContext(AppContext);
    const [isComposerOpen, setIsComposerOpen] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (await addNote()) {
            setIsComposerOpen(false);
        }
    }

    return (
        <>
            <section className='addNote'>
                <div>
                    <h2>Quick note</h2>
                    <p>Capture an idea before it slips away.</p>
                </div>
                <button className='addNoteBtn button' type='button' onClick={() => setIsComposerOpen(true)}>
                    <span>Write a note</span>
                    <span aria-hidden='true'>＋</span>
                </button>
            </section>
            {isComposerOpen && createPortal(
                <div className={`add-note-backdrop${darkMode ? ' theme-dark' : ''}`} onClick={() => setIsComposerOpen(false)}>
                    <form className='add-note-dialog' onSubmit={handleSubmit} onClick={(event) => event.stopPropagation()}>
                        <div className='add-note-dialog-header'>
                            <div>
                                <h2>New note</h2>
                                <p>Write down what you want to remember.</p>
                            </div>
                            <button type='button' className='add-note-close' onClick={() => setIsComposerOpen(false)} aria-label='Close new note'>×</button>
                        </div>
                        <input name='title' type='text' placeholder='Title' onChange={handleChange} value={note.title} autoFocus />
                        <textarea name='body' rows={9} placeholder='Start writing...' onChange={handleChange} value={note.body}></textarea>
                        <div className='add-note-actions'>
                            <button type='button' className='add-note-cancel' onClick={() => setIsComposerOpen(false)}>Cancel</button>
                            <button className='button' type='submit'>Add note</button>
                        </div>
                    </form>
                </div>,
                document.body
            )}
        </>
    );
}