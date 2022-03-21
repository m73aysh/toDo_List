import React from 'react'

export default function Todo(props) {

    const {_id, title , isCompleted} = props.task

  return (
    <div className='Todo'>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
        
        
        <input type= "checkbox" defaultChecked = {isCompleted} onClick = {() =>{ props.updateTask(_id , !isCompleted) }}/>
        <span style={{textDecoration : isCompleted ? "line-through" : "none"}}>{title}</span>
        <button onClick={() => {props.deleteTask(_id)}}
          className="btn"><i className="fa fa-trash"></i></button>
    
    
    </div>
  )
}
