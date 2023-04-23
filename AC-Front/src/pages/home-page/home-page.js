import React from 'react';
import './home-page.css';

class Home extends React.Component {

    componentDidMount() {
        const testTime = 4;
        const currentTime = new Date().getHours();
        fetch(`http://localhost:8080/api/current-video/${testTime}`, {method: 'get'})
            .then(response => response.json())
            .then(data => console.log(data.time))
            .catch(error => console.error('Error : ' + error.message));
    }

    render() {
        return (
            <div>
                 <h1>Radio Crossing</h1>
            </div>
        )
    }
}

export default Home;