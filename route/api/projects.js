const express = require('express');
const router = express.Router();

const Project = require('../../models/Project');

// @route  GET api/projects
// @desc   Get All Projects
router.get('/', (req, res) => {
  Project.find().then(projects => res.json(projects));
});

// @route  GET api/projects/:id
// @desc   Get Project By Id
router.get('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(404).send('Project not found.'));
});

// @route  POST api/projects
// @desc   Create A Project
router.post('/', (req, res) => {
  const newProject = new Project({
    address: req.body.address,
    estimateIncome: req.body.estimateIncome,
    estimateExpense: req.body.estimateExpense
  });
  newProject
    .save()
    .then(contact => res.json(contact))
    .catch(err => res.status(400).send(err.message));
});

// @route  PUT api/projects/:id
// @desc   Update A Project
router.put('/:id', (req, res) => {
  Project.updateOne({ _id: req.params.id }, req.body, err => {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.send();
    }
  });
});

// @route  DELETE api/projects/:id
// @desc   Delete A Project
router.delete('/:id', (req, res) => {
  Project.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.status(404).send('Project not found.');
    } else {
      res.send('Project successfully deleted.');
    }
  });
});

// @route  POST api/projects/:id/worknotes
// @desc   Delete A Project Work Note

router.post('/:id/worknotes', (req, res) => {
  Project.findById(req.params.id)
    .then(project => {
      project.workNotes.push(req.body);
      project
        .save()
        .then(project => res.json(project))
        .catch(err => res.status(400).send(err.message));
    })
    .catch(err => res.status(404).send('Project not found.'));
});

module.exports = router;
