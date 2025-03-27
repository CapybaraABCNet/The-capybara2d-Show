const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let capybara = {
    x: 50,
    y: 50,
    width: 150,
    height: 130,
    speed: 15,
    image: new Image()
};

// Загружаем изображение капибары
capybara.image.src = 'https://static.donationalerts.ru/uploads/images/7511609/ca69f09c152c8267136dcba3000ab6d7.jpeg';

let coins = []; // Массив для хранения монет

// Определяем куст
let bush = {
    x: 510, // Позиция по оси X
    y: 430, // Позиция по оси Y
    width: 100,
    height: 100,
    image: new Image()
};

bush.image.src = 'https://pixy.org/src/19/194123.png';

function drawCapybara() {
    ctx.drawImage(capybara.image, capybara.x, capybara.y, capybara.width, capybara.height);
}

function drawBush() {
    ctx.drawImage(bush.image, bush.x, bush.y, bush.width, bush.height);
}

function drawBorder() {
    ctx.strokeStyle = 'black'; // Цвет границы
    ctx.lineWidth = 5; // Ширина границы
    ctx.strokeRect(0, 0, canvas.width, canvas.height); // Рисуем границу
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас
    drawBorder(); // Рисуем границу
    drawCapybara(); // Рисуем капибару
    drawBush(); // Рисуем куст
    coins.forEach(coin => drawCoin(coin.x, coin.y)); // Рисуем монеты
}

function moveCapybara(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (capybara.y - capybara.speed >= 0) {
                capybara.y -= capybara.speed;
            }
            break;
        case 'ArrowDown':
            if (capybara.y + capybara.height + capybara.speed <= canvas.height) {
                capybara.y += capybara.speed;
            }
            break;
        case 'ArrowLeft':
            if (capybara.x - capybara.speed >= 0) {
                capybara.x -= capybara.speed;
            }
            break;
        case 'ArrowRight':
            if (capybara.x + capybara.width + capybara.speed <= canvas.width) {
                capybara.x += capybara.speed;
            }
            break;
    }
    update();
}

function drawCoin(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2); // Рисуем круг для монеты
    ctx.fillStyle = 'gold'; // Цвет монеты
    ctx.fill();
    ctx.closePath();
}

function spawnCoin() {
    const x = Math.random() * (canvas.width - 20) + 10; // Генерируем случайные координаты для монеты
    const y = Math.random() * (canvas.height - 20) + 10;
    coins.push({ x, y }); // Добавляем монету в массив
}

canvas.addEventListener('click', function(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Проверка, попал ли игрок на монету
    coins = coins.filter(coin => {
        const distance = Math.sqrt((coin.x - mouseX) ** 2 + (coin.y - mouseY) ** 2);
        if (distance < 10) {
            console.log('Монета собрана!');
            return false; // Удаляем монету из массива
        }
        return true; // Оставляем монету
    });
    update(); // Обновляем отображение
});

document.addEventListener('keydown', moveCapybara);
capybara.image.onload = update; // Обновляем игру после загрузки изображения

// Спавним монеты каждые 2 секунды
setInterval(spawnCoin, 2000);