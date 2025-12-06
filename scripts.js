const loadStorage = JSON.parse(localStorage.getItem('taskLocal')) || 'empty';
console.log(loadStorage);



const form = document.getElementById('form');
const taskInput = document.getElementById('task-input');
const tasksDisplay = document.getElementById('tasks-display');
const deleteCon = document.getElementById('delete-container');
const datePosted = document.getElementById('date-posted');
const check = document.getElementById('check');


const today = new Date();

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yy = String(today.getFullYear());

let timePosted = mm + "/" + dd + "/" + yy;


//drop delete
deleteCon.addEventListener('dragover', (e) => {
    e.preventDefault();
});


deleteCon.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    let removeId = document.getElementById(draggedId);
    removeId.remove();
});


//set tasks
const tasklist = [];
const taskObject = {};

function displayLocal() {
if (loadStorage !== "empty") {
    loadStorage.forEach(e => {
        const randNum = Math.floor((Math.random() * 100) + 1);

        const taskEl = document.createElement('div');
        taskEl.classList.add("task");
        taskEl.id = `${randNum}`
        taskEl.draggable = "true";
        taskEl.innerHTML = `
    <p id="date-posted">${e.date}</p>
    <p id="task-name">${e.taskname}</p>
    <input id="check" name="isChecked" type="checkbox">
    <button id="edit-button">Edit task</button>
    `
        tasksDisplay.appendChild(taskEl);
    });
}};

displayLocal();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    taskObject.date = timePosted;

    const userinputTask = taskInput.value;
    taskObject.taskname = userinputTask;

    tasklist.push(taskObject);
        localStorage.setItem('taskLocal', JSON.stringify(tasklist));

    const randNum = Math.floor((Math.random() * 100) + 1);

    const taskEl = document.createElement('div');
    taskEl.classList.add("task");
    taskEl.id = `${randNum}`
    taskEl.draggable = "true";
    taskEl.innerHTML = `
    <p id="date-posted">${taskObject.date}</p>
    <p id="task-name">${taskObject.taskname}</p>
    <input id="check" name="isChecked" type="checkbox">
    <button id="edit-button">Edit task</button>
    `
    tasksDisplay.appendChild(taskEl);
   localStorage.setItem('taskLocal', JSON.stringify(tasklist));
    const newTask = taskEl;

    const editButton = document.getElementById('edit-button');
    const taskName = document.getElementById('task-name');

    //edit text
    editButton.addEventListener('click', () => {
        taskName.contentEditable = "true";
        taskName.focus();
    });

    //dragable 
    newTask.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = "move";
    })

});







