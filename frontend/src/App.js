import React, { useEffect, useState } from 'react'
import "./App.css"

import axios from "axios"
import {Routes , Route , Link} from "react-router-dom"

import Todo from './compmnents/Todo'
import Add from './compmnents/Add'
import Register from './compmnents/Register'
import Login from './compmnents/Login'

export default function App() {


  const [tasks, setTasks] = useState([])
  const [isLoggedIn, setIsLoggedIn ] = useState(false)
  const [username, setUsername ] = useState("")
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


  const logoutFunc = () => {
    setIsLoggedIn  (false);
    setUsername ("");
  }

  const mapOverTasks = tasks.map((taskObj , i) =>( 
  <Todo key = {taskObj._id} task = {taskObj} deleteTask = {deleteTask} updateTask = {updateTask}/>
  ))

  return (

    
    <div className='app '>
      <p className=' title m-3'>Tasks</p>
      <p className='profile m-3'>Profile: {username}</p>


{/* Bootstrap */}
<div className='navBar m-3'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light rounded">
        <div className="container-fluid">
           <a className="navbar-brand" href="#">Todo List</a>
           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
           </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                 <div className="navbar-nav ">

                   <Link to = "/Home" className='nav-link '>Home</Link>
                   <Link to = "/login" className='nav-link'>Login</Link>
                   <Link to = "/register" className='nav-link '>Register</Link>
                </div>
              </div>
        </div>
      </nav>
      </div>

      
      <button className='button m-3' onClick={logoutFunc}>Logout</button>
      <Routes>
      <Route path="/Home" element={
      <div className='Home'>
      <Add createFunction = {postNewTask}/>
      <button className='button m-3' onClick = {getData}>Get tasks</button>
      <button className='button m-3' onClick = {deleteCompletedTask}>Delete completed tasks</button>
      <button className='button m-3' onClick = {() => filter(true)}>Get completed tasks</button>
      <button className='button m-3' onClick = {() => filter(false)}>Get pending tasks</button>


      {mapOverTasks}
      </div>} />

      <Route path="login" element={
      <Login setIsLoggedIn = {setIsLoggedIn}
        setUsername = {setUsername}/>} />
      
      <Route path="/register" element={<Register/>} />
      
      </Routes>
      
      

    </div>
  )
}
