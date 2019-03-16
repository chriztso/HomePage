import React from 'react';
import Memories from './memory.css';

class Memory extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return(
            <div className={Memories.memoryStyle}> 
               Photo
            </div>
        )
    }
}

export default Memory;