const { lowerCase } = require('lodash');
const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowerCase:true
    },
    rollNumber:{
        type:Number,
        required:true,
        unique:true
    },
    class:{
        type:String
    },
    section:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now

    }

});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;