import React from 'react';
import media from './media.css';
import axios from 'axios';

class MediaList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allMedia : [],
            toAddMedia : '', 
            toBeUpdated: '',
            idNumber : ''
        }

    this.getMedia = this.getMedia.bind(this);
    this.addMedia = this.addMedia.bind(this);
    this.submitMedia = this.submitMedia.bind(this);
    this.deleteMedia = this.deleteMedia.bind(this);  
    this.deleteMediaOne = this.deleteMediaOne.bind(this);
    this.updateMedia = this.updateMedia.bind(this);   
    this.getId = this.getId.bind(this); 
    this.submitUpdate = this.submitUpdate.bind(this);    
    }

  componentDidMount(){
      this.getMedia();
  }

  getMedia(){
      axios.get('/media')
      .then((data) => {
          console.log('HERE', data.data);
          this.setState({allMedia : data.data});
      })
      .catch((err) => {
          console.log(err);
      })
  }

    addMedia(event){
        this.setState({toAddMedia : event.target.value});
    }

    submitMedia(){
        axios.post('/media', 
        {
            media : this.state.toAddMedia
        })
        .then(() => {this.getMedia()})
        .catch((err) => {
            console.log(err);
        })
    }

    deleteMedia(){
        axios.delete('/media')
        .then(() => {this.getMedia()})
        .catch((err) => {
            console.log(err);
        }) 
    }  
   
    
  deleteMediaOne(id){
    axios.delete('/deleteMedia', {data : { number : id}})
    .then(() => {this.getMedia()})
    .catch((err) => {console.log(err);})
  }
  
  updateMedia(event){
    this.setState({toBeUpdated : event.target.value});
  }
  
  getId(id){
     this.setState({idNumber: id});
  }
  
  submitUpdate(){
    axios.put('/updateMedia', {number : this.state.idNumber, text : this.state.toBeUpdated})
    .then(() => {this.getMedia()})
    .catch((err) => {console.log(err);})
  }


    render(){

     return (
          <div className={media.mediaStyle}>
          <div className={media.mediaHeader}>
            <div>
              <h3 className={media.mediaHeaderText}> Movies/TV Shows </h3>
            </div>
            <div>
              <img src="https://s3.us-east-2.amazonaws.com/chrismvp/video.png" className={media.image}/>
            </div>
            <div className={media.clearAll}>
              <input type="submit" value="x" onClick = {this.deleteMedia}></input>
            </div>
          </div>
          <input type="text" className={media.mediaInput} onChange={this.addMedia}></input>
          <input type="submit" value="+" onClick={this.submitMedia} className={media.addButton}></input>
          <div>
             <MediaList1 media = {this.state.allMedia} deleteMediaOne={this.deleteMediaOne} updateMedia={this.updateMedia} getId={this.getId} submitUpdate={this.submitUpdate}/>
          </div>
          </div>   
        )
    }
}


const MediaList1 = (props) => {
  return(
    props.media.map(media => 
      <MediaItem1 media ={media} deleteMediaOne = {props.deleteMediaOne} updateMedia={props.updateMedia} getId={props.getId} submitUpdate={props.submitUpdate}/>
    )
  )
}

class MediaItem1 extends React.Component{
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
  <div className={media.innerDiv} onClick={() => {this.props.getId(this.props.media.id)}} >
  <div className={media.text} >
  {this.props.media.media}
  </div>
  <div className={media.Buttons}>
    <input type="submit" value="-" onClick = {this.handleClick}></input>
    <input type="submit" value="x" onClick={() => {this.props.deleteMediaOne(this.props.media.id)}}></input>
  </div>
  </div>
  }
  
  if(this.state.clicked === true){
  item = 
  <div>
   <input type = "text" onChange={this.props.updateMedia}></input> 
   <input type = "submit" value="Edit" onClick={this.update}></input>  
   </div> 
  } 

  return(
    <div className = {media.mediaItem}> 
      {item}
    </div>  
  )
 }
}

export default MediaList;