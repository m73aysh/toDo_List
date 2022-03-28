const express = require("express")
const cors = require("cors")

const app = express()

const db = require ("./db")
const Todo = require ("./todo")
const User = require ("./user")
app.use(express.json())
app.use(cors())



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

/*
app.get("/completedTask" , (req , res) => {
    Todo.find ({ isCompleted : "true"}, (err , data) => {
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            res.json(data)
        }
    })
})


------------------------------------------//


app.get("/inCompletedTask" , (req , res) => {
    Todo.find ({ isCompleted : "false"}, (err , data) => {
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            res.json(data)
        }
    })
})

//------------------------------------------//

*/

// below end point is doing the same job of the above two

app.get("/filter" , (req , res) => {
    Todo.find ({ isCompleted : req.query.isCompleted}, (err , data) => {
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            res.json(data)
        }
    })
})


//------------------------------------------//


app.post("/user/login" , (req , res) => {
    User.find ({ email: req.body.email }, (err , arrUserFound) => {
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            // if user data is available it well returned the data in array
            if (arrUserFound.length === 1) {
                // check entered password 
                if (req.body.password === arrUserFound[0].password) {
                    res.status(200).json({
                        message : "Login successfuly",
                        username: arrUserFound[0].username,
                    })
                }else{
                    // incorrect password
                    res.status(400).json({
                        message: "Wrong password"
                    })
                }
            }else {
                res.status(404).json({
                    message: "incorrect email"
                })
            }
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


//------------------------------------------//

app.post("/users/register" , (req , res) => {
    User.create (req.body , (err , newUser) => {
        console.log(req.body)
        if (err) {
            console.log( "ERROR: " , err )
            res.status(400).json({message : "this email already registered"})
        }else{
            res.status(201).json("Create new user successfuly")
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

app.delete("/completedTasks" , (req , res) => {
    
    Todo.deleteMany ({isCompleted: true } , (err , deletObj) => {
        
        if (err) {
            console.log( "ERROR: " , err )
        }else{
            deletObj.deletedCount === 0
            ? res.status(404).json("there is no completed tasks")
            : res.json("all completed tasks are deleted")
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

app.put("/updateTask/:id/:isCompleted" , (req , res) => {
    
    Todo.updateOne ({_id: req.params.id} , {isCompleted: req.params.isCompleted} , (err , updateObj) => {
        
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