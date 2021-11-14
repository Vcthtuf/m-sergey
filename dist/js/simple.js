window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Подсветка меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(3);                              // делаем активной четвертую ссылку

    function linkActive(b) {                        // функция делает активной одну ссылку
        for (let i = 0; i < menuItems.length; i++) {
            if (i != b) {
                menuItems[i].classList.remove('menu_active');
            } else {
                menuItems[b].classList.add('menu_active');
            }
        }
    }

    // Подсветка внутреннего меню

    let mainTitle = document.querySelector('h1'),
        li = document.querySelectorAll('.tab');

    switch (mainTitle.textContent) {
        case 'Простые и составные числа':
            li[0].classList.add('tab_active');
            break;
        case 'Онлайн разложение на простые множители':
            li[1].classList.add('tab_active');
            break;
        case 'Взаимно простые числа':
            li[2].classList.add('tab_active');
            break;
        case 'Онлайн проверка взаимно простых чисел':
            li[3].classList.add('tab_active');
            break;
        default:
            break;
    }

});
