import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from "axios"
import Todo from './compmnents/Todo'

export default function App() {


  const [tasks, setTasks] = useState([])

  useEffect( () => {
    getData()
  } , [])

  
  const getData = () =>{
    axios
    .get("http://localhost:5000/tasks")
    .then((response) => {
      console.log("Response: " , response);
      console.log("Data: " , response.data);
      setTasks(response.data)

    })
    .catch((err) => {
      console.log("Error: " , err);
    })
  }


  const mapOverTasks = tasks.map((taskObj , i) =>( 
  <Todo key = {i} task = {taskObj}/>
  ))

  return (
    <div className='app'>
      <p>App</p>
      <button onClick = {getData}>Get tasks</button>
      
      
      {mapOverTasks}
    
    </div>
  )
}
