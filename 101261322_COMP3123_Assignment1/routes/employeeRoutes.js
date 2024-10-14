const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Employee = require('../models/Employee');

// Get all employees
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new employee with validation
router.post('/employees', [
    check('first_name', 'First name is required').not().isEmpty(),
    check('last_name', 'Last name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('salary', 'Salary must be a number').isNumeric(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, position, salary, department } = req.body;

    const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        position,
        salary,
        department,
    });

    try {
        const employee = await newEmployee.save();
        res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get employee by ID
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update employee by ID with validation
router.put('/employees/:eid', [
    check('email', 'Please include a valid email').optional().isEmail(),
    check('salary', 'Salary must be a number').optional().isNumeric(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.eid,
            { $set: req.body },
            { new: true }
        );
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee details updated successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete employee by ID
router.delete('/employees', async (req, res) => {
    const employeeId = req.query.eid;
    try {
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(204).json({ message: 'Employee deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
