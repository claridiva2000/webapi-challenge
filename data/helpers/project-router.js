const express = require('express');

const Projects = require('./projectModel');
const Actions = require('./actionModel');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Project Router Working!');
  next();
});

//get projects
router.get('/', async (req, res) => {
  try {
    const projects = await Projects.get(req.body);
    res.status(200).json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving Projects'
    });
  }
});

//add new project
router.post('/', async (req, res) => {
  try {
    const project = await Projects.insert(req.body);
    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Project'
    });
  }
});

//update project
router.put('/:id', async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'Project could not be found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error updating Project'
    });
  }
});

//remove project
router.delete('/:id', async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The Project has been removed' });
    } else {
      res.status(404).json({
        message: 'Project could not be found'
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error removing Project'
    });
  }
});

//get project actions
router.get('/:id/actions', async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error getting the actions for the project'
    });
  }
});

module.exports = router;
