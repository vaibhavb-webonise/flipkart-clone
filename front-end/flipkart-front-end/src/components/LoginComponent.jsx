import React, { useState } from 'react'
import './login.css'
import LoginAd from './LoginAd';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './LoginForm';
import { CircularProgress } from '@mui/material';
import { fetchAPIResponse } from '../Utils';
import { useCookies } from 'react-cookie';
import { useUserValue } from '../helpers/ContextInfo';
const LoginComponent = ({ onClose }) => {
    const [mode, setMode] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [user, setUser] = useState({});
    const [, setCookie] = useCookies(['user']);
    const [, dispatch] = useUserValue();

    const backToLogin = () => {
        setMode("login");
    }

    const onChange = (e) => {
        setError('')
        const { name, value } = e.target
        setUser({ ...user, [name]: value });
    }

    const handleSignUp = async () => {
        if (user.password !== user.confirmPassword) {
            setError('Password should match');
            setUser({ ...user, password: '', confirmPassword: '' })
            return;
        }
        setLoading(true);
        setError('');
        try {
            const resp = await fetchAPIResponse('signup', user);
            if (resp.status !== 201) {
                setError(resp.data.description);
            } else {
                setCookie('email', resp.data.sanitizedEmail);
                setCookie('AuthToken', resp.data.token);
                setCookie('userId', resp.data.userId);
                const data = { user: resp.data.user, isLoggedIn: true }

                dispatch({
                    type: 'SET_USER',
                    data
                })
                onClose();
            }
        } catch {
            setError('Error occured in creating user')
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className="login">
            <div className="login-close" onClick={onClose}>{!loading && <CloseIcon />}</div>
            <div className="login-ad">
                <LoginAd />
            </div>


            <div className="login-form">
                {
                    loading ? <CircularProgress /> :
                        mode === 'login' ? <LoginForm setMode={setMode} setLoading={setLoading} error={error} setError={setError} onClose={onClose} />
                            :
                            <div className="signup">
                                <input type="text" className="form-input" placeholder="Enter Email" name="email" value={user?.email} onChange={onChange} />
                                <input type="text" className="form-input" placeholder="Enter Mobile number" name="mobile" value={user?.mobile} onChange={onChange} />
                                <input type="text" className="form-input" placeholder="Enter first name" name="firstName" value={user?.firstName} onChange={onChange} />
                                <input type="text" className="form-input" placeholder="Enter last name" name="lastName" value={user?.lastName} onChange={onChange} />
                                <input type="text" className="form-input" placeholder="Enter Password" name="password" value={user?.password} onChange={onChange} />
                                <input type="text" className="form-input" placeholder="Confirm Password" name="confirmPassword" value={user?.confirmPassword} onChange={onChange} />
                                {error ? error : <button className="login-submit-button" style={{ marginTop: '5px', marginBottom: '15px' }} onClick={handleSignUp}>Sign Up</button>}
                                <button className="login-otp-button" onClick={backToLogin}>Existing user? Log In</button>

                            </div>

                }

            </div>
        </div>
    )
}

export default LoginComponent
