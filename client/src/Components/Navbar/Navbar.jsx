import './Navbar.css';
import AppContext from "../../Contexts/AppContext";
import { useContext } from 'react';
import Profile from './Profile';
export default function Navbar(){
    const {toggleSidebar} = useContext(AppContext);
    
    return (
        <nav className='navbar'>
            <div className='holderA'>
                <button onClick={toggleSidebar} className='sidebarToggleBtn'>
                    <img width="20" height="20" src="https://img.icons8.com/external-bluetone-bomsymbols-/external-hamburger-menu-digital-design-bluetone-set-2-bluetone-bomsymbols-.png" alt="external-hamburger-menu-digital-design-bluetone-set-2-bluetone-bomsymbols-"/>
                </button>
            </div>
            <div className='icon_brandName'>
                <img width="35" height="35" src="https://img.icons8.com/pastel-glyph/64/note.png" alt="note--v1"/>
                <span>a-Note</span>
            </div>
            <div className='holderB'>
                <Profile/>
            </div>
        </nav>
    );
}