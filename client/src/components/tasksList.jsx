import React from 'react';
import tasks from './tasksList.css';

class TasksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render(){
        return (
          <div className={tasks.tasksStyle}>
          <div className={tasks.tasksHeader}>
            <h3 className={tasks.tasksHeaderText}> Tasks </h3>
          </div>
          <input type="text" className={tasks.tasksInput}></input>
          </div>   
        )
    }
}

export default TasksList;