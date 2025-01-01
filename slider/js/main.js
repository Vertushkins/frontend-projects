const screenWidth = window.screen.width;

document.querySelectorAll('.slider').forEach((slider) => {
    let shifting = false; // Сдвигаем ли мы сейчас фото? (чтобы нельзя было спамить по кнопкам)
    let total_shift = 0; // Запоминаем на какое расстояние переместили фотки относительно левого края экрана
    let slow_shift = 0; // Это расстояние на которое надо сдвинуть фотки при нажатии на кнопку (изменяется со временем для плавности)
    let x = 0; // Координата для формулы плавного сдвига

    const images = slider.querySelectorAll('.image');
    const first_image = images[0];
    const last_image = images[images.length - 1];
    const width_last_img = last_image.getBoundingClientRect().width;

    // Обрабатываем правую кнопку
    slider.querySelector('.right-slider-btn').addEventListener("click", () => {

        // Если фото в слайдере не движутся, то работаем
        if (!shifting){
            shifting = true;
            // Каждые 20 миллисекунд сдвигаем все фото по формуле параболы
            const scroll_interval = setInterval(() => {
                if (last_image.getBoundingClientRect().left > screenWidth - width_last_img) {
                    x += 0.02; /* Х имеет такое значение, так как за секудну (1000 мс) мы двигаем изображения 50 раз (каждые 20 мс),
                    а раз парабола имеет корни в точках 0 и 1, то все расстояние Х пройдет если 50 раз будет прибавлятся на 0.02*/
                    slow_shift += Math.round(x*(x-1)*80); // Расчитываем на сколько отодвинутся фото через параболу
                    images.forEach((image) => {
                        image.style.left = `${slow_shift + total_shift}px`; // Сдвигаем все фото с учетом начального положения total_shift
                    });
                }
            }, 20);
            // После секунды
            const scroll_time = setTimeout(() => {
                clearInterval(scroll_interval); // Останавливаем движение фотографий
                total_shift += slow_shift; // Запоминаем на какой координате остановились

                // Обнуляемся
                slow_shift = 0;
                x = 0;
                shifting = false;
            }, 1000);
        }  

    });

    slider.querySelector('.left-slider-btn').addEventListener("click", () => {

        if (!shifting) {
            shifting = true;
            const scroll_interval = setInterval(() => {
                if (first_image.getBoundingClientRect().left < 0) {
                    x += 0.02;
                    slow_shift += Math.round(-x*(x-1)*80); // Тут минус перед Х, то есть идем в обратном направлении
                    images.forEach((image) => {
                        image.style.left = `${slow_shift + total_shift}px`;
                    });
                }
            }, 20);
            const scroll_time = setTimeout(() => {
                clearInterval(scroll_interval);
                total_shift += slow_shift;
                slow_shift = 0;
                x = 0;
                shifting = false;
            }, 1000);
        }
    });

});