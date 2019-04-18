const express = require('express');
const router = express.Router();

const Employee = require('../../models/Employee');

// @route  GET api/employees
// @desc   Get All Employees
router.get('/', (req, res) => {
	Employee.find()
		.sort({ firstName: 1 })
		.then(employees => res.json(employees));
});

// @route  GET api/employees/:id
// @desc   Get A Employee
router.get('/:id', (req, res) => {
	Employee.findById({ _id: req.params.id }).then(employee => res.json(employee));
});

// @route  POST api/employees
// @desc   Create A Employee
router.post('/', (req, res) => {
	const newEmployee = new Employee({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		title: req.body.title
	});
	newEmployee.save().then(employee => res.json(employee));
});

// @route  PUT api/employees/:id
// @desc   Update A Employee
router.put('/:id', (req, res) => {
	Employee.update({ _id: req.params.id }, req.body)
		.then(employee => {
			res.send(employee);
		})
		.catch(err => res.status(404).send('Employee not found.'));
});

// @route  DELETE api/employees/:id
// @desc   Delete A Employee
router.delete('/:id', (req, res) => {
	Employee.findById(req.params.id)
		.then(employee => employee.remove().then(() => res.send('Employee is successfully deleted.')))
		.catch(err => res.status(404).send('Employee not found.'));
});

module.exports = router;
