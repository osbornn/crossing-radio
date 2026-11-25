import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './home-page.css';
import YtCrossingVideo from '../../components/yt-crossing-video/yt-crossing-video';
import CrossingButton from '../../components/crossing-button/crossing-button';
import isabelleProfilePic from '../../assets/isabelle_profile_pic.jpg';
import ChatWindow from '../../components/chat-window/chat-window';

const Home = () => {

    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [videoStatus, setVideoStatus] = useState('loading');
    const [userName, setUserName] = useState('');
    const [userId, setUserId] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().getHours());
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    //Au chargement de la page
    useEffect(() => {
        const token = localStorage.getItem('token');

        //To verify the session token
        const verifyToken = async () => {
            if(token) {
                try {
                    const response = await fetch(process.env.REACT_APP_CROSSING_API_URL + '/api/verifyToken', {
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
                        setUserId(decodedPayload.userId);
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

    const getCurrentAcVideo = useCallback(async () => {
        setVideoStatus('loading');

        try {
            const response = await fetch(process.env.REACT_APP_CROSSING_API_URL + `/api/current-video/${currentTime}`, {method: 'get'});
            if(!response.ok) {
                throw new Error('Unable to fetch the current video');
            }

            const data = await response.json();
            if(!data.url || !data.title) {
                throw new Error('The current video response is incomplete');
            }

            setUrl(data.url);
            setTitle(data.title);
            setVideoStatus('ready');
        } catch(error) {
            console.error('Error loading current video:', error.message);
            setVideoStatus('error');
        }
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
            <div className='video-chat'>
                <YtCrossingVideo title={title} url={url} loadStatus={videoStatus}></YtCrossingVideo>
                {isLoggedIn && <ChatWindow userId={userId} username={userName}></ChatWindow>}
            </div>
        </div>
    );
}

export default Home;