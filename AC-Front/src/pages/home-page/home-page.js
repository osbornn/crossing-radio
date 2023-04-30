import React from 'react';
import './home-page.css';
import YtCrossingVideo from '../../components/yt-crossing-video/yt-crossing-video';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "",
            title: "",
            currentTime: new Date().getHours()
        };
    }

    getCurrentAcVideo() {
        fetch(`http://localhost:8080/api/current-video/${this.state.currentTime}`, {method: 'get'})
            .then(response => response.json())
            .then((data) => {
                this.setState({url: data.url, title: data.title});
            })
            .catch(error => console.error('Error : ' + error.message));
    }

    componentDidMount() {
        //We get the current local time (in hours)
        this.getCurrentAcVideo();

        setInterval(() => {
            const currentRealTime = new Date().getHours();
            if(currentRealTime !== this.state.currentTime) {
                this.setState({currentTime: currentRealTime});
            }
        }, 60000)
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.currentTime !== prevState.currentTime) {
            this.getCurrentAcVideo();
        }
    }

    render() {
        return (
            <div>
                 <h1>Radio Crossing</h1>
                 <YtCrossingVideo title={this.state.title} url={this.state.url}></YtCrossingVideo>
            </div>
        )
    }
}

export default Home;