DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS department; 



CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
  CONSTRAINT fk_party FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE SET NULL,
     CONSTRAINT fk_party FOREIGN KEY (manager_id) REFERENCES employee_role(id) ON DELETE SET NULL
);

CREATE TABLE employee_role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
     CONSTRAINT fk_party FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dep_name VARCHAR(30) NOT NULL
);