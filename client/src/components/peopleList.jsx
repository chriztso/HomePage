import React from 'react';
import people from './peopleList.css';

class PeopleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
          <div className={people.peopleStyle}>
          <div className={people.peopleHeader}>
            <h3 className={people.peopleHeaderText}> People To Connect To </h3>
            <img src="https://s3.us-east-2.amazonaws.com/chrismvp/people.png" className={people.image}/>
          </div>
          <input type="text" className = {people.peopleInput}></input>
          </div>   
        )
    }
}

export default PeopleList;