import './Navbar.css';
import AppContext from "../../Contexts/AppContext";
import { useContext } from 'react';

export default function Navbar(){
    const {isProfileCollapsed, toggleSidebar, toggleProfile} = useContext(AppContext);
    
    return (
        <nav className='navbar'>
            <button onClick={toggleSidebar} className='sidebarToggleBtn btn'>
                <img width="20" height="20" src="https://img.icons8.com/external-bluetone-bomsymbols-/external-hamburger-menu-digital-design-bluetone-set-2-bluetone-bomsymbols-.png" alt="external-hamburger-menu-digital-design-bluetone-set-2-bluetone-bomsymbols-"/>
            </button>
            <div className='icon_brandName'>
                <img width="35" height="35" src="https://img.icons8.com/pastel-glyph/64/note.png" alt="note--v1"/>
                <span>a-Note</span>
            </div>
            <div>
                <div onClick={toggleProfile} className='profileToggleBtn'>
                    <img width="45" height="45" src="https://img.icons8.com/stickers/100/test-account.png" alt="profile_pic"/>
                </div>
                <div className={`profile ${isProfileCollapsed ? '' : 'collapse'}`}>
                    <div className='profile_p1'>
                        <span>JohnDoe@email.com</span>
                        <div className='closeBtn btn' onClick={toggleProfile}>
                        <img width="16" height="16" src="https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png" alt="external-close-button-it-and-computer-inkubators-basic-outline-inkubators"/>
                        </div>
                    </div>
                    <div className='profile_p2'>
                        <img width="100" height="100" src="https://img.icons8.com/stickers/100/test-account.png" alt="test-account"/>
                    </div>
                    <div className='profile_p3'>
                        <button className='btn'>Manage Profile</button>
                        <button className='btn'>Log Out</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}