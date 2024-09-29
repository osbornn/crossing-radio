import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const AuthenticationMenu = () => {

    const [isRegistering, setIsRegistering] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if(location.pathname === '/login') {
            setIsRegistering(false);
        } else if(location.pathname === '/register') {
            setIsRegistering(true);
        }
    }, [location])

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const switchRegistrationLogin = () => {
        setIsRegistering(!isRegistering);
        setMessage('');
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage("The password don't match !");
            return;
        }

        setMessage("Hurray ! Your account was created succesfully ! ^.^");
    }

    const handleLogin = (e, username) => {
        e.preventDefault();
        setMessage("Welcome back " + username +  ";)");
    }


    return (
        <div className='auth-menu'>
            <h1>{isRegistering ? 'Create your account' : 'Login'}</h1>

            <div className='crossing-profile'>
                <img src="'..\..\assets\isabelle_profile_pic.jpg'" alt='Profile Picture'/>
            </div>

            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <div className='form-auth'>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className='form-auth'>
                    <label htmlFor='password'>Username</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {isRegistering && <div className='form-auth'>
                    <label htmlFor='password'>Username</label>
                    <input
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>}

                <button type='submit'>{isRegistering ? 'Register' : 'Login'}</button>
            </form>

            {message && <p className='infoMessage'>{message}</p>}

            <p onClick={switchRegistrationLogin}>{isRegistering ? 'You already have an account? Click here to login!' : 'You don\'t have an account? Click here to create one!'}</p>
        </div>
    );

}

export default AuthenticationMenu;