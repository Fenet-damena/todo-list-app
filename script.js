let task = [];
let filter = 'all';

function addtask() {
    const input = document.getElementById('task-input');
    const taskText = input.ariaValueMax.trim();
    if (taskText) {
        task.push({text: taskText, completed: false});
        input.value = ""
        renderTasks();

    }
}



function deleteTask(index) {
    task.splice(index, 1);
    renderTasks();
}