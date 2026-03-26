# attendance-app

# Attendance Management System (Node.js + MongoDB)

A backend-based **Attendance Management System** built using **Node.js, Express, and MongoDB (Mongoose)**.
This project allows you to manage students and track their daily attendance efficiently.

-----
## 🚀 Features

### 👨‍🎓 Student Management

* Create Student
* Get All Students
* Update Student
* Delete Student

### 📅 Attendance Management

* Mark Attendance (Present / Absent)
* Prevent duplicate attendance (one per student per day)
* Get Attendance by Student
* Get Attendance by Date
* Update Attendance
* Delete Attendance

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Tools:** Postman / Thunder Client

---

## 📁 Project Structure

```
attendance-app/
│
├── models/
│   ├── student.js
│   └── attendance.js
│
├── controllers/
│   ├── studentController.js
│   └── attendanceController.js
│
├── routes/
│   ├── studentRoutes.js
│   └── attendanceRoutes.js
│
├── config/
│   └── db.js
│
├── .env
├── server.js
└── package.json
```


## 📡 API Endpoints

### 👨‍🎓 Student APIs

| Method | Endpoint           | Description      |
| ------ | ------------------ | ---------------- |
| POST   | `/student`         | Create student   |
| GET    | `/students`        | Get all students |
| PUT    | `/student/:id`     | Update student   |
| DELETE | `/student/:id`     | Delete student   |

---

### 📅 Attendance APIs

| Method | Endpoint                             | Description       |
| ------ | ------------------------------------ | ----------------- |
| POST   | `/attendance`                        | Mark attendance   |
| GET    | `/attendance/student/:studentId`     | Get by student    |
| GET    | `/attendance/date/:date`             | Get by date       |
| PUT    | `/attendance/:id`                    | Update attendance |
| DELETE | `/attendance/:id`                    | Delete attendance |

---

## 🔒 Important Logic

* ✅ **Unique Constraint:**
  Each student can have only **one attendance per day**

* ✅ **Validation:**

  * Required fields check
  * Valid MongoDB ObjectId check

* ✅ **Date Normalization:**
  Time is removed to avoid duplicate entries

---

## 🔥 Future Improvements

* Bulk Attendance (mark whole class at once)
* Attendance Percentage Calculation
* Authentication (Admin/Teacher roles)
* Frontend Integration (React.js)
* Dashboard Analytics

---

## 👨‍💻 Author

**Sumit Kumar Bharti**
