window.addEventListener('DOMContentLoaded', function () {

    'use strict'

    // Подсветка меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(0);                              // делаем активной первую ссылку

    function linkActive(b) {                        // функция делает активной одну ссылку
        for (let i = 0; i < menuItems.length; i++) {
            if (i != b) {
                menuItems[i].classList.remove('menu_active');
            } else {
                menuItems[b].classList.add('menu_active');
            }
        }
    }

});