const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const checkBtn = document.querySelector(".check");
const allBtn = document.querySelector("#all");
const completedBtn = document.querySelector("#completed");
const incompleteBtn = document.querySelector("#incomplete");
let todos = [];

if(localStorage.getItem('todos') !== null){
    todos = JSON.parse(localStorage.getItem('todos'));
}
showTodo();

addBtn.addEventListener('click', (e)=> {
    e.preventDefault();

    saveTodo();
    showTodo();
    localStorage.setItem('todos', JSON.stringify(todos));
})
todoList.addEventListener('click', (e) => {
    const target = e.target;
    console.log(target);
    const parentElement = target.parentNode;

    const todo = parentElement;
    const todoId = Number(todo.id);

    if(target.className === 'check'){
        
        todos = todos.map((todo, index) => ({
            ...todo,
            checked: index === todoId ? !todo.checked : todo.checked,
        }));
        showTodo();
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    if(target.className === 'trash'){
        todos = todos.filter((todo, index) => index !== todoId);
        showTodo();
        localStorage.setItem('todos', JSON.stringify(todos));
    }
})
completedBtn.addEventListener('click', () => {
    completedTodos = [];
    completedTodos = todos.filter((todo) => todo.checked === true);

    todoList.innerHTML = '';
    completedTodos.forEach((todo, index) => {
        todoList.innerHTML +=
        `
        <li class="item" id=${index}>
            <button class="check"><i class="fa-solid fa-check"></i></button>
            <p class="${todo.checked ? 'done' : 'null'}">${todo.value}</p>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
        </li>
        `;
    })
})
incompleteBtn.addEventListener('click', () => {
    incompleteTodos = [];
    incompleteTodos = todos.filter((todo) => todo.checked === false);

    todoList.innerHTML = '';
    incompleteTodos.forEach((todo, index) => {
        todoList.innerHTML +=
        `
        <li class="item" id=${index}>
            <button class="check"><i class="fa-solid fa-check"></i></button>
            <p class="${todo.checked ? 'done' : 'null'}">${todo.value}</p>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
        </li>
        `;
    })
})
allBtn.addEventListener('click', () => {
    showTodo();
})

function saveTodo(){
    if(todoInput.value === ''){
        alert("Todo's input is empty");
    }else{
        const todoValue = todoInput.value;
        const todo = {
        value: todoValue,
        checked: false
        }
        todos.push(todo);
    }

    todoInput.value = "";
}
function showTodo(){
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        todoList.innerHTML += 
        `
        <li class="item" id=${index}>
            <button class="check"><i class="fa-solid fa-check"></i></button>
            <p class="${todo.checked ? 'done' : 'null'}">${todo.value}</p>
            <button class="trash"><i class="fa-solid fa-trash"></i></button>
        </li>
        `;
    });
}