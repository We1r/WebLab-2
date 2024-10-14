document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("shareTask", function (event) {
        var taskId = event.detail.taskId;

        var shareContainer = document.createElement("div");
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
        `
        var taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
        var taskTitle = document.querySelector(".textArea h1").textContent;
        var taskBody = document.querySelector(".textArea h2").textContent;

        var taskMiniDescription = localStorage.getItem(`miniInput_${taskId}`) || '';
        var taskMaxDescription = localStorage.getItem(`maxInput_${taskId}`) || '';

        var taskText = `Task: ${taskTitle}\nThe subtitle: ${taskBody}\nShort description: ${taskMiniDescription}\nFull description: ${taskMaxDescription}`;

        document.body.appendChild(shareContainer);

        shareContainer.querySelector(".copyButton").addEventListener("click", function () {
            navigator.clipboard.writeText(taskText).then(function() {
                console.log('Задача скопирована в буфер обмена');
            }).catch(function(err) {
                console.error('Ошибка копирования: ', err);
            });
            
            document.body.removeChild(shareContainer);
        });

        shareContainer.querySelector(".vkButton").addEventListener("click", function () {
            var vkShareUrl = `https://vk.com/share.php?title=${encodeURIComponent(taskTitle)}&comment=${encodeURIComponent(taskText)}`;

            window.open(vkShareUrl, 'shareWindow', 'widht=600,height=400');
            document.body.removeChild(shareContainer);
        });

        shareContainer.querySelector(".telegramButton").addEventListener("click", function () {
            var telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(taskText)}`;
            
            window.open(telegramShareUrl, 'shareWindow', 'width=600,height=400');
            document.body.removeChild(shareContainer);
        });

        shareContainer.querySelector(".whatsappButton").addEventListener("click", function () {
            var whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(taskText)}`;
            
            window.open(whatsappShareUrl, 'shareWindow', 'width=600,height=400');
            document.body.removeChild(shareContainer);
        });

        shareContainer.querySelector(".facebookButton").addEventListener("click", function () {
            var facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(taskText)}`;
            
            window.open(facebookShareUrl, 'shareWindow', 'width=600,height=400');
            document.body.removeChild(shareContainer);
        });
    });
});