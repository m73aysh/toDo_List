import React, { useEffect, useState } from 'react'
import "./App.css"
import axios from "axios"
import Todo from './compmnents/Todo'
import Add from './compmnents/Add'

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


  const postNewTask = (body) => {
    axios
    .post("http://localhost:5000/newtask" , body)
    .then((response) => {
      // console.log("Response: " , response);
      console.log("Data: " , response.data);
      // setTasks(response.data)
      getData()
      // SEARCH IN INTERNET for change react state usung spread operator 

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

      <Add createFunction = {postNewTask}/>
      <button onClick = {getData}>Get tasks</button>
      
      
      {mapOverTasks}
    
    </div>
  )
}
