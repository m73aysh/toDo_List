const mongoose = require ("mongoose")


const dbURI = "mongodb://localhost:27017/TodoList";

mongoose.connect(dbURI)

// Extra

const db = mongoose.connection

db.on("erroe" , (err) => {
    console.log("ERROR in MongoDB")
});

db.on("connected" , (err) => {
    console.log("MongoDB is CONNECTED ...")
})