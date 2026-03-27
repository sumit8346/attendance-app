const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
     studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    
    date:{
        type: Date,
        required: true
    },

     status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    },

    markedBy: {
    type: String,
    enum: ["teacher", "admin"],   // ✅ restrict values
    default: null

    },
    timestamp: {
        type: Date,
        default: Date.now
    }

});

// Prevent duplicate attendance (IMPORTANT)
attendanceSchema.index({ studentId: 1, date: 1 }, { unique: true });


const attendance = mongoose.model('attendance', attendanceSchema);
module.exports = attendance;