const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos');
const aiController = require('../controllers/ai');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, todosController.getTodos);

router.post('/createTodo', todosController.createTodo);

router.post('/generateText', aiController.sendAiReq);

router.put('/markComplete', todosController.markComplete);

router.put('/markIncomplete', todosController.markIncomplete);

router.delete('/deleteTodo', todosController.deleteTodo);

module.exports = router;
