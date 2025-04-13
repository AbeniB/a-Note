import '../Component Styles/Navbar.css';

export default function Navbar({ toggleSidebar, toggleProfile, isProfileCollapsed }){
    return (
        <div className='navbar'>
            <button onClick={toggleSidebar} className='sidebarToggleBtn'>=</button>
            <span>a Note</span>
            <div>
                <input className='search-all' name='search-all' type="text" placeholder='Search All...'/>
                <button type='button'>Search</button>
            </div>
            <div>
                <button onClick={toggleProfile} className='profileToggleBtn'>My Profile</button>
                <div className={`profile ${isProfileCollapsed ? 'collapsed' : ''}`}>
                    <span>JohnDoe@email.com</span><br />
                    <span>Profile_Pic</span> <br/>
                    <div>
                        <button>Manage Profile</button>
                        <button>Log Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}