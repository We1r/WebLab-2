var buttonAdd = document.getElementById('addButton');

buttonAdd.addEventListener('mousedown', () => {
    buttonAdd.classList.add('active')
});

buttonAdd.addEventListener('mouseup', () => {
    setTimeout(() => {
        buttonAdd.classList.remove('active')
    }, 150);
});

buttonAdd.addEventListener('click', (event) => {
    event.preventDefault();
    buttonAdd.classList.remove('active');
});