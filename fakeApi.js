import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json()); // Handle JSON requests

// Sample data
let users = [
  { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', role: 'user' },
];

let employees = [
  { id: 1, name: 'Nguyen Van A', email: 'a@example.com', position: 'Developer' },
  { id: 2, name: 'Tran Thi B', email: 'b@example.com', position: 'Designer' },
];

let leaveRequests = [
  { id: 1, employeeId: 1, date: '2024-09-30', reason: 'Sick Leave', status: 'Pending' },
];

let payrolls = [
  { id: 1, employeeId: 1, salary: 5000 },
  { id: 2, employeeId: 2, salary: 4000 },
];

let trackInformation = { status: 'Active', leaveDays: 5, performance: 'Excellent' };

// Endpoint to update employee profile (Admin)
app.put('/profiles/:id', (req, res) => {
  console.log('Request body:', req.body); // Log request body to ensure you're receiving data
  const { id } = req.params;
  const employeeIndex = employees.findIndex(emp => emp.id === parseInt(id));
  if (employeeIndex !== -1) {
    employees[employeeIndex] = { id: parseInt(id), ...req.body };
    res.json(employees[employeeIndex]);
  } else {
    res.status(404).send('Profile not found');
  }
});


// Endpoint to get employee profile by ID
app.get('/profiles/:id', (req, res) => {
  const { id } = req.params;
  const employee = employees.find(emp => emp.id === parseInt(id));
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send('Profile not found');
  }
});

// Endpoint to get user by username and password
app.get('/users', (req, res) => {
  const { username, password } = req.query;
  const user = users.find(u => u.username === username && u.password === password);
  res.json(user ? [user] : []); // Return a user if found, else empty array
});

// Endpoint to get all employees
app.get('/employees', (req, res) => {
  res.json(employees);
});

// Endpoint to get all leave requests
app.get('/leave-requests', (req, res) => {
  res.json(leaveRequests);
});

// Endpoint to get leave requests for a specific employee
app.get('/leave-requests/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  const requests = leaveRequests.filter(req => req.employeeId === parseInt(employeeId));
  res.json(requests);
});

// Endpoint to get all payrolls
app.get('/payrolls', (req, res) => {
  res.json(payrolls);
});

// Endpoint to add a leave request
app.post('/leave-requests', (req, res) => {
  const newRequest = {
    id: leaveRequests.length + 1,
    ...req.body
  };
  leaveRequests.push(newRequest);
  res.status(201).json(newRequest);
});

// Endpoint to add a new employee (Admin)
app.post('/employees', (req, res) => {
  const newEmployee = {
    id: employees.length + 1,
    ...req.body
  };
  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

// Endpoint to update payroll information (Admin)
app.put('/payrolls/:id', (req, res) => {
  const { id } = req.params;
  const payrollIndex = payrolls.findIndex(p => p.id === parseInt(id));
  if (payrollIndex !== -1) {
    payrolls[payrollIndex] = { id: parseInt(id), ...req.body };
    res.json(payrolls[payrollIndex]);
  } else {
    res.status(404).send('Payroll not found');
  }
});

// Endpoint to get track information
app.get('/track-information', (req, res) => {
  res.json(trackInformation);
});

// Endpoint to update track information
app.put('/track-information', (req, res) => {
  trackInformation = { ...trackInformation, ...req.body }; // Update the information
  res.json(trackInformation);
});

// Endpoint to get all requests (sample)
app.get('/requests', (req, res) => {
  const requests = [
    { id: 1, title: 'Request 1', status: 'Pending' },
    { id: 2, title: 'Request 2', status: 'Approved' },
    // Add more sample requests here if needed
  ];
  res.json(requests);
});

// Endpoint to submit a new request
app.post('/requests', (req, res) => {
  const newRequest = req.body;
  newRequest.id = Math.floor(Math.random() * 1000); // Random ID for the new request
  res.status(201).json(newRequest);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
});
