import React from 'react';
import './crossing-button.css';

const CrossingButton = ({text, onClick}) => {

    return (
        <button onClick={onClick} className='crossing-button'>
            {text}
        </button>
    );
}

export default CrossingButton;