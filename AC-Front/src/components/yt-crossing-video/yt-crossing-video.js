import React from "react";
import YouTube from 'react-youtube';
import './yt-crossing-video.css';
import AcLeaf from '../../assets/Animal_Crossing_Leaf.svg';

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
        const videoTitle = this.props.title;

        const acHour = videoTitle.split('Crossing')[1];
        const videoId = videoUrl.split(this.YOUTUBE_URL)[1];

        return (
            <div>
                {videoId && <YouTube className="crossingVideo" videoId={videoId} opts={videoOptions}></YouTube>}
                {!videoId && <p className="crossingVideo">Something went wrong!</p>}
                <div className="videoTitle">
                    <p><img id="acLeaf" src={AcLeaf} alt="AC Leaf"></img>{acHour}</p>
                </div>
            </div>
        );
    }
}

export default YtCrossingVideo;