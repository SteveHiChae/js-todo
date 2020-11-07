//Selectors
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date')
todoDate.value = new Date().toISOString().slice(0, 10)
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listers
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    //console.log(todoDate.value);

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value
    newTodo.contentEditable = 'true'

    const newDate = document.createElement('li');
    newDate.innerText = todoDate.value;
    newDate.contentEditable = 'true'
    //newTodo.setAttribute('contentediable', 'true') unnecessary
    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(newDate);
    
    //ADD TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value+ ' ' + todoDate.value);
    
    //Check Mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    
    //Check trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    //Append to list
    todoList.appendChild(todoDiv);
    
    //CLEAR Todo Input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === 'todo-item') {
        item.contentEditable = 'true'
    
        //newTodo.innerText = todoInput.value + ' ' + todoDate.value;
        //Animation
        //todo.classList.add("fall");
        //removeLocalTodos(todo); 
        //ADD TODO TO LOCALSTORAGE
        //saveLocalTodos(todoInput.value+ ' ' + todoDate.value);
        console.log(item)
        // when catch enter or ????
        //saveLocalTodos(item)
    }
    
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add("fall");
    
        removeLocalTodos(todo); 
        todo.addEventListener('transitionend', e => {
            todo.remove();
        })
    }

    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}  

function filterTodo(e) {
    const todos = todoList.childNodes;
    //console.log(todos);
    todos.forEach(function(todo){
        if (todo.classList === undefined) {
            return;
        }
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {

    //CHECK--HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    let todoItem = localStorage.getItem('todos')

    if ( todoItem === null) {
        todos = [];
    } else {
        todos = JSON.parse(todoItem)
    }

    todos.forEach(todo => {

        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Check Mark Button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //Check trash Button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Append to list
        todoList.appendChild(todoDiv);
    });
} 

function removeLocalTodos(todo) {
    //CHECK--Hey Do I already have things in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText; // What is this?
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    // console.log(todo.children[0].innerText);
    // console.log(todos.indexOf("apple"));
}

// const todos = ['apple', 'john', 'donut', 'babybody'];

// // console.log(todos.indexOf("john"));
// const johnIndex = todos.indexOf("john");

// todos.splice(johnIndex, 1);
// console.log(todos);

