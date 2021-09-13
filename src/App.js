import { useState } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";


function App() {

  const [tasks, settasks] = useState([
        {
          "id": 1,
          "text": "Doctors Appointment",
          "day": "Feb 5th at 2:30pm",
          "reminder": true,
          "isActive" : true
        },
        {
          "id": 2,
          "text": "Meeting at School",
          "day": "Feb 6th at 1:30pm",
          "reminder": true,
          "isActive": true
        }
      ])
    
  const addTask = (task)=>{
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTasks = {id , ...task};
    settasks([...tasks , newTasks]);
   
  }

  const deleteTask = (id) =>{
    settasks(tasks.map((task)=>task.id ===id ? {...tasks, isActive:false}:task))
    settasks(tasks.filter((task)=> task.id!==id));
  }
  const Reminder = (id)=>{
    settasks(tasks.map((task)=>task.id === id ? {...task, reminder:!task.reminder}:task))
  }

  return (
    <div className="container">
    <Header title="Todo List"/>
    <AddTask onAdd={addTask}/>
    {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={Reminder}/> : 'Nothing to show'}
    </div>
  );
}

export default App;
