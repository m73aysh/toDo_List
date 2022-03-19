const express = require("express")
const app = express()

const db = require ("./db")
const Todo = require ("./todo")
app.use(express.json())



//------------------------------------------//


app.get("/" , (req , res) => {
    res.json("GET / is working")
})


//------------------------------------------//


app.get("/tasks" , (req , res) => {
    Todo.find ({}, (err , data) => {
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            res.json(data)
        }
    })
})

//------------------------------------------//

app.post("/newtask" , (req , res) => {
    Todo.create (req.body , (err , newTask) => {
        console.log(req.body)
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            res.status(201).json(newTask)
        }
    })
})



// ------------------------------------------//

app.delete("/task/:id" , (req , res) => {
    console.log(req.params.id)
    Todo.deleteOne ({_id: req.params.id} , (err , deletObj) => {
        
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            deletObj.deletedCount === 1
            ? res.json("Delted one object successfuly")
            : res.status(404).json("this object is not found")
        }
    })

})


// ------------------------------------------//

app.put("/task/:id" , (req , res) => {
    
    Todo.updateOne ({_id: req.params.id} , {title: req.body.newTitle} , (err , updateObj) => {
        
        if (err) {
            console.log( "ERROR: " , err )
            res.status(400).json(err)
        }else{
            console.log(updateObj)
            updateObj.modifiedCount === 1
            ? res.json("Update one object successfuly")
            : res.status(404).json("this object is not found")
        }
    })

})


// ------------------------------------------//



app.listen (5000 , () => {
    console.log(" Server is working ...")
})