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
          </div>
          <input type="text" className = {people.peopleInput}></input>
          </div>   
        )
    }
}

export default PeopleList;