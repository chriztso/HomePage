import React from 'react';
import people from './peopleList.css';
import axios from 'axios';

class PeopleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allPeople: [],
            toAddPeople: ''
        }
    this.getPeople = this.getPeople.bind(this);
    this.addPeople = this.addPeople.bind(this);
    this.submitPeople = this.submitPeople.bind(this);
    this.deletePeople = this.deletePeople.bind(this);    
    }
    
   componentDidMount(){
     this.getPeople();
   }
    
   getPeople(){
     axios.get('/people')
    .then((data) => {
    console.log('HERE', data.data);
       this.setState({allPeople : data.data});
    })
    .catch((err) => {
      console.log(err);
      })
    }
    
    
   addPeople(event){
      this.setState({toAddPeople : event.target.value});
   }
    
  submitPeople(){
    axios.post('/people', 
     {
      people : this.state.toAddPeople
     })
     .then(() => {this.getPeople()})
     .catch((err) => {
        console.log(err);
      })
   }
    
   deletePeople(){
    axios.delete('/people')
    .then(() => {this.getPeople()})
    .catch((err) => {
        console.log(err);
    }) 
  }   
  
  render(){
      var list = this.state.allPeople.map(person => 
        <div className={people.peopleItem} >
        <div className={people.text}>
         {person.people} 
        </div>
        <span className={people.Buttons}>
          <input type="submit" value="-" ></input>
          <input type="submit" value="x"></input>
        </span>
        </div>  
    );
        return (
          <div className={people.peopleStyle}>
          <div className={people.peopleHeader}>
            <div>
              <h3 className={people.peopleHeaderText}> To Connect With </h3>
            </div>

            <div>  
              <img src="https://s3.us-east-2.amazonaws.com/chrismvp/people.png" className={people.image}/>
            </div>

            <div className={people.clearAll}>  
              <input type="submit" value="x" onClick = {this.deletePeople}></input>
            </div>

          </div>
          <input type="text" className = {people.peopleInput} onChange={this.addPeople}></input>
          <input type="submit" value="+" onClick={this.submitPeople} className={people.addButton}></input>
          <div>
            {list}
          </div>  
          </div>   
        )
    }
}

export default PeopleList;