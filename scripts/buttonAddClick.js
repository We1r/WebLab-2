document.addEventListener("DOMContentLoaded", function () {
  const taskContainer = document.querySelector(".taskContainer");
  const zeroTask = document.querySelector(".zeroTask");
  const titleInput = document.querySelector(".inputs input[placeholder='Title...']");
  const bodyInput = document.querySelector(".inputs input[placeholder='About...']");

  zeroTask.style.display = "block";
  loadTasks(taskContainer, zeroTask);

  document.getElementById("addButton").addEventListener("click", function () {
    handleAddButtonClick(taskContainer, zeroTask, titleInput, bodyInput);
  });
});

function loadTasks(taskContainer, zeroTask) {
  const tasks = getTasksFromLocalStorage();
  tasks.forEach((task) => {
    addTaskToDOM(taskContainer, zeroTask, task.title, task.body, task.id);
  });
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasksToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(taskContainer, zeroTask, title, body, taskId) {
  zeroTask.style.display = "none";

  const openTools = createTaskElement(title, body, taskId);
  taskContainer.appendChild(openTools);
}

function createTaskElement(title, body, taskId) {
  const openTools = document.createElement("div");
  openTools.classList.add("openTools");
  openTools.setAttribute("data-task-id", taskId);

  const newTask = document.createElement("div");
  newTask.classList.add("task", "fadeInScale");
  newTask.innerHTML = `
    <div class="textArea">
      <h1>${title}</h1>
      <h2>${body}</h2>
    </div>
    <button class="dellButton">
      <img src="./images/svg/Cross.svg" alt="cross">
    </button>
  `;

  openTools.appendChild(newTask);
  newTask.style.display = "flex";

  setupTaskEventListeners(newTask, openTools);
  return openTools;
}

function setupTaskEventListeners(taskElement, taskContainerElement) {
  taskElement.querySelector(".dellButton").addEventListener("click", function () {
    dispatchDeleteTaskEvent(taskContainerElement);
  });

  taskElement.addEventListener("click", function (event) {
    if (!event.target.closest(".dellButton")) {
      dispatchOpenTaskEvent(taskContainerElement);
    }
  });
}

function dispatchDeleteTaskEvent(taskElement) {
  const deleteTaskEvent = new CustomEvent("deleteTask", {
    detail: taskElement,
  });
  document.dispatchEvent(deleteTaskEvent);
}

function dispatchOpenTaskEvent(taskElement) {
  const openTaskEvent = new CustomEvent("openTask", { detail: taskElement });
  document.dispatchEvent(openTaskEvent);
}

function handleAddButtonClick(taskContainer, zeroTask, titleInput, bodyInput) {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (!title.trim()) {
    alert("Give a name to your task!");
    return;
  }

  zeroTask.style.display = "none";

  const taskId = "task_" + Date.now();
  const newTask = { id: taskId, title: title, body: body };

  const tasks = getTasksFromLocalStorage();
  tasks.push(newTask);
  saveTasksToLocalStorage(tasks);

  addTaskToDOM(taskContainer, zeroTask, title, body, taskId);

  titleInput.value = "";
  bodyInput.value = "";
}
