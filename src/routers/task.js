const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch(e) {
    res.status(500).send();
  }
})

router.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    if (!task) {
      return res.status(404).send();
    }
    const task = await Task.findById(_id);
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
})


router.post('/task', async (req, res) => {
  const task = new Task(req.body);
  try {
  await task.save();
  res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdated = ['completed', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdated.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!'});
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch(e) {
    res.status(400).send();
  }
})

router.delete('/tasks/:id', async (req, res) => {
  try {
    
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);

  } catch(e) {
    res.status(500).send();
  }
})

module.exports = router