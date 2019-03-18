import React from 'react';
import Memories from './memory.css';
import Axios from 'axios';


class Memory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            photo1 : '',
            photo2 : ''
        }
    this.getPhotos = this.getPhotos.bind(this);
    }

    componentDidMount(){
        this.getPhotos();
    }

    getPhotos(){
        Axios.get('/photos')
        .then((data) => {
        var randomPhoto1 = Math.floor(Math.random() * data.data.length);
        console.log(randomPhoto1);   
        var randomPhoto2 = Math.floor(Math.random() * data.data.length);
        console.log(randomPhoto2);
        this.setState({photo1 : data.data[randomPhoto1]});
        this.setState({photo2 : data.data[randomPhoto2]});
        console.log(data.data)})
        .catch((err) => {console.log(err)})
    }

    render(){
        return(
            <div className={Memories.memoryStyle}> 
               <img className = {Memories.memoryImage} src= {this.state.photo1.photos} />
               <img className = {Memories.memoryImage} src={this.state.photo2.photos} />
            </div>
        )
    }
}

export default Memory;