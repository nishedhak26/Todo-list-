let tasks = [];

function addTask() {
  const taskText = document.getElementById("taskInput").value.trim();
  const taskDesc = document.getElementById("descriptionInput").value.trim();
  const dueDate = document.getElementById("dateInput").value;

  if (!taskText) return alert("Please enter a task title.");

  tasks.push({
    text: taskText,
    description: taskDesc,
    date: dueDate,
    completed: false
  });

  clearInputs();
  renderTasks();
}

function clearInputs() {
  document.getElementById("taskInput").value = "";
  document.getElementById("descriptionInput").value = "";
  document.getElementById("dateInput").value = "";
}

function renderTasks() {
  const list = document.getElementById("taskList");
  const hideCompleted = document.getElementById("hideCompleted").checked;
  const emptyMsg = document.getElementById("emptyMessage");

  list.innerHTML = "";

  const now = new Date().toISOString().split("T")[0];

  const visibleTasks = tasks.filter(t => !(hideCompleted && t.completed));

  if (visibleTasks.length === 0) {
    emptyMsg.style.display = "block";
    return;
  } else {
    emptyMsg.style.display = "none";
  }

  visibleTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    if (task.date && task.date < now && !task.completed) {
      li.classList.add("overdue");
    }

    const taskHTML = `
      <div class="task-text">
        <label>
          <input type="checkbox" onchange="toggleComplete(${index})" ${task.completed ? "checked" : ""}>
          ${task.text}
        </label>
        <button class="edit" onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
      ${task.description ? `<div class="task-desc">${task.description}</div>` : ""}
      ${task.date ? `<div class="task-date">Due: ${task.date}</div>` : ""}
    `;

    li.innerHTML = taskHTML;
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function editTask(index) {
  const newText = prompt("Edit task title:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim() || tasks[index].text;
  }

  const newDesc = prompt("Edit description:", tasks[index].description);
  if (newDesc !== null) {
    tasks[index].description = newDesc.trim();
  }

  const newDate = prompt("Edit due date (YYYY-MM-DD):", tasks[index].date);
  if (newDate !== null && /^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
    tasks[index].date = newDate;
  }

  renderTasks();
}
