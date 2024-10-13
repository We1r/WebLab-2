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

  document.getElementById("addButton").addEventListener("click", function () {
    var title = titleInput.value.trim();
    var body = bodyInput.value.trim();

    if (title === "") {
      alert("Give a name to your task!");
      return;
    }

    zeroTask.style.display = "none";

    var openTools = document.createElement("div");
    openTools.classList.add("openTools");

    var newTask = document.createElement("task");
    newTask.classList.add("task");
    newTask.innerHTML = `
      <div class="textArea">
        <h1>${title}</h1>
        <h2>${body}</h2>
      </div>
      <button class="dellButton">
        <img src="images/svg/Cross.svg" alt="cross">
      </button>
    `;

    openTools.appendChild(newTask);
    taskContainer.appendChild(openTools);
    newTask.style.display = "flex";

    titleInput.value = "";
    bodyInput.value = "";

    newTask.querySelector(".dellButton").addEventListener("click", function () {
      taskContainer.removeChild(openTools);

      if (taskContainer.querySelectorAll(".openTools").length === 0) {
        zeroTask.style.display = "block";
      }
    });

    newTask.addEventListener("click", function () {
      var openTaskEvent = new CustomEvent("openTask", {detail: openTools});
      document.dispatchEvent(openTaskEvent);
    });
  });
});