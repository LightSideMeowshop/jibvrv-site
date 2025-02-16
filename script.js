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
                <a href="${single.link}">
                    <div class="masked-wrapper">
                        <img src="${single.cover}" alt="${single.title}" class="masked">
                    </div>
                </a>
                <div class="description">
                    <h2>${single.title}</h2>
                </div>
            `;

            container.appendChild(singleDiv);
        });
    })
    .catch(error => console.error('Error loading singles:', error));
