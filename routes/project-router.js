const express = require('express');

const Projects = require('../data/helpers/projectModel');
// const Actions = require('./actionModel');

const router = express.Router();

router.use((req, res, next) => {
  console.log('Project Router Working!');
  next();
});

//get projects
router.get('/', async (req, res) => {
  try {
    const allprojects = await Projects.get();
    res.status(200).json({message: allprojects});
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
    res.status(201).json({message:project});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Project'
    });
  }
});

//update project
router.put("/:id", async (req, res) => {
  try {
    const updateproject = await Projects.update(req.params.id, req.body);
    if (updateproject) {
      res.status(200).json({message: updateproject});
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
router.delete("/:id", async (req, res) => {
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
router.get("/:id/actions", async (req, res) => {
  const id = req.params.id;
  try {
    const projectactions = await Projects.getProjectActions(id);
    res.status(200).json({message: projectactions});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error getting the actions for the project'
    });
  }
});

module.exports = router;
