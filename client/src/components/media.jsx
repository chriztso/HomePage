import React from 'react';
import media from './media.css';

class MediaList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
          <div className={media.mediaStyle}>
          <div className={media.mediaHeader}>
            <h3 className={media.mediaHeaderText}> Movies/TV Shows </h3>
          </div>
          <input type="text" className={media.mediaInput}></input>
          </div>   
        )
    }
}

export default MediaList;