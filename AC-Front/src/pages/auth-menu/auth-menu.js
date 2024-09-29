import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './auth-menu.css';
import CrossingInput from '../../components/crossing-input/crossing-input';
import isabelleProfilePic from '../../assets/isabelle_profile_pic.jpg';
import CrossingButton from '../../components/crossing-button/crossing-button';

const AuthenticationMenu = () => {

    const [isRegistering, setIsRegistering] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

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

    const handleRegister = async (e, username, password) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            setMessage("The password don't match !");
            return;
        }

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();
          if(response.ok) {
            navigate('/login');
            setMessage("Hurray ! Your account was created succesfully ! ^.^");
          } else {
            setMessage(data.msg);
          }
    }

    const handleLogin = async (e, username, password) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
          });

          const data = await response.json();
          if(response.ok) {
            localStorage.setItem('token', data.token);
            setMessage("Welcome back " + username +  ";)");
            navigate('/');
          } else {
            setMessage(data.msg);
          }
    }


    return (
        <div className='auth-menu'>
            <h1>{isRegistering ? 'Create your account' : 'Login'}</h1>
            <span className='go-back' onClick={() => navigate('/')}>
                <i className='material-icons' style={{fontSize: '45px'}}>arrow_back</i>
            </span>

            <div className='crossing-profile'>
                <img className='profile-pic' src={isabelleProfilePic} alt='Profile Picture'/>
            </div>

            <form onSubmit={isRegistering ? (e) => handleRegister(e, username, password) : (e) => handleLogin(e, username, password)}>
                <div className='form-auth'>
                    <CrossingInput
                        inputLabel={'Username'}
                        inputValue={username}
                        inputType={'input'}
                        htmlFor={'username'}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div className='form-auth'>
                    <CrossingInput
                        inputLabel={'Password'}
                        inputValue={password}
                        inputType={'password'}
                        htmlFor={'password'}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {isRegistering && <div className='form-auth'>
                    <CrossingInput
                        inputLabel={'Confirm Password'}
                        inputValue={confirmPassword}
                        inputType={'password'}
                        htmlFor={'confirmPassword'}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>}

                <div className='register-button'>
                    <CrossingButton isSubmit text={isRegistering ? 'Register' : 'Login'}/>
                </div>
            </form>

            {message && <p className='infoMessage'>{message}</p>}

            <p className='switch-login-register' onClick={switchRegistrationLogin}>{isRegistering ? 'You already have an account? Click here to login!' : 'You don\'t have an account? Click here to create one!'}</p>
        </div>
    );

}

export default AuthenticationMenu;