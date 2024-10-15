document.addEventListener("DOMContentLoaded", function () {
  var taskContainer = document.querySelector(".taskContainer");
  var zeroTask = document.querySelector(".zeroTask");

  var titleInput = document.querySelector(
    ".inputs input[placeholder='Title...']"
  );
  var bodyInput = document.querySelector(
    ".inputs input[placeholder='About...']"
  );

  zeroTask.style.display = "block";

  function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      addTaskToDOM(task.title, task.body, task.id);
    });
  }

  function addTaskToDOM(title, body, taskId) {
    zeroTask.style.display = "none";

    var openTools = document.createElement("div");
    openTools.classList.add("openTools");

    openTools.setAttribute("data-task-id", taskId);

    var newTask = document.createElement("div");
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
    taskContainer.appendChild(openTools);
    newTask.style.display = "flex";

    newTask.querySelector(".dellButton").addEventListener("click", function () {
      var deleteTaskEvent = new CustomEvent("deleteTask", {detail: openTools});

      document.dispatchEvent(deleteTaskEvent);
    });

    newTask.addEventListener("click", function (event) {
      if (event.target.closest('.dellButton')) {
        return;
      }
      
      var openTaskEvent = new CustomEvent("openTask", {detail: openTools});
      
      document.dispatchEvent(openTaskEvent);
    });
  }

  document.getElementById("addButton").addEventListener("click", function () {
    var title = titleInput.value.trim();
    var body = bodyInput.value.trim();

    if (title === "") {
      alert("Give a name to your task!");
      return;
    }

    zeroTask.style.display = "none";

    var taskId = "task_" + Date.now();

    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ id: taskId, title: title, body: body});
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    addTaskToDOM(title, body, taskId);

    titleInput.value = "";
    bodyInput.value = "";
  });
  loadTasks();
});
