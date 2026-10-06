import './Navbar.css';
import AppContext from '../../Contexts/AppContext';
import { useContext } from 'react';
import Profile from './Profile';

export default function Navbar() {
    const { toggleSidebar, darkMode, toggleDarkMode } = useContext(AppContext);

    return (
        <nav className='navbar'>
            <div className='holderA'>
                <button onClick={toggleSidebar} className='sidebarToggleBtn' type='button'>
                    <img width='20' height='20' src='https://img.icons8.com/external-bluetone-bomsymbols-/external-hamburger-menu-digital-design-bluetone-set-2-bluetone-bomsymbols-.png' alt='menu' />
                </button>
            </div>
            <div className='icon_brandName'>
                <img width='35' height='35' src={darkMode ? 'https://img.icons8.com/cotton/16/note--v1.png' : 'https://img.icons8.com/pastel-glyph/64/note.png'} alt='note' />
                <span>a-Note</span>
            </div>
            <div className='holderB'>
                <button className='themeToggleBtn' type='button' onClick={toggleDarkMode} aria-label='Toggle dark mode'>
                    {darkMode ? '☀️' : '🌙'}
                </button>
                <Profile />
            </div>
        </nav>
    );
}