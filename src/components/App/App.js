import React, { Component } from 'react';
import './App.css';
import Login from '../Login/Login';
import Catalog from '../Catalog/Catalog';

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.state = {
      loggedIn: params.access_token ? true : false,
      userName: null
    }
    if (params.access_token){
      fetch('https://api.spotify.com/v1/me', {
        method: 'GET',
        headers:{
          'Authorization': 'Bearer ' + params.access_token
        }
      })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            userName: result.display_name
          })
        }
      )
    }
  }

  getHashParams = () => {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  render() {
    return (
      <div className='App'>
        <Login username={this.state.userName} />
        <Catalog />
      </div>
    );
  }
}

export default App;
