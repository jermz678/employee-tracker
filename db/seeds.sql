
INSERT INTO department (dep_name)
VALUES
('Front'),
('Back'),
('Middle');

INSERT INTO employee_role (title, salary, department_id)
VALUES
('Manager', 60000.00, 1),
('Worker', 40000.00, 2),
('Trainee', 30000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jake', 'Smith', 2, 3),
('Joseph', 'Jones', 3, 1),
('John', 'Mulligan', 1, NULL);






