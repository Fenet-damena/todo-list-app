let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let filter = 'all';

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addtask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({ text: taskText, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText != null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function filterTasks(type) {
  filter = type;
  setActiveFilter(type);
  renderTasks();
}

function setActiveFilter(activeType) {
  const buttons = document.querySelectorAll(".filters button");
  buttons.forEach(button => {
    button.classList.remove("active");
    if (button.textContent.toLowerCase() === activeType) {
      button.classList.add("active");
    }
  });
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  if (filteredTasks.length === 0) {
    const li = document.createElement("li");
    let message = "No tasks added.";
    if (filter === 'pending') message = "No pending tasks.";
    else if (filter === 'completed') message = "No completed tasks.";
    li.textContent = message;
    li.style.textAlign = "center";
    li.style.color = "gray";
    list.appendChild(li);
  } else {
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
  }

  document.getElementById("total").textContent = tasks.length;
  document.getElementById("completed").textContent = tasks.filter(t => t.completed).length;
  document.getElementById("pending").textContent = tasks.filter(t => !t.completed).length;
}

// initial load
setActiveFilter(filter);
renderTasks();
