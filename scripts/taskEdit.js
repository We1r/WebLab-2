document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("editTask", function (event) {
    var taskData = event.detail;
    console.log("Received task for editing:", taskData);

    var editContainer = document.createElement("div");
    editContainer.classList.add("editContainer");

    editContainer.innerHTML = `
      <div class="editIcon">
      <hr class="hr">
      <div class="editInputs">
        <input class="editTitleInput" type="text" value="${taskData.title}" required>
        <input class="editBodyInput" type="text" value="${taskData.body}" required>
      </div>
      <div class="editSaveButtons">
        <button class="saveEditButton"><p>Save</p></button>
        <button class="cancelEditButton"><p>Cuncel</p></button>
      </div>
      </div>
    `;
    document.body.appendChild(editContainer);

    var editIcon = document.querySelector(".editIcon");
    editIcon.classList.add("fadeInScale");

    editContainer
      .querySelector(".saveEditButton")
      .addEventListener("click", function () {
        editIcon.classList.add("fadeOutScale");

        editIcon.addEventListener(
          "animationend",
          function () {
            document.body.removeChild(editContainer);
            var newTitle = editContainer.querySelector(".editTitleInput").value;
            var newBody = editContainer.querySelector(".editBodyInput").value;

            console.log("New values: ", newTitle, newBody);

            var openTools = document.querySelector(".tools").parentNode;
            var taskTitle = openTools.querySelector("h1");
            var taskBody = openTools.querySelector("h2");

            if (taskTitle && taskBody) {
              taskTitle.textContent = newTitle;
              taskBody.textContent = newBody;
              console.log("Task updated successfully");

              updateTaskInStorage(
                openTools.getAttribute("data-task-id"),
                newTitle,
                newBody
              );
            }
          },
          { once: true }
        );
      });

    editContainer
      .querySelector(".cancelEditButton")
      .addEventListener("click", function () {
        editIcon.classList.add("fadeOutScale");

        editIcon.addEventListener(
          "animationend",
          function () {
            document.body.removeChild(editContainer);
          },
          { once: true }
        );
      });
  });

  function updateTaskInStorage(taskId, newTitle, newBody) {
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    var updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { id: taskId, title: newTitle, body: newBody };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }
});
