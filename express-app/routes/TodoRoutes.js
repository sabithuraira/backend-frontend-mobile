const express = require('express')
const todo = require('../controllers/TodoController.js');

const router = express.Router();

router.get('/todo', todo.todos);
router.get('/todo/:id', todo.findById);
router.post('/todo', todo.store);
router.patch('/todo/:id', todo.update);
router.delete('/todo/:id', todo.delete);

module.exports = router;