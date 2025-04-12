import '../Component Styles/Navbar.css';

export default function Navbar(){
    return (
        <div className='navbar'>
            <button>=</button>
            <span>a Note</span>
            <div>
                <input type="text" placeholder='Search All...'/>
                <button>Search</button>
            </div>
            <button>My Profile</button>
        </div>
    );
}