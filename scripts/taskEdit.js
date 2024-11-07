document.addEventListener("editTask", function (event) {
  const taskData = event.detail;

  const editContainer = createEditContainer(taskData);
  document.body.appendChild(editContainer);

  const editIcon = document.querySelector(".editIcon");
  editIcon.classList.add("fadeInScale");

  editSaveButton(editContainer, editIcon);
  editCancelButton(editContainer, editIcon);
});

// Функция создания контейнера редактирования
function createEditContainer(taskData) {
  const editContainer = document.createElement("div");
  editContainer.classList.add("editContainer");

  editContainer.innerHTML = `
    <div class="editIcon">
      <hr class="hr">
      <div class="editInputs">
        <input class="editTitleInput" type="text" maxlength="20" value="${taskData.title}" required>
        <input class="editBodyInput" type="text" maxlength="33" value="${taskData.body}" required>
      </div>
      <div class="editSaveButtons">
        <button class="saveEditButton"><p>Save</p></button>
        <button class="cancelEditButton"><p>Cancel</p></button>
      </div>
    </div>
  `;

  return editContainer;
}

// Настройка кнопки "Сохранить"
function editSaveButton(editContainer, editIcon) {
  editContainer.querySelector(".saveEditButton").addEventListener("click", function () {
    const newTitle = editContainer.querySelector(".editTitleInput").value;

    if (!newTitle.trim()) {
      alert("Title cannot be empty!");
      return;
    }

    handleSaveAnimation(editIcon, () => {
      const newBody = editContainer.querySelector(".editBodyInput").value;
      const openTools = document.querySelector(".tools").parentNode;
      const taskTitle = openTools.querySelector("h1");
      const taskBody = openTools.querySelector("h2");

      if (taskTitle && taskBody) {
        taskTitle.textContent = newTitle;
        taskBody.textContent = newBody;
        
        updateTaskInStorage(openTools.getAttribute("data-task-id"), newTitle, newBody);
      }

      document.body.removeChild(editContainer);
    });
  });
}

function editCancelButton(editContainer, editIcon) {
  editContainer.querySelector(".cancelEditButton").addEventListener("click", function () {
    handleSaveAnimation(editIcon, () => {
      document.body.removeChild(editContainer);
    });
  });
}

function handleSaveAnimation(editIcon, callback) {
  editIcon.classList.add("fadeOutScale");
  editIcon.addEventListener("animationend", callback, { once: true });
}

function updateTaskInStorage(taskId, newTitle, newBody) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { id: taskId, title: newTitle, body: newBody };
    }
    return task;
  });
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}
