import { useState ,  useEffect } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import {reactLocalStorage} from 'reactjs-localstorage';


function App() {




  const [tasks, settasks] = useState([])
  
      useEffect(() => {
        const getTasks = async () => {
          const tasksFromLocalStorage = await fetchTasks()
           settasks(tasksFromLocalStorage)
        }
        getTasks()
      }, [])

      const fetchTasks = async () => {
        const res = reactLocalStorage.getObject('tasks');

        return res
      }
    
  const addTask = (task)=>{
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = {id , ...task};
    const res = reactLocalStorage.setObject('tasks',[...tasks,newTask]);
    settasks(prevTasks=>([...prevTasks,newTask]));
   
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
