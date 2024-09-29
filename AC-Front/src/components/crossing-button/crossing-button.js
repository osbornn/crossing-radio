import React from 'react';
import './crossing-button.css';

const CrossingButton = ({isSubmit, text, onClick}) => {

    return (
        <button type={isSubmit ? 'submit' : 'button'} onClick={onClick} className='crossing-button'>
            {text}
        </button>
    );
}

export default CrossingButton;