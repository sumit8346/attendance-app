const attendance = require("../models/attendance");
const Student = require("../models/student");
const mongoose = require("mongoose");

// Mark Attendance
const markAttendance = async (req, res) => {
  try {
    const { studentId, date, status, markedBy } = req.body; // Assuming the request body contains the Attendance data
    console.log("BODY:", req.body);
    
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: "Invalid studentId",
      });
    }

    //Input Validation
    if (!studentId || !date || !status) {
      return res.status(400).json({ message: "All field are require" });
    }

    if (markedBy && !["teacher", "admin"].includes(markedBy)) {
      return res.status(400).json({
        message: "Invalid role (teacher/admin only)",
      });
    }

    // Normalize date

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    //Check student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student Not found" });
    }

    const existing = await attendance.findOne({
      studentId,
      date: attendanceDate,
    });

    if (existing) {
      return res.status(400).json({
        message: "Attendance already marked",
      });
    }

    //Save attendance

    const newAttendance = new attendance({
      studentId,
      date: attendanceDate,
      status,
      markedBy
    });

    const saved = await newAttendance.save();

    res.status(201).json({
      message: "Attendance marked",
      data: saved,
    });
  } catch (err) {
    console.log(err);

    //handle duplicate index error
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate attendance entry",
      });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Attendance by Student

const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({
        message: "Invalid studentId",
      });
    }

    //Fetch attendance
    const records = await attendance
      .find({ studentId })
      .populate("studentId", "name email rollNumber") // optional (very useful)
      .sort({ date: -1 }); // latest first

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance records found",
      });
    }

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Attendance by Student date
const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.params;

    // ✅ Normalize date
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const records = await attendance
      .find({ date: attendanceDate })
      .populate("studentId", "name email rollNumber")
      .sort({ createdAt: -1 });

    if (records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No attendance found for this date",
      });
    }

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Update Attendance
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        message: "Status is required",
      });
    }

    const updated = await attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance updated",
      data: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete Attendance
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await attendance.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Attendance not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Attendance deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  markAttendance,
  getAttendanceByStudent,
  getAttendanceByDate,
  updateAttendance,
  deleteAttendance,
};
