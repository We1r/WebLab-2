document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("openTask", function (event) {
    handleOpenTask(event.detail);
  });
});

function handleOpenTask(openTools) {
  const taskId = openTools.getAttribute("data-task-id");
  const existingTools = openTools.querySelector(".tools");

  if (existingTools) {
    toggleTools(existingTools);
  } else {
    addTools(openTools, taskId);
  }
}

function toggleTools(tools) {
  if (tools.classList.contains("expanded")) {
    tools.classList.remove("expanded");
    tools.classList.add("collapsed");

    setTimeout(() => {
      tools.remove();
    }, 500);
  } else {
    tools.classList.remove("collapsed");
    tools.classList.add("expanded");
  }
}

function addTools(openTools, taskId) {
  const tools = document.createElement("div");
  tools.classList.add("tools", "collapsed");

  tools.innerHTML = `
    <button class="shareButton"><img src="./images/svg/Share.svg" alt="share"></button>
    <button class="infoButton"><img src="./images/svg/i.svg" alt="info"></button>
    <button class="editButton"><img src="./images/svg/Edit.svg" alt="edit"></button>
  `;

  openTools.appendChild(tools);

  setupToolsEventListeners(tools, openTools, taskId);

  setTimeout(() => {
    tools.classList.remove("collapsed");
    tools.classList.add("expanded");
  }, 10);
}

function setupToolsEventListeners(tools, openTools, taskId) {
  tools.querySelector(".editButton").addEventListener("click", () => {
    dispatchEditTaskEvent(openTools);
  });

  tools.querySelector(".infoButton").addEventListener("click", () => {
    dispatchInfoTaskEvent(taskId);
  });

  tools.querySelector(".shareButton").addEventListener("click", () => {
    dispatchShareTaskEvent(taskId);
  });
}

function dispatchEditTaskEvent(openTools) {
  const taskTitle = openTools.querySelector("h1").textContent;
  const taskBody = openTools.querySelector("h2").textContent;

  const editTaskEvent = new CustomEvent("editTask", {
    detail: { title: taskTitle, body: taskBody },
  });

  document.dispatchEvent(editTaskEvent);
}

function dispatchInfoTaskEvent(taskId) {
  const infoTaskEvent = new CustomEvent("infoTask", {
    detail: { taskId: taskId },
  });

  document.dispatchEvent(infoTaskEvent);
}

function dispatchShareTaskEvent(taskId) {
  const shareTaskEvent = new CustomEvent("shareTask", {
    detail: { taskId: taskId },
  });

  document.dispatchEvent(shareTaskEvent);
}
