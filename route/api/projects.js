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
    .then(project => {
      const statistics = {
        totalDuration: totalExpense('duration', project),
        totalLabourExpense: totalLabourExpense(project),
        totalMaterialExpense: totalExpense('materialExpense', project),
        totalPetrolExpense: totalExpense('petrolExpense', project),
        totalOtherExpense: totalExpense('otherExpense', project)
      };
      statistics.totalExpense =
        statistics.totalLabourExpense +
        statistics.totalMaterialExpense +
        statistics.totalPetrolExpense +
        statistics.totalOtherExpense;
      const object = project.toObject();
      res.json({ ...object, statistics: statistics });
    })
    .catch(err => res.send(err.message));
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
      res.send('Project is successfully deleted.');
    }
  });
});

// @route  GET api/projects/:projectId/worknotes/
// @desc   Get All Project Work Notes
router.get('/:projectId/worknotes', (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      const workNotes = project.workNotes.map(workNote => {
        let sum = 0;
        workNote.labourExpense.forEach(element => {
          sum = sum + element.expense;
        });
        let note = workNote.toObject();
        return { ...note, totalLabourExpense: sum };
      });
      res.json(workNotes);
    })
    .catch(err => res.status(404).send('Project not found.'));
});

// @route  GET api/projects/:projectId/worknotes/:workNoteId
// @desc   Get a Project Work Note By Id
router.get('/:projectId/worknotes/:workNoteId', (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      const workNote = project.workNotes.id(req.params.workNoteId);
      if (workNote) {
        let sum = 0;
        workNote.labourExpense.forEach(element => {
          sum += element.expense;
        });
        let note = workNote.toObject();
        res.json({ ...note, totalLabourExpense: sum });
      } else {
        res.status(404).send('Work note not found.');
      }
    })
    .catch(err => res.status(404).send('Project not found.'));
});

// @route  POST api/projects/:id/worknotes
// @desc   Create A Project Work Note

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

// @route  POST api/projects/:projectId/worknotes/:workNoteId
// @desc   Update A Project Work Note

router.put('/:projectId/worknotes/:workNoteId', (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      let workNote = project.workNotes.id(req.params.workNoteId);
      if (workNote) {
        workNote.set(req.body);
        project
          .save()
          .then(project => res.json(project.workNotes.id(req.params.workNoteId)))
          .catch(err => status(400).send(err.message));
      } else {
        res.status(404).send('Work note not found.');
      }
    })
    .catch(err => res.status(404).send('Project not found.'));
});

// @route  DELETE api/projects/:projectId/worknotes/:workNoteId
// @desc   Delete A Project Work Note

router.delete('/:projectId/worknotes/:workNoteId', (req, res) => {
  Project.findById(req.params.projectId)
    .then(project => {
      let workNote = project.workNotes.id(req.params.workNoteId);
      if (workNote) {
        workNote.remove();
        project
          .save()
          .then(project => res.json(project.workNotes))
          .catch(err => status(400).send(err.message));
      } else {
        res.status(404).send('Work note not found.');
      }
    })
    .catch(err => res.status(404).send('Project not found.'));
});

function totalExpense(type, project) {
  let sum = 0;
  project.workNotes.forEach(workNote => (sum += workNote[type]));
  return sum;
}

function totalLabourExpense(project) {
  let totalLabourExpense = 0;
  project.workNotes.forEach(workNote => {
    let sum = 0;
    workNote.labourExpense.forEach(labourExpense => {
      sum += labourExpense.expense;
    });
    totalLabourExpense += sum;
  });
  return totalLabourExpense;
}

module.exports = router;
