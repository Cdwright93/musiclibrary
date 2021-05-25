import './App.css';
import axios from 'axios'
import React, { Component } from 'react';

const api = axios.create({
  baseURL:'http://127.0.0.1:8000/music/'
})
class App extends Component {
  constructor(){
    super();
    this.state = {
      music: [],
    }
    this.getMusic()
  }
  
  getMusic = async () => {
    let data = await api.get('/').then(({ data }) => data)
    this.setState({ music : data })
    console.log(this.state.music)
  }
  createSong = async (event) => {
    event.preventDefault()
    let res = await api.post('/', {title: event.target.title.value,
    artist: event.target.artist.value,
    album: event.target.album.value,
    release_date: event.target.release_date.value})
    console.log(res)
    this.getMusic();
  }
  deleteSong = async (id) => {
    let data = await api.delete(`/${id}`)
    this.getMusic()
  }
  updateSong = async (id, val) => {
    let data = await api.put(`/${id}`, { title: val }, {artist : val}, {album : val}, {release_date : val})
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
          {this.state.music.map(song => <tr key={song.id}><td>{song.title}</td> <td>{song.artist}</td><td>{song.album}</td> <td>{song.release_date}</td><button onClick={()=>this.deleteSong(song.id)}>Delete</button>
          <button onClick = {() => this.updateSong(song.id, )}>Edit</button></tr>)}
        </table>
        <form onSubmit = {(event) => this.createSong(event)}>
          <h3>Add a song</h3>
        <label htmlfor="title">Title:</label>
        <input type = "text" id="title" name="title"/><br/>
        <label htmlfor="artist">Artist:</label>
        <input type = "text" id="artist" name="artist"/><br/>
        <label htmlfor="album">Album:</label>
        <input type = "text" id="album" name="album"/><br/>
        <label htmlfor="release_date">Release Date:</label>
        <input type="text" id="release_date" name="release_date"/><br/>
        <button type="submit">Submit</button>
        </form>
      </div>
    );
  } 
}

export default App;
