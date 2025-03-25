
-- Create tables
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  status ENUM('Active', 'Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS user_departments (
  user_id INT NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (user_id, department_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS requests (
  id VARCHAR(20) PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  department_id INT NOT NULL,
  status ENUM('Pending', 'In Progress', 'Approved', 'Completed', 'Rejected') DEFAULT 'Pending',
  priority ENUM('Low', 'Medium', 'High') DEFAULT 'Medium',
  requester_id INT NOT NULL,
  assignee_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  FOREIGN KEY (requester_id) REFERENCES users(id),
  FOREIGN KEY (assignee_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id),
  FOREIGN KEY (receiver_id) REFERENCES users(id)
);

-- Insert default roles
INSERT INTO roles (name) VALUES 
('Admin'),
('Operator'),
('Guest');

-- Insert departments
INSERT INTO departments (name) VALUES 
('Finance'),
('Tax'),
('Payroll'),
('Accounting'),
('Digital Certificate');

-- Insert sample users with hashed passwords (password is 'password')
INSERT INTO users (name, email, password, role_id, status) VALUES
('John Doe', 'john@example.com', '$2b$10$VQtNlC6SBDw.ECCKXKaYZuBRHaZGzUjAj.R.aKiBjNNXJbfEF8fe.', 1, 'Active'),
('Jane Smith', 'jane@example.com', '$2b$10$VQtNlC6SBDw.ECCKXKaYZuBRHaZGzUjAj.R.aKiBjNNXJbfEF8fe.', 2, 'Active'),
('Alex Johnson', 'alex@example.com', '$2b$10$VQtNlC6SBDw.ECCKXKaYZuBRHaZGzUjAj.R.aKiBjNNXJbfEF8fe.', 3, 'Active'),
('Sarah Williams', 'sarah@example.com', '$2b$10$VQtNlC6SBDw.ECCKXKaYZuBRHaZGzUjAj.R.aKiBjNNXJbfEF8fe.', 2, 'Active'),
('Michael Brown', 'michael@example.com', '$2b$10$VQtNlC6SBDw.ECCKXKaYZuBRHaZGzUjAj.R.aKiBjNNXJbfEF8fe.', 1, 'Active');

-- Assign departments to users
INSERT INTO user_departments (user_id, department_id) VALUES
(1, 1), -- John: Finance
(1, 2), -- John: Tax
(2, 3), -- Jane: Payroll
(3, 4), -- Alex: Accounting
(4, 1), -- Sarah: Finance
(4, 5), -- Sarah: Digital Certificate
(5, 2), -- Michael: Tax
(5, 4); -- Michael: Accounting

-- Insert sample requests
INSERT INTO requests (id, title, description, department_id, status, priority, requester_id, assignee_id) VALUES
('REQ-001', 'Finance Module Access', 'Need access to the Finance module to view budget reports.', 1, 'Pending', 'High', 1, 4),
('REQ-002', 'Tax Documentation Approval', 'Requesting approval for the Q2 tax documentation.', 2, 'In Progress', 'Medium', 3, 5),
('REQ-003', 'Payroll Adjustment', 'Request for payroll adjustment for the accounting team.', 3, 'Approved', 'Medium', 2, 1),
('REQ-004', 'Digital Certificate Renewal', 'Requesting renewal of digital certificates for the development team.', 5, 'Completed', 'Low', 5, 3),
('REQ-005', 'Accounting System Access', 'Need access to the accounting system for audit purposes.', 4, 'Rejected', 'High', 4, 2);

-- Insert sample messages
INSERT INTO messages (sender_id, receiver_id, content, read) VALUES
(1, 2, 'Hey Jane, can you help me with the payroll system?', TRUE),
(2, 1, 'Sure John, what do you need help with?', TRUE),
(1, 2, 'I need to understand how to approve overtime requests.', TRUE),
(2, 1, 'I can show you tomorrow morning if that works for you.', FALSE),
(3, 1, 'John, have you reviewed the tax documentation?', FALSE),
(4, 5, 'Michael, I need access to the tax module.', TRUE),
(5, 4, 'I\'ll grant you access by the end of the day.', FALSE),
(1, 3, 'Alex, please update your request with more details.', TRUE),
(3, 1, 'I\'ve updated the request with additional information.', FALSE);
