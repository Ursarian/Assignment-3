/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Huy Manh Le (Thomas Le) Student ID: hle37 Date: 2024/06/10
*
********************************************************************************/

const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();

const collegeData = require("./modules/collegeData.js");
const path = require('path');

// Get Students
app.get("/students", (req, res) => {
    course = req.query.course

    if (course) {
        console.log("Getting student by course " + course)
        collegeData.getStudentByCourse(course).then(result => res.send(result)).catch(error => res.send({ message: "no results" }))
    } else {
        collegeData.getAllStudent().then(result => res.send(result)).catch(error => res.send({ message: "no results" }))
    }
});

// Get Students by Number
app.get("/students/:num", (req, res) => {
    num = req.params.num

    if (num) {
        console.log("Getting student by number " + num)
        collegeData.getStudentByNum(num).then(result => res.send(result)).catch(error => res.send({ message: "no results" }))
    } else {
        collegeData.getAllStudent().then(result => res.send(result)).catch(error => res.send({ message: "no results" }))
    }
});

// Get TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs().then(result => res.send(result)).catch(error => res.send({ message: "no results" }))
});

// Get Courses
app.get("/courses", (req, res) => {
    collegeData.getCourses().then(result => res.send(result)).catch(error => res.send({ message: "no results" }))
});

// Get Home
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// Get About
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// Get Demo
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});


// Catch Error
app.use((req, res) => {
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

// Setup HTTP Server to Listen on HTTP_PORT
collegeData.initialize()
    .then((result) => {
        console.log(result);
        app.listen(HTTP_PORT, () => console.log("server listening on port: " + HTTP_PORT));
    })
    .catch(error => console.log(error));

