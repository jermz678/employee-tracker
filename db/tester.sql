-- --// THEN I am presented with a formatted table showing employee data, 
-- //including employee ids, first names, last names, job titles,
-- // departments, salaries, and managers that the employees report to

-- SELECT column_name(s)
-- FROM table1
-- LEFT JOIN table2
-- ON table1.column_name = table2.column_name;


-- SELECT employee_role.title, employee_role.salary, department.dep_name
-- FROM employee_role 
-- LEFT JOIN department
-- ON employee_role.department_id = department.id;

SELECT worker.id, 
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
ON employee_role.department_id = department.id;