const http = require("http");
const employeeModule = require('./employee');
 // Import the employee module

const port = process.env.PORT || 8081;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json'); // Default response is JSON

    if (req.method !== 'GET') {
        res.statusCode = 405; // Method Not Allowed
        res.end(JSON.stringify({ error: "Method Not Allowed" }));
    } else {
        if (req.url === '/') {
            res.setHeader('Content-Type', 'text/html'); // HTML response
            res.end('<h1>Welcome to Lab Exercise 03</h1>');
        } else if (req.url === '/employee') {
            const employees = employeeModule.getAllEmployees();
            res.end(JSON.stringify(employees));  // Send employee details as JSON
        } else if (req.url === '/employee/names') {
            const employeeNames = employeeModule.getEmployeeNames();
            res.end(JSON.stringify(employeeNames));  // Send sorted names as JSON
        } else if (req.url === '/employee/totalsalary') {
            const totalSalary = employeeModule.getTotalSalary();
            res.end(JSON.stringify({ total_salary: totalSalary }));  // Send total salary as JSON
        } else {
            res.statusCode = 404; // Not Found
            res.end(JSON.stringify({ error: "Not Found" }));
        }
    }
});

// Start the server
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
