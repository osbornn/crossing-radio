import React from 'react';
import { useNavigate } from 'react-router-dom';
import './not-found-page.css';
import kk from '../../assets/kk.jpeg';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <p className='kk-error-message'>Uh oh... Looks like the page you're looking for does not exist :(</p>
            <span className='go-back' onClick={() => navigate('/')}>
                <i className='material-icons' style={{fontSize: '45px'}}>home</i>
            </span>
            <img className='kk-error-image' src={kk}></img>
        </div>
    );
}

export default NotFoundPage;