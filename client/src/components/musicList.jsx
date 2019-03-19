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
    this.deleteMusic = this.deleteMusic.bind(this);  
    this.deleteMusicOne = this.deleteMusicOne.bind(this);    
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

deleteMusic(){
  axios.delete('/music')
  .then(() => {this.getMusic()})
  .catch((err) => {
      console.log(err);
  }) 
}

deleteMusicOne(id){
  axios.delete('/deleteMusicOne', {data : { number : id}})
  .then(() => {this.getMusic()})
  .catch((err) => {console.log(err);})
}
   
    render(){
      
        return (
          <div className={music.musicStyle}>
          <div className={music.musicHeader}>
            <div>
             <h3 className={music.musicHeaderText}> Music </h3>
            </div>
            <div>
              <img src="https://s3.us-east-2.amazonaws.com/chrismvp/headphones.png" className={music.image}/>
            </div>
            <div className={music.clearAll}>
              <input type="submit" value="x" onClick = {this.deleteMusic}></input>
            </div>  
          </div>
          <input type="text" className={music.musicInput} onChange={this.addMusic}></input>
          <input type="submit" value="+" onClick = {this.submitMusic} className={music.addButton}></input>
          <div>
            <MusicList1 music={this.state.allMusic} deleteMusicOne={this.deleteMusicOne}/> 
          </div>
          </div>   
        )
    }
}


const MusicList1 = (props) => {
  return(
    props.music.map(music => 
      <MusicItem1 music ={music} deleteMusicOne = {props.deleteMusicOne}/>
    )
  )
}

const MusicItem1 = (props) => {
return(
  <div className={music.musicItem} > 
  <div className={music.text} >
    {props.music.music}
  </div>
    <span className={music.Buttons}>
      <input type="submit" value="-" ></input>
      <input type="submit" value="x" onClick={() => {props.deleteMusicOne(props.music.id)}}></input>
    </span>
  </div>  
)
}

export default MusicList;