import React from "react";
import './slider-volume.css';

function SliderVolume(props) {

    return(
        <div>
            <input id="slider" type="range" min="0" max="100"></input>
        </div>
    );
}

export default SliderVolume;