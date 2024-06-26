const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

Array.from(deleteBtn).forEach((el) => {
  //creates an array from all the elements with the class of del
  el.addEventListener('click', deleteTodo);
  //if clicked, it will run the client side async function 'deleteTodo'
});

Array.from(todoItem).forEach((el) => {
  //creates an array containing each todoItem
  el.addEventListener('click', markComplete);
  //forEach puts an event listener on them, listening for a click and firing the markComplete function below
});

Array.from(todoComplete).forEach((el) => {
  //creates an array from the new todoComplete variable created from all the elements with the newly assigned property of 'completed'
  el.addEventListener('click', markIncomplete);
  //adds event listener for a click and runs the markIncomplete client side async function
});

//AI FETCH FUNCTION
if (new URLSearchParams(window.location.search).has('aiRequest')) {
  sendAiReq();
}

async function sendAiReq() {
  try {
    const response = await fetch('todos/generateText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // If your request doesn't need a body, you can omit this part
      // body: JSON.stringify({ key: 'value' }), // Example body
    });

    const data = await response.json(); // Parsing the JSON response body
    console.log(data.response); // Accessing the 'response' field
    let formattedResponse = data.response.replace(/\n/g, '<br>');

    // Use innerHTML to interpret the <br> as HTML line breaks
    document.getElementById('output').innerHTML = formattedResponse; // Properly setting the text content
  } catch (error) {
    console.error('Error:', error);
  }
}

async function deleteTodo() {
  const todoId = this.parentNode.dataset.id;
  //creates variable containing the id from the parentNode
  try {
    const response = await fetch('todos/deleteTodo', {
      //tries to make a fetch request to the delete router with the method of 'deleteTodo'
      method: 'delete',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    //creates variable for response
    console.log(data);
    //console logs the new variable
    location.reload();
    //reloads the page, making a get request and displaying new items
  } catch (err) {
    console.log(err);
  }
}

async function markComplete() {
  const todoId = this.parentNode.dataset.id;
  //variable for todoId, pulling it from the parent node which contains its ID
  try {
    const response = await fetch('todos/markComplete', {
      //makes a fetch request to the todos router which runs the markComplete method
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    //awaits the data back from the fetch request
    console.log(data);
    //consoles logs the data
    location.reload();
    //reloads the page
  } catch (err) {
    console.log(err);
  }
}

async function markIncomplete() {
  const todoId = this.parentNode.dataset.id;
  //the function creates a variable containing the id from the parentNode dataId
  //the dataId value is from the database and assigned in using the template literal
  try {
    const response = await fetch('todos/markIncomplete', {
      //fetch request to the todos router firing the markIncomplete method
      method: 'put',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        todoIdFromJSFile: todoId,
      }),
    });
    const data = await response.json();
    // variable is created from response
    console.log(data);
    //variable is console logged
    location.reload();
    //reload
  } catch (err) {
    console.log(err);
  }
}
