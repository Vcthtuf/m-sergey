window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Подсветка главного меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(10);                              // делаем активной седьмую ссылку

    function linkActive(b) {                        // функция делает активной одну ссылку
        for (let i = 0; i < menuItems.length; i++) {
            if (i != b) {
                menuItems[i].classList.remove('menu_active');
            } else {
                menuItems[b].classList.add('menu_active');
            }
        }
    }

    // -------------------------------------------------

    // Подсветка внутреннего меню

    let mainTitle = document.querySelector('h1'),
        li = document.querySelectorAll('.tab');


    switch (mainTitle.textContent) {
        case 'Факториал':
            li[0].classList.add('tab_active');
            break;
        case 'Таблицы факториалов до 20 и 50':
            li[1].classList.add('tab_active');
            break;
        case 'Примеры решения факториалов':
            li[2].classList.add('tab_active');
            break;
        case 'Онлайн калькулятор факториала':
            li[3].classList.add('tab_active');
            break;
        default:
            break;
    }



});
