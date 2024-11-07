document.addEventListener("infoTask", function (event) {
  let taskId = event.detail.taskId;

  const infoContainer = createInfoContainer();
  loadSavedData(infoContainer, taskId);
  document.body.appendChild(infoContainer);
  showInfoIcon(infoContainer);

  infoSaveButton(infoContainer, taskId);
  infoCancelButton(infoContainer);
});

function createInfoContainer() {
  let infoContainer = document.createElement("div");
  infoContainer.classList.add("infoContainer");

  infoContainer.innerHTML = `
        <div class="infoIcon">
            <div class="infoArea">
                <input class="miniInput" type="text" placeholder="Mini Input..." required>
                <textarea class="maxInput" type="text" placeholder="Max Input..." required></textarea>
                <div class="buttonInfo">
                    <button class="infoCancel"><p>Cancel</p></button>
                    <button class="infoSave"><p>Save</p></button>
                </div>
            </div>
        </div>
    `;
  return infoContainer;
}

function loadSavedData(infoContainer, taskId) {
  let savedMiniInput = localStorage.getItem(`miniInput_${taskId}`);
  let savedMaxInput = localStorage.getItem(`maxInput_${taskId}`);

  if (savedMiniInput) {
    infoContainer.querySelector(".miniInput").value = savedMiniInput;
  }
  if (savedMaxInput) {
    infoContainer.querySelector(".maxInput").value = savedMaxInput;
  }
}

function showInfoIcon(infoContainer) {
  let infoIcon = infoContainer.querySelector(".infoIcon");
  infoIcon.classList.add("fadeInScale");
}

function infoSaveButton(infoContainer, taskId) {
  let infoIcon = infoContainer.querySelector(".infoIcon");
  infoContainer.querySelector(".infoSave").addEventListener("click", function () {
    infoIcon.classList.add("fadeOutScale");

    infoIcon.addEventListener("animationend", function () {
      document.body.removeChild(infoContainer);

      let miniInputValue = infoContainer.querySelector(".miniInput").value;
      let maxInputValue = infoContainer.querySelector(".maxInput").value;

      localStorage.setItem(`miniInput_${taskId}`, miniInputValue);
      localStorage.setItem(`maxInput_${taskId}`, maxInputValue);
    }, { once: true });
  });
}

function infoCancelButton(infoContainer) {
  let infoIcon = infoContainer.querySelector(".infoIcon");
  infoContainer.querySelector(".infoCancel").addEventListener("click", function () {
    infoIcon.classList.add("fadeOutScale");

    infoIcon.addEventListener("animationend", function () {
      document.body.removeChild(infoContainer);
    }, { once: true });
  });
}
