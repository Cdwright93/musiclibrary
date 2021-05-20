import './App.css';
import axios from 'axios'
import React, { Component } from 'react';

const api = axios.create({
  baseURL:'http://127.0.0.1:8000/music/'
})
class App extends Component {
  
  state = {
    music: []
  }

  constructor(){
    super();
    this.getMusic()
  }

  getMusic = async () => {
    let data = await api.get('/').then(({ data }) => data)
      this.setState({ music : data })
      console.log(this.state.music)
  }
  createSong = async () => {
    let res = await api.post('/', {"title": " ",
    "artist": " ",
    "album": " ",
    "release_date": " "})
    console.log(res)
    this.getMusic();
  }
  deleteSong = async (id) => {
    let data = await api.delete(`/${id}`)
    this.getMusic()
  }
  render() {
    return (
      <div>
        <h1>Music Library!</h1>
        <table>
          <thead>
          <td><h3>Title</h3></td>
          <td><h3>Artist</h3></td>
          <td><h3>Album</h3></td>
          <td><h3>Release Date</h3></td>
          </thead>
          {this.state.music.map(song => <tr key={song.id}><td>{song.title}</td> <td>{song.artist}</td>  <td>{song.album}</td> <td>{song.release_date}</td></tr>)}
        </table>
      </div>
    );
  } 
}

export default App;
