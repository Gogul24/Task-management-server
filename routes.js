const express = require('express')
const router =  express.Router();
const taskController = require('../server/Controller');

router.post('/newtask/:userId',taskController.createTask);
router.get('/tasks/:userId',taskController.getAllTasks); //getall
router.put('/task/:id',taskController.updateTask); //update
router.delete('/task/:id',taskController.deleteTask);
router.post('/signup',taskController.createUser);
router.post('/login',taskController.signIn)

module.exports = router;