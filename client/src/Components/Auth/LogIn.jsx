import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../api';
import AppContext from '../../Contexts/AppContext';
import './Login.css';

const LogIn = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(AppContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError('All fields are required');
            return;
        }

        setError('');
        api
            .post('/api/login', formData)
            .then(({ data }) => {
                setUser(data.user);
                navigate('/dashboard');
            })
            .catch((err) => {
                const serverMessage = err.response?.data?.message || 'Login failed';
                setError(serverMessage);
            });
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className="link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default LogIn;