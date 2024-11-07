document.addEventListener("deleteTask", function (event) {
  const taskContainer = document.querySelector(".taskContainer");
  const zeroTask = document.querySelector(".zeroTask");
  const openTools = event.detail;
  const taskId = openTools.getAttribute("data-task-id");

  const deleteContainer = createDeleteContainer();
  document.body.appendChild(deleteContainer);

  setupDeleteButtons(deleteContainer, openTools, taskContainer, zeroTask, taskId);
});

function createDeleteContainer() {
  const deleteContainer = document.createElement("div");
  deleteContainer.classList.add("deleteContainer");
  deleteContainer.innerHTML = `
      <div class="deleteIcon fadeInScale">
          <hr class="hr" />
          <p>Delete the task?</p>
          <div class="deleteButtons">
            <button class="noButton"><p>No</p></button>
            <button class="yesButton"><p>Yes</p></button>
          </div>
      </div>
  `;
  return deleteContainer;
}

function setupDeleteButtons(deleteContainer, openTools, taskContainer, zeroTask, taskId) {
  const deleteIcon = deleteContainer.querySelector(".deleteIcon");

  deleteContainer.querySelector(".yesButton").addEventListener("click", function () {
    confirmDeleteTask(deleteIcon, deleteContainer, openTools, taskContainer, zeroTask, taskId);
  });

  deleteContainer.querySelector(".noButton").addEventListener("click", function () {
    cancelDeleteTask(deleteIcon, deleteContainer);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      cancelDeleteTask(deleteIcon, deleteContainer);
    }
  });
}

function confirmDeleteTask(deleteIcon, deleteContainer, openTools, taskContainer, zeroTask, taskId) {
  deleteIcon.classList.add("fadeOutScale");
  
  deleteIcon.addEventListener("animationend", function () {
    document.body.removeChild(deleteContainer);
    openTools.classList.add("fadeOutScale");
  }, { once: true });

  openTools.addEventListener("animationend", function () {
    taskContainer.removeChild(openTools);
    deleteTaskFromStorage(taskId);
    if (taskContainer.querySelectorAll(".openTools").length === 0) {
      zeroTask.style.display = "block";
      zeroTask.classList.add("fadeInScale");
    }
  }, { once: true });
}

function cancelDeleteTask(deleteIcon, deleteContainer) {
  deleteIcon.classList.add("fadeOutScale");
  deleteIcon.addEventListener("animationend", function () {
    document.body.removeChild(deleteContainer);
  }, { once: true });
}

function deleteTaskFromStorage(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
