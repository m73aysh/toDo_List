import React from 'react'

export default function Todo(props) {

    const {_id, title , isCompleted} = props.task

  return (
    <div className='Todo m-3'>
        
        
        <input type= "checkbox" defaultChecked = {isCompleted} onClick = {() =>{ props.updateTask(_id , !isCompleted) }}/>
        
        
        
        <span  style={{textDecoration : isCompleted ? "line-through" : "none"}}>{title}</span>
        <button onClick={() => {props.deleteTask(_id)}}
          className="btn"><i className="fa fa-trash"></i></button>
    
    
    </div>
  )
}
