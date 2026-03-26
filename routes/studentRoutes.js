const express = require("express");
const router = express.Router();


// Import controller
const { createStudent, getAllStudents,updateStudent,deleteStudent } = require("../controllers/studentControllers");


// Route
router.post("/student", createStudent);
router.get("/Student", getAllStudents);
router.put("/student/:id",updateStudent);
router.delete("/student/:id",deleteStudent)



module.exports = router;
