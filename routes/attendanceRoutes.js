const express = require("express");
const router = express.Router();


// Import controller

const {markAttendance,
    getAttendanceByStudent,
    getAttendanceByDate,
    updateAttendance,
    deleteAttendance } = require("../controllers/attendanceControllers");




// Route

router.post("/attendance", markAttendance );
router.get("/attendance/student/:studentId", getAttendanceByStudent );
router.get("/attendance/date/:date", getAttendanceByDate );
router.put("/attendance/:id", updateAttendance );

router.delete("/attendance/:id", deleteAttendance );



module.exports = router;