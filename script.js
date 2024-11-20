// Загружаем JSON с информацией о синглах
fetch('singles.json')
    .then(response => response.json())
    .then(singles => {
        const container = document.getElementById('singles-container');
        singles.forEach(single => {
            console.log(single);
            // Создаем карточку сингла
            const singleDiv = document.createElement('div');
            singleDiv.classList.add('single');

            // Добавляем обложку с кнопкой для перехода на страницу сингла
            singleDiv.innerHTML = `
                <a href="single/index.html?single=${encodeURIComponent(single.title)}">
                    <img src="${single.cover}" alt="${single.title}">
                </a>
                <div class="description">
                    <h2>${single.title}</h2>
                    <p>${single.artist}</p>
                </div>
                <div class="platforms">
                    ${generatePlatformLinks(single.links)}
                </div>
            `;

            container.appendChild(singleDiv);
        });
    })
    .catch(error => console.error('Error loading singles:', error));

// Генерация ссылок на платформы
function generatePlatformLinks(links) {
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
            <a href="${links[platform]}" class="${platform}">
                ${platforms[platform]} ${platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
        `)
        .join('');
}
