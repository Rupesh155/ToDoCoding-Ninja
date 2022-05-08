// import database configuaration
const db = require('../config/mongoose');

// import database model
const Task = require('../models/task');

// This function will create a new task entry in the database from the entered data and refresh the whole page
module.exports.create = function(req, res){
    let newDate;
    // if no date is selected
    if(req.body.date.length == 0){
        newDate = 'No Deadline'
    }
    // If date is selected, this will convert the date to required format
    else{
        let temp = req.body.date;
        let date = temp.substring(8, 10);
        let mon = temp.substring(5, 7);
        let year = temp.substring(0, 4);

        if(date[0] == '0'){
            date = date.substring(1);
        }
        if(mon[0] == '0'){
            mon = mon.substring(1);
        }

        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        newDate = "" + months[mon-1] + " " + date + ", " + year;
    }
    // To create new task and store in database
    Task.create({
        description : req.body.description,
        category : req.body.category,
        date : newDate
    }, function(err){
        if(err){
            console.log('Error creating Contact');
            return;
        }
        return res.redirect('back');
    });
}

// this function will be called when delete-task button is clicked.
// It can delete a task or a list of tasks from database.
module.exports.delete = function(req, res){
    // If user haven't selected any task to delete
    if(req.body.id == undefined){
        console.log("User haven't selected any task to delete");
        return res.redirect('back');
    }
    // If only one task is to be deleted
    else if(typeof(req.body.id) == 'string'){
        Task.findByIdAndDelete(req.body.id, function(err){
                if(err){
                    console.log("error deleting task ");
                    return;
                }
                return res.redirect('back');
            });
    }
    // If multiple tasks are to be deleted
    else{
        for(let i of req.body.id){
            Task.findByIdAndDelete(i, function(err){
                if(err){
                    console.log("error deleting tasks ");
                    return;
                }
            });
        }
        return res.redirect('back');
    }
};