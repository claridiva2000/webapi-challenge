const express = require('express');

//import db
const Actions = require('./actionModel');
//router
const router = express.Router();

router.use((req, res, next) => {
  console.log('Actions Router Working');
  next();
});

//get actions
router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get(req.query);
    res.status(200).json(actions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving actions'
    });
  }
});

//add actions
router.post('/:id/actions', async (req, res) => {
  const actionInfo = { ...req.body, project_id: req.params.id };
  try {
    const action = await Actions.insert(actionInfo);
    res.status(210).json(action);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Error getting the actions for the Project'
    });
  }
});

//update actions
router.put('/:id', async (req, res) => {
  try {
    const action = await Actions.update(req.params.id, req.body);
    if (action) {
      res.status(200).json(action);
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
