
const form = document.getElementById('form');
const taskInput = document.getElementById('task-input');
const tasksDisplay = document.getElementById('tasks-display');
const today = new Date();

let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0');
let yy = String(today.getFullYear());

let timePosted = mm + "/" + dd + "/" + yy;


const tasklist = [];

form.addEventListener('submit', (e) => {

    e.preventDefault();
    const userinputTask = taskInput.value;
    const newDiv = document.createElement('div');
    newDiv.textContent = userinputTask;
    newDiv.id = 'task';
    newDiv.draggable = "true"

    newDiv.innerHTML =
        `
<p id="date-posted">${timePosted}</p>
<p id="task-name">${userinputTask}</p>
<input id="check" name="isChecked" type="checkbox">
<button id="edit-button">Edit task</button>
`

    tasklist.push(newDiv);

    tasklist.forEach((x) => {
        tasksDisplay.prepend(x);
    });

    const editButton = document.getElementById('edit-button');
    const taskName = document.getElementById('task-name');
    editButton.addEventListener('click', () => {
        taskName.contentEditable = "true";
        taskName.focus();
        editButton.disabled = "true";
    });

    //dragable 
    const deleteCon = document.getElementById('delete-container');

    newDiv.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.effectAllowed = "move";
    })

    deleteCon.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    
    deleteCon.addEventListener('drop', (e) => {
        e.preventDefault
        const draggedId = e.dataTransfer.getData('text/plain');
        let removeId = document.getElementById(draggedId);
        removeId.remove();

     
    });



});







