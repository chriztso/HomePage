import React from 'react';
import media from './media.css';
import axios from 'axios';

class MediaList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allMedia : [],
            toAddMedia : ''
        }

    this.getMedia = this.getMedia.bind(this);
    this.addMedia = this.addMedia.bind(this);
    this.submitMedia = this.submitMedia.bind(this);
    this.deleteMedia = this.deleteMedia.bind(this);    
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
    render(){
      var list = this.state.allMedia.map(media => 
        <div className={media.mediaItem} > {media.media} 
        <input type="submit" value="Edit" ></input>
        <input type="submit" value="Delete"></input>
        </div>  
    );
     return (
          <div className={media.mediaStyle}>
          <div className={media.mediaHeader}>
            <div>
              <h3 className={media.mediaHeaderText}> Movies/TV Shows </h3>
            </div>
            <div>
              <img src="https://s3.us-east-2.amazonaws.com/chrismvp/video.png" className={media.image}/>
              <input type="submit" value="x" onClick = {this.deleteMedia}></input>
            </div>
          </div>
          <input type="text" className={media.mediaInput} onChange={this.addMedia}></input>
          <input type="submit" value="+" onClick={this.submitMedia} className={media.addButton}></input>
          <div>
             {list}
          </div>
          </div>   
        )
    }
}

export default MediaList;