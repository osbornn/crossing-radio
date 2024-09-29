import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './home-page.css';
import YtCrossingVideo from '../../components/yt-crossing-video/yt-crossing-video';
import CrossingButton from '../../components/crossing-button/crossing-button';

const Home = () => {

    const navigate = useNavigate();
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date().getHours());

    const getCurrentAcVideo = () => {
        fetch(`http://localhost:8080/api/current-video/${currentTime}`, {method: 'get'})
            .then(response => response.json())
            .then((data) => {
                setUrl(data.url);
                setTitle(data.title);
            })
            .catch(error => console.error('Error : ' + error.message));
    };

    useEffect(() => {
        //We get the current local time (in hours)
        getCurrentAcVideo();

        setInterval(() => {
            const currentRealTime = new Date().getHours();
            if(currentRealTime !== currentTime) {
                setCurrentTime(currentRealTime);
            }
        }, 60000)
    });

    useEffect(() => {
        getCurrentAcVideo();
    }, [currentTime]);

    return (
        <div>
            <div className='homepage-header'>
                <h1>Radio Crossing</h1>
                <div className='auth-button-gap'>
                    <CrossingButton onClick={() => navigate('/register')} text='Sign Up'/>
                </div>
            </div>
            <YtCrossingVideo title={title} url={url}></YtCrossingVideo>
        </div>
    );
}

export default Home;