import React from 'react';
import './home-page.css';
import YtCrossingVideo from '../../components/yt-crossing-video';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: "",
        };
    }

    componentDidMount() {
        //We get the current local time (in hours)
        const currentTime = new Date().getHours();
        console.log("Current time : " + currentTime);
        fetch(`http://localhost:8080/api/current-video/${currentTime}`, {method: 'get'})
            .then(response => response.json())
            .then((data) => {
                console.log(data.title);
                this.setState({url: data.url});
            })
            .catch(error => console.error('Error : ' + error.message));
    }

    render() {
        return (
            <div>
                 <h1>Radio Crossing</h1>
                 <YtCrossingVideo url={this.state.url}></YtCrossingVideo>
            </div>
        )
    }
}

export default Home;