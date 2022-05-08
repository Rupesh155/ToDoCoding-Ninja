// import mongoose
const mongoose = require('mongoose');

// database schema definition
const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    date : {
        type : String,
    }
});


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;