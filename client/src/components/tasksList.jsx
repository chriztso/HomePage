import React from 'react';
import tasks from './tasksList.css';
import axios from 'axios';

class TasksList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            allTasks : [],
            toAdd : ''
        }
    this.getTasks = this.getTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.submitTask = this.submitTask.bind(this);
    }
    
    componentDidMount(){
        this.getTasks();
    }

    getTasks(){
        axios.get('/tasks')
        .then((data) => {
            console.log('HERE', data.data);
            this.setState({allTasks : data.data});
        })
        .catch((err) => {
            console.log(err);
        })
    }

    addTask(event){
        this.setState({toAdd : event.target.value});
    }

    submitTask(){
        axios.post('/tasks', 
        {
          tasks: this.state.toAdd
        })
        .then(() => {this.getTasks()})
        .catch((err) => {
            console.log(err);
        })
    }

    render(){
         
        var list = this.state.allTasks.map(task => 
            <div className={tasks.taskItem} > {task.id} {task.tasks} </div>  
        );
        return (
          <div className={tasks.tasksStyle}>
          <div className={tasks.tasksHeader}>
            <h3 className={tasks.tasksHeaderText}> Tasks </h3>
          </div>
          <input type="text" className={tasks.tasksInput} onChange = {this.addTask}></input>
          <input type="submit" value="Add" onClick = {this.submitTask}></input>
          <div>
             {list}
          </div>
          </div>   
        )
    }
}




export default TasksList;