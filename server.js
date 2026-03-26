const express = require('express');
const app = express();
const db = require('./config/db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;

// Import the router files
const studentRoutes = require('./routes/studentRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes')


// Use the routers
app.use ('/',studentRoutes)
app.use("/", attendanceRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});