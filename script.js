let tasks = [];
let filter = 'all';

function addtask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        input.value = "";
        renderTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit task:", tasks[index].text);
    if (newText != null) {
        tasks[index].text = newText.trim();
        renderTasks();
    }
}

function filterTasks(type) {
    filter = type;
    renderTasks();
}

function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return filter === 'completed' ? task.completed : !task.completed;
    });

    filteredTasks.forEach((task, i) => {
        const li = document.createElement("li");

        const taskSection = document.createElement("div");
        taskSection.className = "task-text";

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTask(tasks.indexOf(task));

        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) span.style.textDecoration = "line-through";

        taskSection.appendChild(checkbox);
        taskSection.appendChild(span);

        const actions = document.createElement("div");
        actions.className = "actions";

        const editButton = document.createElement("button");
        editButton.innerHTML = "✏️";
        editButton.onclick = () => editTask(tasks.indexOf(task));

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "🗑️";
        deleteButton.onclick = () => deleteTask(tasks.indexOf(task));

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        li.appendChild(taskSection);
        li.appendChild(actions);
        list.appendChild(li);
    });

    document.getElementById("total").textContent = tasks.length;
    document.getElementById("completed").textContent = tasks.filter(t => t.completed).length;
    document.getElementById("pending").textContent = tasks.filter(t => !t.completed).length;
}

renderTasks();
