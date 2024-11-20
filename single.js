// Получаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const singleTitle = urlParams.get('single');

// Загружаем JSON с информацией о синглах
fetch('../singles.json')
    .then(response => response.json())
    .then(singles => {
        const single = singles.find(s => s.title === singleTitle);
        if (single) {
            // Заполняем страницу данными о сингле
            document.getElementById('single-title').textContent = single.title;
            document.getElementById('single-artist').textContent = `by ${single.artist}`;
            document.getElementById('single-cover').src = `../${single.cover}`;
            document.getElementById('single-cover').alt = single.title;
            
            // Генерируем кнопки для платформ
            const platformButtons = generatePlatformButtons(single.links);
            document.getElementById('platform-buttons').innerHTML = platformButtons;
        }
    })
    .catch(error => console.error('Error loading single:', error));

// Генерация кнопок для платформ на странице сингла
function generatePlatformButtons(links) {
    const platforms = {
        spotify: '<i class="fab fa-spotify"></i>',
        apple: '<i class="fab fa-apple"></i>',
        youtube: '<i class="fab fa-youtube"></i>',
        yandex: '<i class="fas fa-music"></i>',
        vk: '<i class="fab fa-vk"></i>',
        tiktok: '<i class="fab fa-tiktok"></i>'
    };

    return Object.keys(links)
        .map(platform => `
            <a href="${links[platform]}" class="platform-button ${platform}">
                ${platforms[platform]} ${platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
        `)
        .join('');
}
