import React, { useState } from 'react';
import YouTube from 'react-youtube';
import './yt-crossing-video.css';
import AcLeaf from '../../assets/Animal_Crossing_Leaf.svg';

const VideoStatus = ({ message, isLoading, showLeaf }) => (
    <div className='video-status' role={isLoading ? 'status' : 'alert'}>
        {isLoading && <span className='video-spinner' aria-hidden='true'/>}
        {showLeaf && <img className='video-error-leaf' src={AcLeaf} alt=''/>}
        <span>{message}</span>
    </div>
);

const YtCrossingVideo = (props) => {

    const YOUTUBE_URL = "https://youtu.be/";

    const videoUrl = props.url;
    const videoTitle = props.title;
    const loadStatus = props.loadStatus;

    const [playerState, setPlayerState] = useState({ videoId: '', status: 'loading' });
    const acHour = (videoTitle || '').split('Crossing')[1] || '';
    const videoId = videoUrl && videoUrl.startsWith(YOUTUBE_URL)
        ? videoUrl.split(YOUTUBE_URL)[1].split('?')[0]
        : undefined;
    const isPlayerReady = playerState.videoId === videoId && playerState.status === 'ready';
    const hasPlayerError = playerState.videoId === videoId && playerState.status === 'error';
    const hasVideoError = loadStatus === 'error' || (loadStatus === 'ready' && (!videoId || hasPlayerError));

    const videoOptions = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            controls: 0, 
            loop: 1,
            playlist: videoId
        }
    };
        

    return (
        <div>
            <div className={hasVideoError ? 'video-frame video-frame--error' : 'video-frame'}>
                {loadStatus === 'loading' && <VideoStatus message='Loading video...' isLoading/>}
                {hasVideoError && <VideoStatus message="Something went wrong while loading the video :(" showLeaf/>}
                {loadStatus === 'ready' && videoId && !hasPlayerError && <>
                    <YouTube
                        className='crossingVideo'
                        videoId={videoId}
                        opts={videoOptions}
                        onReady={() => setPlayerState({ videoId, status: 'ready' })}
                        onError={() => setPlayerState({ videoId, status: 'error' })}
                    />
                    {!isPlayerReady && !hasPlayerError && <VideoStatus message='Loading video...' isLoading/>}
                </>}
            </div>
            {!hasVideoError && <div className="videoTitle">
                <p><img id="acLeaf" src={AcLeaf} alt="AC Leaf"></img>{acHour}</p>
            </div>}
        </div>
    );
}

export default YtCrossingVideo;