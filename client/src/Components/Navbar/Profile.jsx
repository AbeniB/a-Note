import './Profile.css';
import AppContext from "../../Contexts/AppContext";
import { useContext } from 'react';

export default function Profile(){
    const {isProfileCollapsed, toggleProfile} = useContext(AppContext);

    return (
        <div>
            <div onClick={toggleProfile} className='profileToggleBtn'>
                <img width="45" height="45" src="https://img.icons8.com/stickers/100/test-account.png" alt="profile_pic"/>
            </div>
            <div className={`profile ${isProfileCollapsed ? '' : 'collapse'}`}>
                <div className='profile_p1'>
                    <span>JohnDoe@email.com</span>
                    <button className='closeBtn' onClick={toggleProfile}>
                        <img width="16" height="16" src="https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png" alt="external-close-button-it-and-computer-inkubators-basic-outline-inkubators"/>
                    </button>
                </div>
                <div className='profile_p2'>
                    <img width="100" height="100" src="https://img.icons8.com/stickers/100/test-account.png" alt="test-account"/>
                </div>
                <div className='profile_p3'>
                    <button>Manage Profile</button>
                    <button>Log Out</button>
                </div>
            </div>
        </div>
    );
}