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
    this.deleteTasks = this.deleteTasks.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
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

    deleteTasks(){
        axios.delete('/tasks')
        .then(() => {this.getTasks()})
        .catch((err) => {
            console.log(err);
        }) 
    }

    deleteTask(id){
      axios.delete('/deleteOne', {data : { number : id}})
      .then(() => {this.getTasks()})
      .catch((err) => {console.log(err);})
    }

    render(){
         
        return (
          <div className={tasks.tasksStyle}>
          <div className={tasks.tasksHeader}>

          <div>
            <h3 className={tasks.tasksHeaderText}> Tasks </h3>
          </div>  

          <div>
            <img src="https://s3.us-east-2.amazonaws.com/chrismvp/tasks.png" className={tasks.image}/> 
          </div> 

          <div className={tasks.clearAll}>
            <input type="submit" value="x" onClick = {this.deleteTasks}></input>
          </div>  

          </div>
          <input type="text" className={tasks.tasksInput} onChange = {this.addTask}></input>
          <input type="submit" value="+" onClick = {this.submitTask} className={tasks.addButton}></input>
          <div>
             <TaskList1 tasks={this.state.allTasks} deleteTask={this.deleteTask}/>
          </div>
          </div>   
        )
    }
}


const TaskList1 = (props) => {
    return(
      props.tasks.map(task => 
        <TaskItem1 task ={task} deleteTask = {props.deleteTask}/>
      )
    )
}

const TaskItem1 = (props) => {
  return(
    <div className={tasks.taskItem} > 
    <div className={tasks.text} >
      {props.task.tasks}
    </div>
      <span className={tasks.Buttons}>
        <input type="submit" value="-" ></input>
        <input type="submit" value="x" onClick={() => {props.deleteTask(props.task.id)}}></input>
      </span>
    </div>  
  )
}






export default TasksList;