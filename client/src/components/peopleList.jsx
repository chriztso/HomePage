import React from 'react';
import people from './peopleList.css';
import axios from 'axios';

class PeopleList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allPeople: [],
            toAddPeople: '',
            toBeUpdated: '',
            idNumber : ''
        }
    this.getPeople = this.getPeople.bind(this);
    this.addPeople = this.addPeople.bind(this);
    this.submitPeople = this.submitPeople.bind(this);
    this.deletePeople = this.deletePeople.bind(this);  
    this.deletePerson = this.deletePerson.bind(this); 
    this.updatePeople = this.updatePeople.bind(this);  
    this.getId = this.getId.bind(this); 
    this.submitUpdate = this.submitUpdate.bind(this);    
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
  
  
deletePerson(id){
  axios.delete('/deletePerson', {data : { number : id}})
  .then(() => {this.getPeople()})
  .catch((err) => {console.log(err);})
}

updatePeople(event){
  this.setState({toBeUpdated : event.target.value});
}

getId(id){
   this.setState({idNumber: id});
}

submitUpdate(){
  axios.put('/updatePeople', {number : this.state.idNumber, text : this.state.toBeUpdated})
  .then(() => {this.getPeople()})
  .catch((err) => {console.log(err);})
}
  
  render(){
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
            <PeopleList1 people={this.state.allPeople} deletePerson={this.deletePerson} updatePeople={this.updatePeople} getId={this.getId} submitUpdate={this.submitUpdate}/>
          </div>  
          </div>   
        )
    }
}

const PeopleList1 = (props) => {
  return(
    props.people.map(person => 
      <PersonItem1 person ={person} deletePerson = {props.deletePerson} updatePeople={props.updatePeople} getId={props.getId} submitUpdate={props.submitUpdate}/>
    )
  )
}

class PersonItem1 extends React.Component{
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
  <div className={people.innerDiv} onClick={() => {this.props.getId(this.props.person.id)}} >
  <div className={people.text} >
    {this.props.person.people}
  </div>
  <div className={people.Buttons}>
    <input type="submit" value="-" onClick = {this.handleClick}></input>
    <input type="submit" value="x" onClick={() => {this.props.deletePerson(this.props.person.id)}}></input>
  </div>
  </div>
  }
  
  if(this.state.clicked === true){
  item = 
  <div>
   <input type = "text" onChange={this.props.updatePeople}></input> 
   <input type = "submit" value="Edit" onClick={this.update}></input>  
   </div> 
  } 

  return(
    <div className = {people.peopleItem}> 
      {item}
    </div>  
  )
 }
}

export default PeopleList;