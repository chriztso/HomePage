import React from 'react';
import music from './musicList.css';
import axios from 'axios';

class MusicList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allMusic: [],
            toAddMusic: '',
            toBeUpdated: '',
            idNumber : ''
        }
    this.getMusic = this.getMusic.bind(this); 
    this.addMusic = this.addMusic.bind(this);  
    this.submitMusic = this.submitMusic.bind(this); 
    this.deleteMusic = this.deleteMusic.bind(this);  
    this.deleteMusicOne = this.deleteMusicOne.bind(this); 
    this.updateMusic = this.updateMusic.bind(this);   
    this.getId = this.getId.bind(this); 
    this.submitUpdate = this.submitUpdate.bind(this); 
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

updateMusic(event){
  this.setState({toBeUpdated : event.target.value});
}

getId(id){
   this.setState({idNumber: id});
}

submitUpdate(){
  axios.put('/updateMusic', {number : this.state.idNumber, text : this.state.toBeUpdated})
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
            <MusicList1 music={this.state.allMusic} deleteMusicOne={this.deleteMusicOne} updateMusic={this.updateMusic} getId={this.getId} submitUpdate={this.submitUpdate}/> 
          </div>
          </div>   
        )
    }
}


const MusicList1 = (props) => {
  return(
    props.music.map(music => 
      <MusicItem1 music ={music} deleteMusicOne = {props.deleteMusicOne} updateMusic={props.updateMusic} getId={props.getId} submitUpdate={props.submitUpdate}/>
    )
  )
}


class MusicItem1 extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      clicked : false
    }
this.handleClick = this.handleClick.bind(this);
this.update = this.update.bind(this);
}

handleClick(){
  this.setState({clicked : !this.state.clicked});  
}

update(){
 this.props.submitUpdate();
 this.setState({clicked : !this.state.clicked});  
}

render(){
  var item; 
  if(this.state.clicked === false){
  item = 
  <div className={music.innerDiv} onClick={() => {this.props.getId(this.props.music.id)}} >
  <div className={music.text} >
  {this.props.music.music}
  </div>
  <div className={music.Buttons}>
    <input type="submit" value="-" onClick = {this.handleClick}></input>
    <input type="submit" value="x" onClick={() => {this.props.deleteMusicOne(this.props.music.id)}}></input>
  </div>
  </div>
  }
  
  if(this.state.clicked === true){
  item = 
  <div>
   <input type = "text" onChange={this.props.updateMusic}></input> 
   <input type = "submit" value="Edit" onClick={this.update}></input>  
   </div> 
  } 

  return(
    <div className = {music.musicItem}> 
      {item}
    </div>  
  )
 }
}
export default MusicList;