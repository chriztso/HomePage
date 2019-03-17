import React from 'react';
import music from './musicList.css';
import axios from 'axios';

class MusicList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allMusic: [],
            toAddMusic: ''
        }
    this.getMusic = this.getMusic.bind(this); 
    this.addMusic = this.addMusic.bind(this);  
    this.submitMusic = this.submitMusic.bind(this);    
    }
componentDidMount(){
  this.getMusic();
}

getMusic(){
  axios.get('/music')
    .then((data) => {
      console.log('HERE', data.data);
      this.setState({allMusic : data.data});
    })
    .catch((err) => {
      console.log(err);
    })
}

addMusic(event){
  this.setState({toAddMusic : event.target.value});
}

submitMusic(){
  axios.post('/music', 
    {
    music: this.state.toAddMusic
    })
    .then(() => {this.getMusic()})
    .catch((err) => {
            console.log(err);
    })
}
   
    render(){
        var list = this.state.allMusic.map(music => 
            <div className={music.musicItem} > {music.id} {music.music} </div>  
        );
        return (
          <div className={music.musicStyle}>
          <div className={music.musicHeader}>
            <h3 className={music.musicHeaderText}> Music </h3>
          </div>
          <input type="text" className={music.musicInput} onChange={this.addMusic}></input>
          <input type="submit" value="Add" onClick = {this.submitMusic}></input>
          <div>
            {list}  
          </div>
          </div>   
        )
    }
}

export default MusicList;