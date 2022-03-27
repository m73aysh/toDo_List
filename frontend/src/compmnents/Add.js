import React , {useState} from 'react'

export default function Add(props) {

    const [newtitle, setNewtitle] = useState("")

    const creatNewTodo = () => {

        console.log("create new task");
        props.createFunction({title: newtitle , isCompleted : false})
    }

  return (
    <div className='Add'>

        <input className='input' type= "text" placeholder='Write new task' onChange={(e) => {
            setNewtitle(e.target.value)
        }}/>
        <button className='button' onClick={creatNewTodo}>Add new task</button>


    </div>
  )
}
