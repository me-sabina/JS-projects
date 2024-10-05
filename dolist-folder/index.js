const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

todoForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    addTodo();
});

function addTodo() {
    const todoText = todoInput.value;

    if (todoText === '') return; // Prevent adding empty tasks

    const todoItem = document.createElement('li');
    todoItem.innerText = todoText;

    // Add Complete Button
    const completeBtn = document.createElement('button');
    completeBtn.innerText = 'Complete';
    completeBtn.addEventListener('click', () => {
        todoItem.classList.toggle('completed'); // Mark task as completed
    });

    // Add Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.addEventListener('click', () => {
        todoItem.remove(); // Remove the task
    });

    // Append buttons to todo item
    todoItem.appendChild(completeBtn);
    todoItem.appendChild(deleteBtn);

    // Append todo item to the list
    todoList.appendChild(todoItem);

    // Clear the input field
    todoInput.value = '';
}
