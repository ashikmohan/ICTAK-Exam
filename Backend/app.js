const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db=require("./db/index")

const Task= require('./model/schema')

app.get('/api/tasks', (req, res) => {
    Task.find({})
      .then(tasks => {
        res.json(tasks);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while fetching tasks.' });
      });
  });
  
  app.post('/api/tasks', async (req, res) => {
    const newTask = new Task(req.body);
    try {
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (err) {
      console.error('Error saving task:', err);
      res.status(500).send('Error saving task');
    }
  });
  

  app.put('/api/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
  
    try {
      await Task.findByIdAndUpdate(taskId, updatedTask);
      res.json({ message: 'Task updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });
  

app.delete('/api/tasks/:id', async (req, res) => {
    const taskId = req.params.id;
    
    try {
      const deletedTask = await Task.findByIdAndRemove(taskId);
      if (deletedTask) {
        res.json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting task');
    }
  });
  

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
