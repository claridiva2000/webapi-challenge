const express = require('express');

//import db
const Actions = require('../data/helpers/actionModel.js');
const Projects = require('../data/helpers/projectModel.js');

//router
const router = express.Router();

router.use((req, res, next) => {
  console.log('Actions Router Working');
  next();
});
// router.use(express.json())

//get all actions
router.get('/', async (req, res) => {
  try {
    const allactions = await Actions.get();
    res.status(200).json({ message: allactions });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving actions'
    });
  }
});

//add actions
router.post('/', async (req, res) => {
  try {
    const postaction = await Actions.insert(req.body);
    res.status(201).json({message:postaction});
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error adding Project'
    });
  }
});

//update actions
router.put('/:id', async (req, res) => {
  try {
    const updateaction = await Actions.update(req.params.id, req.body);
    if (updateaction) {
      res.status(200).json({message: updateaction});
    } else {
      res.status(404).json({ message: 'The action could not be found' });
    }
  } catch (err) {
    console.log(err).json({
      message: 'Error updating action'
    });
  }
});

//delete action
router.delete('/:id', async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'Action is delete' });
    } else {
      res.status(400).json({ message: 'The action could not be found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error removing Action'
    });
  }
});

module.exports = router;
