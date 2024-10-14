const http = require('http');
const fs = require('fs');
const path = require('path');
const open = require('open'); // Импортируем пакет open

const PORT = 8000;

// Основной обработчик сервера
const server = http.createServer((req, res) => {
    // Указываем, что главная страница - main.html
    let filePath = 'main.html';

    // Проверяем, что запрашивается
    if (req.url === '/' || req.url === '/main.html') {
        filePath = path.join(__dirname, 'main.html');
    } else {
        // Определяем путь к запрашиваемому ресурсу
        filePath = path.join(__dirname, req.url);
    }

    // Получаем расширение файла и определяем тип контента
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.jpg': 'image/jpg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.woff': 'font/woff',
        '.woff2': 'font/woff2',
        '.ttf': 'font/ttf',
        '.otf': 'font/otf',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Чтение запрашиваемого файла
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // Если файл не найден
                res.writeHead(404);
                res.end(`File not found: ${req.url}`);
            } else {
                // Если другая ошибка
                res.writeHead(500);
                res.end(`Server error: ${error.code}`);
            }
        } else {
            // Если файл найден
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

// Запуск сервера
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    open(`http://localhost:${PORT}/`); // Открываем браузер с URL
});
