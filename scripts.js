const loadStorage = JSON.parse(localStorage.getItem("taskLocal")) || "empty";



const form = document.getElementById('form');
const taskInput = document.getElementById('task-input');
const tasksDisplay = document.getElementById('tasks-display');
const deleteCon = document.getElementById('delete-container');
const datePosted = document.getElementById('date-posted');
const check = document.getElementById('check');
const filter = document.getElementById('filter');
const tagSelect = document.getElementById('tagSelect');


const today = new Date();

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yy = String(today.getFullYear());

let timePosted = mm + "/" + dd + "/" + yy;

function makeRandId() {
    const randNum = Math.floor(Math.random() * 100) + 1;
    return randNum;
}

  deleteCon.addEventListener('drop', (e) => {
        e.preventDefault
        const draggedId = e.dataTransfer.getData('text/plain');
        let removeId = document.getElementById(draggedId);
        removeId.remove(); 
        localStorage.setItem('taskLocal', JSON.stringify(tasklist));
        
    });


tasklist = [];

//creating task obejcts 
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskObject = {
        id: makeRandId(),
        date: timePosted,
        name: taskInput.value,
        tag: tagSelect.value
    };

    tasklist.push(taskObject);
    localStorage.setItem('taskLocal', JSON.stringify(tasklist));

    renderTask(taskObject);
});


function renderTask(task) {
    let newTask = document.createElement('div');

    newTask.id = task.id;
    newTask.classList.add('task');
    newTask.draggable = "true;"
    newTask.innerHTML =
        `
    <p id="date-posted">${task.date}</p>
    <p class="task-tag">Tag: ${task.tag}</p>
    <p class="task-name">${task.name}</p>
    <input class="check" type="checkbox">
    <button class="edit-button">Edit task</button>
    `
    tasksDisplay.appendChild(newTask);

    newTask.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.dataTransfer.effectAllowed = "move";
    });
};


if (loadStorage !== "empty") {
    loadStorage.forEach(task => {
        renderTask(task);
    })
}


tasksDisplay.addEventListener('click', (e) => {
    if (e.target.classList.contains("edit-button")) {
        const parent = e.target.closest(".task");
        const taskName = parent.querySelector(".task-name");
        taskName.contentEditable = "true";
        taskName.focus();
    }

    deleteCon.addEventListener('dragover', (e) => {
        e.preventDefault();
    });
});

function clearTasks() {
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener("click", () => {
        tasksDisplay.innerHTML = "";
        localStorage.clear();
    })
};

clearTasks();






