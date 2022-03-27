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


  const deleteTask = (id) => {
    axios
    .delete(`http://localhost:5000/task/${id}`)   /* or "http://localhost:5000/" + id */
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


  const updateTask = (id , newStatus) => {
    axios
    .put(`http://localhost:5000/updateTask/${id}/${newStatus}`)   /* or "http://localhost:5000/" + id */
    .then((response) => {
      // console.log("Response: " , response);
      console.log("Data: " , response.data);
      // setTasks(response.data)
      getData()
      // SEARCH IN INTERNET for change react state using spread operator 

    })
    .catch((err) => {
      console.log("Error: " , err);
    })
  }

  const deleteCompletedTask = (id) => {
    axios
    .delete(`http://localhost:5000/completedTasks`)   /* or "http://localhost:5000/" + id */
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


  const filter = (status) =>{
    axios
    .get(`http://localhost:5000/filter?isCompleted=${status}`)
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
  <Todo key = {taskObj._id} task = {taskObj} deleteTask = {deleteTask} updateTask = {updateTask}/>
  ))

  return (

    
    <div className='app'>
      <p>Tasks</p>

      <Add createFunction = {postNewTask}/>
      <button className='button' onClick = {getData}>Get tasks</button>
      <button className='button' onClick = {deleteCompletedTask}>Delete completed tasks</button>
      <button className='button' onClick = {() => filter(true)}>Get completed tasks</button>
      <button className='button' onClick = {() => filter(false)}>Get pending tasks</button>

      
      {mapOverTasks}
    
    </div>
  )
}
