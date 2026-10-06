import './Profile.css';
import AppContext from '../../Contexts/AppContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { api } from '../../api';

export default function Profile() {
    const { isProfileCollapsed, toggleProfile, user, logout, setUser, darkMode } = useContext(AppContext);
    const navigate = useNavigate();
    const [isManageOpen, setIsManageOpen] = useState(false);
    const [profileForm, setProfileForm] = useState({ username: user?.username || '', email: user?.email || '' });
    const [profileError, setProfileError] = useState('');

    useEffect(() => {
        setProfileForm({ username: user?.username || '', email: user?.email || '' });
    }, [user]);

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            setIsManageOpen(false);
            toggleProfile();
            navigate('/login', { replace: true });
        }
    };

    const handleManageProfile = () => {
        setIsManageOpen(true);
        setProfileError('');
        toggleProfile();
    };

    const handleProfileChange = (event) => {
        const { name, value } = event.target;
        setProfileForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveProfile = async (event) => {
        event.preventDefault();
        setProfileError('');
        try {
            const { data } = await api.put('/api/profile', profileForm);
            setUser(data.user);
            setIsManageOpen(false);
        } catch (error) {
            setProfileError(error.response?.data?.message || 'Unable to update profile');
        }
    };

    return (
        <div>
            <button onClick={toggleProfile} className='profileToggleBtn' type='button' aria-label='Open profile menu'>
                <img src='/assets/profile-icon.svg' alt='' />
            </button>
            <div className={`profile ${isProfileCollapsed ? '' : 'collapse'}`}>
                <button className='closeBtn' onClick={toggleProfile} type='button' aria-label='Close profile menu'>×</button>
                <div className='profile-content'>
                    <div className='profile_p1'>
                        <img className='profile-avatar' src='/assets/profile-icon.svg' alt='' />
                        <span>{user?.username || 'Guest'}</span>
                    </div>
                    <div className='profile_p3'>
                        <button type='button' onClick={handleManageProfile}>Manage Profile</button>
                        <button type='button' onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
            </div>

            {isManageOpen && createPortal(
                <div className={`profile-modal-backdrop${darkMode ? ' theme-dark' : ''}`} onClick={() => setIsManageOpen(false)}>
                    <div className='profile-modal' onClick={(event) => event.stopPropagation()}>
                        <div className='profile-modal-header'>
                            <h3>Manage profile</h3>
                            <button type='button' className='modal-close' onClick={() => setIsManageOpen(false)}>✕</button>
                        </div>
                        <form className='profile-form' onSubmit={handleSaveProfile}>
                            {profileError && <p className='profile-form-error' role='alert'>{profileError}</p>}
                            <label>
                                Username
                                <input name='username' value={profileForm.username} onChange={handleProfileChange} />
                            </label>
                            <label>
                                Email
                                <input name='email' type='email' value={profileForm.email} onChange={handleProfileChange} />
                            </label>
                            <div className='profile-form-actions'>
                                <button type='button' className='secondary-btn' onClick={() => setIsManageOpen(false)}>Cancel</button>
                                <button type='submit'>Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}