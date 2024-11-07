document.addEventListener("shareTask", function (event) {
  const taskId = event.detail.taskId;

  const shareContainer = createShareContainer();
  const taskText = generateTaskText(taskId);

  document.body.appendChild(shareContainer);
  showShareIcon(shareContainer);

  setupCloseOnClickOutside(shareContainer);
  setupCloseOnEscape(shareContainer);
  setupShareButtons(shareContainer, taskText);
});

function createShareContainer() {
  const shareContainer = document.createElement("div");
  shareContainer.classList.add("shareContainer");

  shareContainer.innerHTML = `
    <div class="shareIcon">
      <div class="shareButtons">
        <button class="copyButton"><img src="./images/svg/Copy.svg" alt="Copy"></button>
        <button class="vkButton"><img src="./images/svg/vk.svg" alt="vk"></button>
        <button class="telegramButton"><img src="./images/svg/telegram.svg" alt="telegram"></button>
        <button class="whatsappButton"><img src="./images/svg/whatsapp.svg" alt="whatsapp"></button>
        <button class="facebookButton"><img src="./images/svg/facebook.svg" alt="facebook"></button>
      </div>
    </div>
  `;
  return shareContainer;
}

function generateTaskText(taskId) {
  const taskTitle = document.querySelector(".textArea h1").textContent;
  const taskBody = document.querySelector(".textArea h2").textContent;
  const taskMiniDescription = localStorage.getItem(`miniInput_${taskId}`) || "";
  const taskMaxDescription = localStorage.getItem(`maxInput_${taskId}`) || "";

  return `Task: ${taskTitle}\nThe subtitle: ${taskBody}\nShort description: ${taskMiniDescription}\nFull description: ${taskMaxDescription}`;
}

function showShareIcon(shareContainer) {
  const shareIcon = shareContainer.querySelector(".shareIcon");
  shareIcon.classList.add("fadeInSlide");
}

function setupCloseOnClickOutside(shareContainer) {
  const shareIcon = shareContainer.querySelector(".shareIcon");
  shareContainer.addEventListener("click", (event) => {
    if (!event.target.closest(".shareIcon")) {
      closeShareContainer(shareIcon, shareContainer);
    }
  });
}

function setupCloseOnEscape(shareContainer) {
  const shareIcon = shareContainer.querySelector(".shareIcon");
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeShareContainer(shareIcon, shareContainer);
    }
  });
}

function setupShareButtons(shareContainer, taskText) {
  const shareIcon = shareContainer.querySelector(".shareIcon");

  shareContainer.querySelector(".copyButton").addEventListener("click", () => {
    handleCopy(taskText, shareIcon, shareContainer);
  });

  shareContainer.querySelector(".vkButton").addEventListener("click", () => {
    openShareWindow(`https://vk.com/share.php?title=${encodeURIComponent(taskText)}`, shareIcon, shareContainer);
  });

  shareContainer.querySelector(".telegramButton").addEventListener("click", () => {
    openShareWindow(`https://t.me/share/url?url=${encodeURIComponent(taskText)}`, shareIcon, shareContainer);
  });

  shareContainer.querySelector(".whatsappButton").addEventListener("click", () => {
    openShareWindow(`https://api.whatsapp.com/send?text=${encodeURIComponent(taskText)}`, shareIcon, shareContainer);
  });

  shareContainer.querySelector(".facebookButton").addEventListener("click", () => {
    openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(taskText)}`, shareIcon, shareContainer);
  });
}

function closeShareContainer(shareIcon, shareContainer) {
  shareIcon.classList.add("fadeOutSlide");
  shareIcon.addEventListener("animationend", () => {
    document.body.removeChild(shareContainer);
  }, { once: true });
}

function handleCopy(taskText, shareIcon, shareContainer) {
  shareIcon.classList.add("fadeOutSlide");
  shareIcon.addEventListener("animationend", () => {
    navigator.clipboard.writeText(taskText).catch((err) => {
      console.error("Ошибка копирования: ", err);
    });
    document.body.removeChild(shareContainer);
  }, { once: true });
}

function openShareWindow(url, shareIcon, shareContainer) {
  shareIcon.classList.add("fadeOutSlide");
  shareIcon.addEventListener("animationend", () => {
    window.open(url, "shareWindow", "width=600,height=400");
    document.body.removeChild(shareContainer);
  }, { once: true });
}
