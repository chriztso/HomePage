import React from 'react';
import ReactDOM from 'react-dom';
import app from './app.css';
import Weather from './weather.jsx';
import Facts from './fact.jsx';
import Memory from './memory.jsx';
import TasksList from './tasksList.jsx';
import MusicList from './musicList.jsx';
import MediaList from './media.jsx';
import PeopleList from './peopleList.jsx';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
           
    }
  }
  render() {
    var date = new Date();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNumber = date.getMonth();
    var month = months[monthNumber];
    var dayNumber = date.getDate();
    var year = date.getYear() + 1900;

    return(
      <div className={app.wholeApp} >  
        <div>
         <span className={app.date}>{month} {dayNumber}, {year}</span>
        </div>  
        <div className={app.topSection}>
          <Weather />
          <Facts />
          <Memory />
        </div>   
        <div className={app.bottomSection}> 
          <TasksList />
          <MusicList />
          <MediaList />
          <PeopleList />
        </div>
      </div>         
    )
  }
}   


export default App;
