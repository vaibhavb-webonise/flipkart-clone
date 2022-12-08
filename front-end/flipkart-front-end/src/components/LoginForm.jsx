import React, { useState } from 'react'
import { fetchAPIResponse } from '../Utils';
import { useCookies } from 'react-cookie'
import { useUserValue } from '../helpers/ContextInfo';
const LoginForm = ({ setMode, setLoading, error, setError, onClose }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setCookie] = useCookies(['user']);
    const [, dispatch] = useUserValue();

    const changeToSignUp = () => {
        setMode('signUp')
    }

    const validateInputs = () => {
        if (!email) {
            setError('please enter Email or phone number');
            return true;
        }
        if (!password) {
            setError('please enter Password');
            return true;
        }
        if (password.length < 6) {
            setError('short password must be at least 5 characters');
            return true;
        }
        return false;
    }

    const handleLogin = async () => {
        if (validateInputs()) return;
        setLoading(true);
        setError('');
        try {
            const resp = await fetchAPIResponse('login', { email, password });

            if (resp.status !== 201) {
                setError(resp?.data?.error ?? 'error occured');
                return;
            }

            console.log(resp.data);
            setCookie('email', resp.data.email);
            setCookie('AuthToken', resp.data.token);
            setCookie('userId', resp.data.userId);
            delete resp.data.token;
            dispatch({
                type: 'SET_USER',
                data: { user: resp.data, isLoggedIn: true }
            });
            onClose();

        } catch {
            setError('Something went wrong, please try again');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-form-container">
            <input type="text" className="form-input" placeholder="Enter Email/Mobile number" value={email} onChange={e => {
                setEmail(e.target.value);
                setError('')
            }} />
            <input type="password" className="form-input" placeholder="Enter Password" value={password} onChange={e => {
                setPassword(e.target.value);
                setError('')
            }} />

            <div className="login-warning">
                {error ?? "By continuing, you agree to Flipkart's Terms of Use and Privacy Policy."}
            </div>

            <button className="login-submit-button" onClick={handleLogin}>Login</button>

            <div className="login-or-text">OR</div>

            <button className="login-otp-button">Request OTP</button>

            <div className="login-register" onClick={changeToSignUp}>
                New to Flipkart? Create an account
            </div>
        </div>
    )
}

export default LoginForm
