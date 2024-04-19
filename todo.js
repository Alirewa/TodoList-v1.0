let todos = [];
let filterValue = "all";
// selecting:
const todoInput = document.querySelector(".todo-input");
const todoForm = document.querySelector(".todo-form");
const todoList = document.querySelector(".todolist");
const selectFilters = document.querySelector(".filter-todos");

// events:
todoForm.addEventListener("submit", addNewTodo);
selectFilters.addEventListener("change" , (e) => {
     filterValue = e.target.value;
     filterTodos();
});

document.addEventListener("DOMContentLoaded" ,(e) => {
     const Todos = getAllTodos();
     createTodos(Todos);
} );

function addNewTodo(e) {
     e.preventDefault(); // jelogiri az refresh shodoan safhe

if (!todoInput.value) return null; // karbar hichi vared nakone code haye paeen ejra nemishe

const newTodo = {
     id: Date.now(),
     createdAt: new Date().toISOString(),
     title: todoInput.value,
     isCompleted: false,
};
// todos.push(newTodo);
saveTodo(newTodo);
filterTodos();
};
function createTodos(todos) {
// create todos on DOM
let result = "";
todos.forEach((todo) => {
     result+= `<li class="todo">
     <p class="todo__title ${todo.isCompleted && "completed"}">${todo.title}</p>
     <span class="todo__createdAt">${new Date(todo.createdAt).toLocaleDateString("fa-ir")}</span>
     <button class="todo__check" data-todo-id=${todo.id}><i class="far fa-check-square"></i></button>
     <button class="todo__remove" data-todo-id=${todo.id}><i class="far fa-trash-alt"></i></button>
   </li>`
});
todoList.innerHTML = result;
todoInput.value = "";
const removeBtn = [... document.querySelectorAll(".todo__remove")];
removeBtn.forEach((btn) => btn.addEventListener("click" , removeTodo));
const checkBtn = [... document.querySelectorAll(".todo__check")];
checkBtn.forEach((btn) => btn.addEventListener("click" , checkTodo));
};


function filterTodos() {
     // const filter = e.target.value
     const todos = getAllTodos();
     switch(filterValue) {
          case "all": {
               createTodos(todos);
               break;
          };
          case "completed": {
               const filteredTodos = todos.filter((t) => t.isCompleted);
               createTodos(filteredTodos);
               break;
          };
          case "uncompleted": {
               const filteredTodos = todos.filter((t) => !t.isCompleted);
               createTodos(filteredTodos);
               break;
          };
          default:
               createTodos(todos);
     };
};
function removeTodo(e) {
let todos = getAllTodos();
const todoId = Number(e.target.dataset.todoId);
todos = todos.filter((t) => t.id !== todoId);
saveAllTodos(todos);
filterTodos();
};
function checkTodo(e) {
     let todos = getAllTodos();
     const todoId = Number(e.target.dataset.todoId);
     const todo = todos.find((t) => t.id === todoId);
     todo.isCompleted = !todo.isCompleted;
     saveAllTodos(todos);
     filterTodos();
};

// local storage:
function getAllTodos() {
const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
return savedTodos;
};

function saveTodo (todo) {
     // const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
     const savedTodos = getAllTodos();
     savedTodos.push(todo);
     localStorage.setItem("todos" , JSON.stringify(savedTodos));
     return savedTodos;
};
function saveAllTodos (todos) {
     localStorage.setItem("todos" , JSON.stringify(todos));
};