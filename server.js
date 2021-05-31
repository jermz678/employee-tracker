const express = require('express');
require('console.table');
var inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

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

const depQuestions = [
  {
    type: 'input',
    name: 'department' ,
    message: "What is the name of the new Department?"
  }
]

const roleQuestions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the roles title?'
  },
  {
    type: 'input',
    name: 'salary',
    message: 'What is the salary of this new role?'
  },
  {
    type: 'input',
    name: 'department',
    message: 'What department will this role be tied to? PLEASE CHOOSE THE ID NUMBER associated with the department'
  }
]

const employeeQuestions = [
  {
    type: 'input',
    name: 'firstName',
    message: 'Enter the Employees First Name'
  },
  {
    type: 'input',
    name: 'lastName',
    message: 'Enter the Employees Last Name'
  },
  {
    type: 'input',
    name: 'role',
    message: 'Enter the employees Role.  PLEASE CHOOSE THE ID NUMBER associated with the role.'
  },
  {
    type: 'input',
    name: 'manager',
    message: 'Enter the Employees Manager.  PLEASE CHOOSE THE ID NUMBER associated with the correct manager.'
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
          db.query(`SELECT employee_role.title, employee_role.salary, department.dep_name
          FROM employee_role 
          LEFT JOIN department
          ON employee_role.department_id = department.id;`, (err, rows) => {
            console.table(rows);
            startQuestions();
          });
          break;

        case 'View all Employees':
            db.query(`SELECT worker.id, 
            worker.first_name, 
            worker.last_name, 
            manager.last_name as Manager,
            employee_role.title,
            employee_role.salary, 
            department.dep_name AS department
            FROM employees worker
            LEFT JOIN employees manager
            ON manager.id = worker.manager_id
            LEFT JOIN employee_role
            ON worker.role_id = employee_role.id
            LEFT JOIN department
            ON employee_role.department_id = department.id;`, (err, rows) => {
              console.table(rows);
              startQuestions();
            });
            break;

        case 'Add a Department':
          inquirer.prompt(depQuestions)
          .then((data) => {
            db.query(`INSERT INTO department (dep_name)
            VALUES ('${data.department}')`)
            db.query(`SELECT * FROM department`, (err, rows) => {
              console.table(rows);
              startQuestions();
            });
          });
          break;

        case 'Add a Role':
          db.query(`SELECT * FROM department`, (err, rows) => {
            console.table(rows);
          inquirer.prompt(roleQuestions)
          .then((data) => {
            db.query(`INSERT INTO employee_role (title, salary, department_id)
            VALUES ('${data.title}', '${data.salary}', '${data.department}')`)
            db.query(`SELECT employee_role.title, employee_role.salary, department.dep_name
            FROM employee_role 
            LEFT JOIN department
            ON employee_role.department_id = department.id;`, (err, rows) => {
            console.table(rows);
            startQuestions();
            });
          });
          });
          break;

        case 'Add an Employee':
          db.query(`SELECT worker.id, 
            worker.first_name, 
            worker.last_name, 
            worker.role_id;
            manager.last_name as Manager,
            employee_role.title,
            employee_role.salary, 
            department.dep_name AS department
            FROM employees worker
            LEFT JOIN employees manager
            ON manager.id = worker.manager_id
            LEFT JOIN employee_role
            ON worker.role_id = employee_role.id
            LEFT JOIN department
            ON employee_role.department_id = department.id;`, (err, rows) => {
              console.table(rows);
            inquirer.prompt(employeeQuestions)
            .then((data) => {
              db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES ('${data.firstName}', '${data.lastName}', '${data.role}', '${data.manager}')`)
              db.query(`SELECT worker.id, 
            worker.first_name, 
            worker.last_name, 
            manager.last_name as Manager,
            employee_role.title,
            employee_role.salary, 
            department.dep_name AS department
            FROM employees worker
            LEFT JOIN employees manager
            ON manager.id = worker.manager_id
            LEFT JOIN employee_role
            ON worker.role_id = employee_role.id
            LEFT JOIN department
            ON employee_role.department_id = department.id;`, (err, rows) => {
              console.table(rows);
              startQuestions();
            });
          });
        });
          break;

        default:
          console.log('woopsies')
          startQuestions();
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

