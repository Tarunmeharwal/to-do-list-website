 // Function to save tasks to local storage
 function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


// Function to retrieve tasks from local storage
function getTasks() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}


// Function to render tasks on the page
function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
              <span>${task.text}</span>
              <span>Priority: ${task.priority}</span>
              <span>Status: ${
                task.completed ? "Completed" : "Pending"
              }</span>
              <button class="complete-btn" onclick="toggleTaskStatus(${index})">${
      task.completed ? "Undo" : "Complete"
    }</button>
              <button class="edit-btn" onclick="editTask(${index})">Edit</button>
              <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
          `;
    taskList.appendChild(li);
  });
}

let tasks = getTasks();
renderTasks();


// Function to add a new task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const taskText = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (taskText !== "") {
    tasks.push({ text: taskText, priority: priority, completed: false });
    saveTasks(tasks);
    renderTasks();
    taskInput.value = "";
  }
}


// Function to edit a task
function editTask(index) {
  const newTaskText = prompt("Edit your task ", tasks[index].text);
  if (newTaskText !== null) {
    tasks[index].text = newTaskText.trim();
    saveTasks(tasks);
    renderTasks();
  }
}


// Function to delete a task
function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
  }
}


// Function to toggle task status
function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks(tasks);
  renderTasks();
}