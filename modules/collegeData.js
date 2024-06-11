/*********************************************************************************
*  WEB700 – Assignment 3
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Huy Manh Le (Thomas Le) Student ID: hle37 Date: 2024/06/10
*
********************************************************************************/

const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

var dataCollection = null;

function initialize() {
    console.log("Initializing college data...")
    return new Promise((resolve, reject) => {
        let studentDataFromFile;
        let courseDataFromFile;
        let count = 2;

        fs.readFile("./data/students.json", "utf8", function (error, data) {
            if (error) {
                console.log(error);
                reject(error);
                return;
            }

            studentDataFromFile = JSON.parse(data);

            fs.readFile("./data/cources.json", "utf8", function (error, data) {
                if (error) {
                    console.log(error);
                    reject(error);
                    return;
                }

                courseDataFromFile = JSON.parse(data);

                dataCollection = new Data(studentDataFromFile, courseDataFromFile);
                resolve("Initialization successful!");
            })
        })
    });
}

function getAllStudent() {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No results returned");
        }
    });
}

function getStudentByFilter(filter) {
    return new Promise((resolve, reject) => {
        let result;
        getAllStudent()
            .then((students) => {
                result = Array.from(students).filter(filter);

                if (result.length > 0) {
                    resolve(result);
                } else {
                    reject("No results returned");
                }
            })
            .catch(result => reject(result));
    });
}

function getStudentByNum(input) {
    return new Promise((resolve, reject) => {
        try {
            number = parseInt(input);
            resolve(getStudentByFilter(o => o.studentNum === number));
        } catch (e) {
            reject("No results returned");
        }
    });
}

function getStudentByCourse(input) {
    return new Promise((resolve, reject) => {
        try {
            number = parseInt(input);
            resolve(getStudentByFilter(o => o.course === number));
        } catch (e) {
            reject("No results returned");
        }
    });
}

function getTAs() {
    return getStudentByFilter(o => o.TA === true);
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("No results returned");
        }
    });
}

module.exports = {
    initialize,
    getAllStudent,
    getStudentByNum,
    getStudentByCourse,
    getTAs,
    getCourses,
};