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
        <h1>Hello World!</h1>
      </div>
    );
  } 
}

export default App;
