import './Navbar.css';

export default function Navbar({ nav_prop }){
    const {isProfileCollapsed, toggleSidebar, toggleProfile} = nav_prop;
    
    return (
        <nav className='navbar'>
            <button onClick={toggleSidebar} className='sidebarToggleBtn'>=</button>
            <div className='icon_brandName'>
                <img width="20" height="20" src="https://img.icons8.com/pastel-glyph/64/note.png" alt="note--v1"/>
                <span>a-Note</span>
            </div>
            <div>
                <button onClick={toggleProfile} className='profileToggleBtn'>My Profile</button>
                <div className={`profile ${isProfileCollapsed ? '' : 'collapse'}`}>
                    <span>JohnDoe@email.com</span><br/>
                    <span>Profile_Pic</span><br/>
                    <div>
                        <button>Manage Profile</button>
                        <button>Log Out</button>
                    </div>
                </div>
            </div>
        </nav>
    );
}