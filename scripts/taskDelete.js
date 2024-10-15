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
              <button class="noButton"><p>No</p></button>
              <button class="yesButton"><p>Yes</p></button>
            </div>
        </div>
        `;
    document.body.appendChild(deleteContainer);

    function yesButton() {
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

    var deleteIcon =  document.querySelector(".deleteIcon");
    deleteIcon.classList.add("fadeInScale")
    
    deleteContainer.querySelector(".yesButton").addEventListener("click", function () {
      yesButton();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        yesButton();
      }
    });

    deleteContainer.querySelector(".noButton").addEventListener("click", function () {
      deleteIcon.classList.add("fadeOutScale");

      deleteIcon.addEventListener("animationend", function () {
        document.body.removeChild(deleteContainer);
      }, { once: true });
    });
  });

  function deleteTaskFromStorage(taskId) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var updatedTasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

});
