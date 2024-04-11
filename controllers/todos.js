const Todo = require('../models/Todo');

module.exports = {
  getTodos: async (req, res) => {
    // console.log(req.user);
    try {
      const todoItems = await Todo.find({ userId: req.user.id });
      //creates variable for the items in the todo matching the userId
      const itemsLeft = await Todo.countDocuments({ userId: req.user.id, completed: false });
      //counts the items in the db and assigns the number to a variable
      res.render('todos.ejs', { todos: todoItems, left: itemsLeft, user: req.user });
      //renders out the todoItems variable (containing the items) as well as the amount of items left to do (contained in the itemsLeft variable)
      // sendAiReq();
    } catch (err) {
      console.log(err);
      //catches any errors
    }
  },
  createTodo: async (req, res) => {
    try {
      await Todo.create({ todo: req.body.todoItem, completed: false, userId: req.user.id });
      //creates an item in the db with containing the item (pulled from the body), the completed property (boolean) and the userId attached
      console.log('Todo has been added!');
      //console logs it
      res.redirect('/todos?aiRequest=true');
      //redirects to /todos, which makes a get request to pull the new todo, and reloads
    } catch (err) {
      console.log(err);
      //console logs any errors
    }
  },
  markComplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        //todoIdFromJSFile comes from the client side js file, which defines it using parentNode.dataset.id
        {
          completed: true,
          //changes completed property to true
        }
      );
      //async function to find the item in the db with the matching id and change the completed property to true
      console.log('Marked Complete');
      //console logs completion
      res.json('Marked Complete');
      //responds with 'Marked Complete'
    } catch (err) {
      console.log(err);
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          completed: false,
        }
      );
      //finds document with matching id and changes completed property to false
      console.log('Marked Incomplete');
      //console logs it
      res.json('Marked Incomplete');
      //responds to the fetch request
    } catch (err) {
      console.log(err);
    }
  },
  deleteTodo: async (req, res) => {
    console.log(req.body.todoIdFromJSFile);
    //immediatley console logs the todoId
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile });
      //tries to find the document with the matching id, provided by the req body
      console.log('Deleted Todo');
      //console logs it
      res.json('Deleted It');
      //responds to client side js
    } catch (err) {
      console.log(err);
    }
  },
};
