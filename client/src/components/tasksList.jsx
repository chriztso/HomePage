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
    this.updateTasks = this.updateTasks.bind(this);   
    this.getId = this.getId.bind(this); 
    this.submitUpdate = this.submitUpdate.bind(this); 
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

    updateTasks(event){
      this.setState({toBeUpdated : event.target.value});
    }
    
    getId(id){
       this.setState({idNumber: id});
    }
    
    submitUpdate(){
      axios.put('/updateTasks', {number : this.state.idNumber, text : this.state.toBeUpdated})
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
             <TaskList1 tasks={this.state.allTasks} deleteTask={this.deleteTask} updateTasks={this.updateTasks} getId={this.getId} submitUpdate={this.submitUpdate}/>
          </div>
          </div>   
        )
    }
}


const TaskList1 = (props) => {
    return(
      props.tasks.map(task => 
        <TaskItem1 task ={task} deleteTask = {props.deleteTask} updateTasks={props.updateTasks} getId={props.getId} submitUpdate={props.submitUpdate}/>
      )
    )
}

// const TaskItem1 = (props) => {
//   return(
//     <div className={tasks.taskItem} > 
//     <div className={tasks.text} >
//       {props.task.tasks}
//     </div>
//       <span className={tasks.Buttons}>
//         <input type="submit" value="-" ></input>
//         <input type="submit" value="x" onClick={() => {props.deleteTask(props.task.id)}}></input>
//       </span>
//     </div>  
//   )
// }

class TaskItem1 extends React.Component{
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
  <div className={tasks.innerDiv} onClick={() => {this.props.getId(this.props.task.id)}} >
  <div className={tasks.text} >
  {this.props.task.tasks}
  </div>
  <div className={tasks.Buttons}>
    <input type="submit" value="-" onClick = {this.handleClick}></input>
    <input type="submit" value="x" onClick={() => {this.props.deleteTask(this.props.task.id)}}></input>
  </div>
  </div>
  }
  
  if(this.state.clicked === true){
  item = 
  <div>
   <input type = "text" onChange={this.props.updateTasks}></input> 
   <input type = "submit" value="Edit" onClick={this.update}></input>  
   </div> 
  } 

  return(
    <div className = {tasks.taskItem}> 
      {item}
    </div>  
  )
 }
}





export default TasksList;