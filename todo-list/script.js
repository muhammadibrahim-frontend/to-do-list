let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (let i = 0; i < tasks.length; i++) {
    renderTask(tasks[i].text, tasks[i].completed);
  }
}

function saveTasks() {
  let tasks = [];
  let listItems = document.querySelectorAll("li");
  for (let i = 0; i < listItems.length; i++) {
    let checkbox = listItems[i].querySelector('input[type="checkbox"]');
    let span = listItems[i].querySelector("span");
    tasks.push({ text: span.textContent, completed: checkbox.checked });
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTask(text, completed) {
  let li = document.createElement("li");
  if (completed) {
    li.classList.add("completed");
  }

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.onchange = function () {
    if (checkbox.checked) {
      span.style.textDecoration = "line-through";
      span.style.color = "gray";
    } else {
      span.style.textDecoration = "none";
      span.style.color = "black";
    }
    saveTasks();
  };

  let span = document.createElement("span");
  span.textContent = text;
  if (completed) {
    span.style.textDecoration = "line-through";
    span.style.color = "gray";
  }

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";
  deleteButton.onclick = function () {
    taskList.removeChild(li);
    saveTasks();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  renderTask(taskText, false);
  saveTasks();
  taskInput.value = "";
}

taskInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

loadTasks();
