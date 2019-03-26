import React from 'react';
import './Login.css';
import spotifyLogo from '../../assets/spotify.png';

const Login = (props) => {
  return (
    <div className='login'>
      <img className="login-logo" alt="spotify logo" src={spotifyLogo}></img>
      {props.username ? (
        <p className="welcome-name"> Welcome {props.username}! </p>
      ) : (
        <a className="login-link" href='http://localhost:8888/login'> Login to Spotify </a>
      )}
    </div>
  )
};

export default Login;
