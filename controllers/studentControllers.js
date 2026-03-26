const student = require("../models/student");

// create student
const createStudent = async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the student data
    console.log("BODY:", data);

    if (
      !data.name ||
      !data.email ||
      !data.rollNumber ||
      !data.class ||
      !data.section
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //Check duplicate email or rollNumber

    const existingStudent = await student.findOne({
      $or: [{ email: data.email }, { rollNumber: data.rollNumber }],
    });

    if (existingStudent) {
      return res.status(400).json({
        error: "Student with this email or rollNumber already exists",
      });
    }
    // Create new student
    const newStudent = new student(data);

    // Save the new student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
      message: "Student created successfully",
      data: savedStudent,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Students

const getAllStudents = async (req, res) => {
  try {
    const Students = await student.find(); // featchnig data  from db
    res.status(200).json({ message:"Get All Student Successfully", Students});

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update student
const updateStudent = async (req, res) => {
  try {
    const studentUpdated = await student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true });

    res.status(200).json({message:"Student Update Successfully",studentUpdated});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Student
const deleteStudent = async (req,res)=>{
    try{
        const studentDeleted = await student.findByIdAndDelete(req.params.id);
        res.send({message:"student deleted successfully", studentDeleted})

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });

    }
}

module.exports = { createStudent, getAllStudents, updateStudent,deleteStudent };
