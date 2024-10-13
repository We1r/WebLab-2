document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("openTask", function (event) {
    var openTools = event.detail; // Это весь блок openTools

    var existingTools = openTools.querySelector(".tools"); // Ищем, есть ли уже кнопки

    // Если инструменты уже существуют
    if (existingTools) {
      // Добавляем/удаляем классы для анимации
      if (existingTools.classList.contains("expanded")) {
        existingTools.classList.remove("expanded");
        existingTools.classList.add("collapsed");
        
        // Удаление инструмента после окончания анимации сворачивания
        setTimeout(() => {
          existingTools.remove();
        }, 500); // Соответствует времени анимации в CSS (0.5s)
      } else {
        existingTools.classList.remove("collapsed");
        existingTools.classList.add("expanded");
      }
      return; // Просто сворачиваем/разворачиваем, если кнопки уже были созданы
    }

    // Создаем новый блок tools, если его не было
    var tools = document.createElement("div");
    tools.classList.add("tools", "collapsed"); // Начальное состояние — свернуто

    tools.innerHTML = `
        <button><img src="images/svg/Share.svg" alt="share"></button>
        <button><img src="images/svg/i.svg" alt="info"></button>
        <button><img src="images/svg/Edit.svg" alt="edit"></button>
    `;

    // Добавляем инструменты в openTools (под задачей)
    openTools.appendChild(tools);

    // Для анимации плавного раскрытия
    setTimeout(function () {
      tools.classList.remove("collapsed");
      tools.classList.add("expanded");
    }, 10); // Задержка для запуска анимации после добавления в DOM
  });
});
