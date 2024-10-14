document.addEventListener("DOMContentLoaded", function () {
  var taskContainer = document.querySelector(".taskContainer");
  var zeroTask = document.querySelector(".zeroTask");

  document.addEventListener("deleteTask", function (event) {
    var openTools = event.detail;
    var taskId = openTools.getAttribute("data-task-id");
    var deleteContainer = document.createElement("div");
        deleteContainer.classList.add("deleteContainer");

        deleteContainer.innerHTML = `
        <div class="deleteIcon">
            <hr class="hr" />
            <p>Delete the task?</p>
            <div class="deleteButtons">
                <button class="yesButton"><p>Yes</p></button>
                <button class="noButton"><p>No</p></button>
            </div>
        </div>
        `;
    document.body.appendChild(deleteContainer);

    deleteContainer.querySelector(".yesButton").addEventListener("click", function () {
      openTools.classList.add("fadeOutScale");

      openTools.addEventListener("animationend", function () {
        taskContainer.removeChild(openTools);

        deleteTaskFromStorage(taskId);
  
        if (taskContainer.querySelectorAll(".openTools").length === 0) {
          zeroTask.style.display = "block";
        }
      }, { once: true });

      document.body.removeChild(deleteContainer);
    });

    deleteContainer.querySelector(".noButton").addEventListener("click", function () {
      document.body.removeChild(deleteContainer);
    });
  });

  function deleteTaskFromStorage(taskId) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  
});
