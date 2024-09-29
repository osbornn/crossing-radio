import React from "react";
import './crossing-input.css';

const CrossingInput = (props) => {

    const inputLabel = props.inputLabel;
    const inputType = props.inputType;
    const inputValue = props.inputValue;
    const htmlFor = props.htmlFor;
    
    return (
        <div className="input-container">
            <label htmlFor={htmlFor}>{inputLabel}</label>
            <input
                className="crossing-input"
                type={inputType}
                id={htmlFor}
                value={inputValue}
                onChange={props.onChange}
                required
            />
        </div>
    );
}

export default CrossingInput;