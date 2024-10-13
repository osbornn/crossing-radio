import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './home-page.css';
import YtCrossingVideo from '../../components/yt-crossing-video/yt-crossing-video';
import CrossingButton from '../../components/crossing-button/crossing-button';
import isabelleProfilePic from '../../assets/isabelle_profile_pic.jpg';

const Home = () => {

    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [userName, setUserName] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().getHours());
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Au chargement de la page
    useEffect(() => {
        const token = localStorage.getItem('token');

        //To verify the session token
        const verifyToken = async () => {
            if(token) {
                try {
                    const response = await fetch('http://localhost:8080/api/verifyToken', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        }
                    });

                    const data = await response.json();
                    console.log(data.msg);
                    if(!response.ok) {
                        localStorage.removeItem('token');
                        setIsLoggedIn(false);
                    }
                    else {
                        setIsLoggedIn(true);
                        const payload = token.split('.')[1];
                        const decodedPayload = JSON.parse(atob(payload));
                        setUserName(decodedPayload.username);
                    }
                } catch(error) {
                    console.error('There was an error during token verification', error);
                    setIsLoggedIn(false);
                }
            } 
        }
        verifyToken(token);
    }, []);

    const logoutUser = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const getCurrentAcVideo = useCallback(() => {
        fetch(`http://localhost:8080/api/current-video/${currentTime}`, {method: 'get'})
            .then(response => response.json())
            .then((data) => {
                setUrl(data.url);
                setTitle(data.title);
            })
            .catch(error => console.error('Error : ' + error.message));
    }, [currentTime]);

    useEffect(() => {

        const intervalId = setInterval(() => {
            const currentRealTime = new Date().getHours();
            setCurrentTime((currentTime) => {
                if(currentRealTime !== currentTime) {
                    return currentRealTime;
                }
                else {
                    return currentTime;
                }
            })
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        getCurrentAcVideo();
    }, [getCurrentAcVideo]);

    return (
        <div>
            <div className='homepage-header'>
                <h1>Radio Crossing</h1>
                {!isLoggedIn && <div className='auth-margin'>
                    <CrossingButton onClick={() => navigate('/register')} text='Sign Up'/>
                    <CrossingButton onClick={() => navigate('/login')} text='Login'/>
                </div>}
                {isLoggedIn && <div className='auth-margin'>
                    <img className='login-pic' src={isabelleProfilePic} alt=''/>
                    <p className='username'>{userName}</p>
                    <span className='logout-icon' onClick={logoutUser}>
                        <i className='material-icons' style={{fontSize: '40px'}}>power_settings_new</i>
                    </span>
                </div>}

            </div>
            <YtCrossingVideo title={title} url={url}></YtCrossingVideo>
        </div>
    );
}

export default Home;