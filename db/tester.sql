-- --// THEN I am presented with a formatted table showing employee data, 
-- //including employee ids, first names, last names, job titles,
-- // departments, salaries, and managers that the employees report to

-- SELECT column_name(s)
-- FROM table1
-- LEFT JOIN table2
-- ON table1.column_name = table2.column_name;

SELECT e.id, e.first_name, e.last_name, employee_role.title, e.manager_id AS manager, employee_role.salary,
department.dep_name AS department
FROM employees AS e
LEFT JOIN employee_role
ON e.role_id = employee_role.id
LEFT JOIN department
ON employee_role.department_id = department.id;

