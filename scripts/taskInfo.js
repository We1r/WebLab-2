document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("infoTask", function (event) {
    console.log("infoTask event triggered");

    var taskId = event.detail.taskId;

    var infoContainer = document.createElement("div");
    infoContainer.classList.add("infoContainer");

    infoContainer.innerHTML = `
        <div class="infoIcon">
            <div class="infoArea">
                <input class="miniInput" type="text" placeholder="Mini Input..." required>
                <textarea class="maxInput" type="text" placeholder="Max Input..." required></textarea>
                <div class="buttonInfo">
                    <button class="infoCancel"><p>Cuncel</p></button>
                    <button class="infoSave"><p>Save</p></button>
                </div>
            </div>
        </div>
    `;

    var savedMiniInput = localStorage.getItem(`miniInput_${taskId}`);
    var savedMaxInput = localStorage.getItem(`maxInput_${taskId}`);

    if (savedMiniInput) {
      infoContainer.querySelector(".miniInput").value = savedMiniInput;
    }
    if (savedMaxInput) {
      infoContainer.querySelector(".maxInput").value = savedMaxInput;
    }

    document.body.appendChild(infoContainer);

    var infoIcon = document.querySelector(".infoIcon");
    infoIcon.classList.add("fadeInScale");

    infoContainer
      .querySelector(".infoSave")
      .addEventListener("click", function () {
        infoIcon.classList.add("fadeOutScale");

        infoIcon.addEventListener("animationend", function () {
          document.body.removeChild(infoContainer);

          var miniInputValue = infoContainer.querySelector(".miniInput").value;
          var maxInputValue = infoContainer.querySelector(".maxInput").value;

          localStorage.setItem(`miniInput_${taskId}`, miniInputValue);
          localStorage.setItem(`maxInput_${taskId}`, maxInputValue);
        });
      });

    infoContainer
      .querySelector(".infoCancel")
      .addEventListener("click", function () {
        infoIcon.classList.add("fadeOutScale");

        infoIcon.addEventListener("animationend", function () {
          document.body.removeChild(infoContainer);
        });
      });
  });
});
