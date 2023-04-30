import React from "react";
import YouTube from 'react-youtube';
import './yt-crossing-video.css';

class YtCrossingVideo extends React.Component {

    YOUTUBE_URL = "https://youtu.be/";

    constructor(props) {
        super(props);
    };

    render() {
        const videoOptions = {
            height: '390',
            width: '640',
            playerVars: {
                autoplay: 1,
                controls: 0, 
                loop: 1
            },
        }

        const videoUrl = this.props.url;
        const videoId = videoUrl.split(this.YOUTUBE_URL)[1];
        console.log(videoId);

        return (
            <div>
                {videoId && <YouTube className="crossingVideo" videoId={videoId} opts={videoOptions}></YouTube>}
                {!videoId && <p className="crossingVideo">Something went wrong!</p>}
            </div>
        );
    }
}

export default YtCrossingVideo;