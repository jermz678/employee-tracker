const express = require('express');
const cTable = require('console.table');
var inquirer = require('inquirer');
//const mysql = require('mysql2');
const db = require('./db/connection')
const departmentRoutes = require('./apiRoutes/departmentsRoute');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', departmentRoutes);

const questions = [
  {
    type: 'list',
      name: 'choices',
      message: 'choose from the following',
      choices: [
        'View all Departments',
        'View all Roles',
        'View all Employees',
        'Add a Department',
        'Add a Role',  
        'Add an Employee',
        'Update an Employee'
      ]
  }
]


startQuestions = function(){
  inquirer.prompt(questions)
  .then(data => {
      switch (data.choices){
        case 'View all Departments':
          db.query(`SELECT * FROM department`, (err, rows) => {
            console.table(rows);
            startQuestions();
          });
          break;
        case 'View all Roles':
          db.query(`SELECT * FROM employee_role`, (err, rows) => {
            console.table(rows);
            startQuestions();
          });
          break;
          case 'View all Employees':
            db.query(`SELECT employees.*, employee_role.salary
                      AS salary
                      FROM employees
                      LEFT JOIN employee_role
                      ON employees.role_id = role.`, (err, rows) => {
              console.table(rows);
              startQuestions();
            });
            break;
        default:
          console.log('woopsies')
    };
  })};
    

startQuestions()

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, 
//including employee ids, first names, last names, job titles,
// departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department
// is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role
// and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role,
// and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role
// and this information is updated in the database 
