const express = require('express');
 require('console.table');
var inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./db/connection')
//const departmentRoutes = require('./apiRoutes/departmentsRoute');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/api', departmentRoutes);

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
            worker.manager_id,
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
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'department' ,
                message: "What is the name of the new Department?"
              }
            ]).then((answers) => {
          app.post('/department', ({ body }, res) => {
    
            const sql = `INSERT INTO department (dep_name) VALUES (?)`;
            const params = [
                body.dep_name
            ];
        
            db.query(sql, params, (err, result)=> {
                if (err) {
                    res.status(400).json({ error: err.message });
                    return;
                  }
                  res.json({
                    message: 'success',
                    data: body
                  });
                  startQuestions();
                });
            });
          });

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

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
