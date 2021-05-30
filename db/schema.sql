DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS department; 



CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);

CREATE TABLE employee_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
     CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
     CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE SET NULL,
      CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);
SELECT e.id, e.first_name, e.last_name, employee_role.title, e.manager_id AS manager, employee_role.salary,
department.dep_name AS department
FROM employees AS e
LEFT JOIN employee_role
ON e.role_id = employee_role.id
LEFT JOIN department
ON employee_role.department_id = department.id;