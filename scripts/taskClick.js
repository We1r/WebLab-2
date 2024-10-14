document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("openTask", function (event) {
    var openTools = event.detail;
    var taskId = openTools.getAttribute("data-task-id");

    var existingTools = openTools.querySelector(".tools");

    if (existingTools) {
      if (existingTools.classList.contains("expanded")) {
        existingTools.classList.remove("expanded");
        existingTools.classList.add("collapsed");
        
        setTimeout(() => {
          existingTools.remove();
        }, 500);
      } else {
        existingTools.classList.remove("collapsed");
        existingTools.classList.add("expanded");
      }
      return;
    }

    var tools = document.createElement("div");
    tools.classList.add("tools", "collapsed");

    tools.innerHTML = `
        <button class="shareButton"><img src="images/svg/Share.svg" alt="share"></button>
        <button class="infoButton"><img src="images/svg/i.svg" alt="info"></button>
        <button class="editButton"><img src="images/svg/Edit.svg" alt="edit"></button>
    `;

    openTools.appendChild(tools);

    tools.querySelector(".editButton").addEventListener("click", function () {
      var taskTitle = openTools.querySelector("h1").textContent;
      var taskBody = openTools.querySelector("h2").textContent;

      console.log("Editing task: ", taskTitle, taskBody);

      var editTaskEvent = new CustomEvent("editTask", { detail: {title: taskTitle, body: taskBody } });

      document.dispatchEvent(editTaskEvent);
    });

    tools.querySelector(".infoButton").addEventListener("click", function () {
      console.log("infoButton clicked");
      var infoTaskEvent = new CustomEvent("infoTask", { detail: { taskId: taskId } });

      document.dispatchEvent(infoTaskEvent);
    });

    tools.querySelector(".shareButton").addEventListener("click", function () {
      var shareTaskEvent = new CustomEvent("shareTask" , { detail: {taskId: taskId} });

      document.dispatchEvent(shareTaskEvent);
    });

    setTimeout(function () {
      tools.classList.remove("collapsed");
      tools.classList.add("expanded");
    }, 10);
  });
});
