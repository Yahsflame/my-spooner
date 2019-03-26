import React, { Component } from 'react';
import './Catalog.css';


class Catalog extends Component {
  constructor(){
    super();
    this.state = {
      artists: null,
      albums: null,
      tracks: null,
      playlists: null,
      query: '',
      type: 'track'
    }
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
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

  getDetails = () => {
    this.setState({
      artists: null,
      tracks: null,
      albums: null,
      playlists: null
    })

    let query = this.state.query;
    let type = this.state.type;

    const params = this.getHashParams();
    fetch(`https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
      headers:{
        'Authorization': 'Bearer ' + params.access_token
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        if(this.state.type === "artist"){
          this.setState({
            artists: result.artists.items
          })
        } else if(this.state.type === "track"){
          this.setState({
            tracks: result.tracks.items
          })
        } else if(this.state.type === "album"){
          this.setState({
            albums: result.albums.items
          })
        } else {
          this.setState({
            playlists: result.playlists.items
          })
        }
      }
    )
  }

  handleQueryChange(e) {
    this.setState({ query: e.target.value });
  }

  handleTypeChange(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    let searchList;

    if(this.state.playlists != null) {
      searchList = <div>
        {this.state.playlists.map((item, index) => (
          <li key={index} className="aligner">
            <img className="prettyArt" alt={`Album art for ${item.name}`} src={item.images.length > 0 ? `${item.images[0].url}` : '' }/>
            <div className="flex-text">
              <h2 className="h2-prettyName"> Featured On: </h2> 
              <p className="prettyName">{item.name}</p>
            </div>
          </li>
        ))}
        </div>
    } else if(this.state.artists != null) {
      searchList = <div>
        {this.state.artists.map((item, index) => (
          <li key={index} className="aligner">
            <img className="prettyArt" alt={`Album art for ${item.name}`} src={item.images.length > 0 ? `${item.images[0].url}` : '' }/>
            <div className="flex-text">
              <h2 className="h2-prettyName"> Artist: </h2> 
              <p className="prettyName">{item.name}</p>
            </div>
          </li>
        ))}
        </div>
    } else if(this.state.tracks != null) {
      searchList = <div>
        {this.state.tracks.map((item, index) => (
          <li key={index} className="aligner">
            <img className="prettyArt" alt={`Album art for ${item.name}`} src={item.album.images.length > 0 ? `${item.album.images[0].url}` : '' }/>
            <div className="flex-text">
              <h2 className="h2-prettyName"> Track: </h2> 
              <p className="prettyName">{item.name} <strong>by</strong>&nbsp;
              {item.artists.map((artist, index) => (
                item.artists[index + 1] ? artist.name + ', ' : item.artists.length == 1 ? artist.name + '.' : ' and ' + artist.name + '.'
              ))}
              </p>
            </div>
          </li>
        ))}
        </div>
    } else if(this.state.albums != null) {
      searchList = <div>
        {this.state.albums.map((item, index) => (
          <li key={index} className="aligner">
            <img className="prettyArt" alt={`Album art for ${item.name}`} src={item.images.length > 0 ? `${item.images[0].url}` : '' }/>
            <div className="flex-text">
              <h2 className="h2-prettyName"> Album: </h2> 
              <p className="prettyName">{item.name}</p>
            </div>
          </li>
        ))}
        </div>
    } else {
      searchList = 
      <div>
        <li></li>
      </div>
    }

    return (
      <div className='catalog'>
        <form>
          <label>
            <input value={this.state.query} onChange={this.handleQueryChange} type="text" placeholder="Enter Search Term"/>
          </label>
          <select value={this.state.type} onChange={this.handleTypeChange}>
            <option defaultValue value="track">Track</option>
            <option value="artist">Artist</option>
            <option value="playlist">Playlist</option>
            <option value="album">Album</option>
          </select>
          <button onClick={() => this.getDetails()}>Search</button>
        </form>
        <div className="results">
          <ul>
            {searchList}
          </ul>
        </div>
      </div>
    )
  };
}

export default Catalog;
