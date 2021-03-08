window.addEventListener('DOMContentLoaded', function () {

    'use strict'

    let blockInput = document.querySelector('.solution_input'),
        blockMenu = document.querySelector('.nav_tabs > ul'),
        tabs = document.querySelectorAll('.tab'),
        tabContent = document.querySelectorAll('section');

    // Очистка inputs при фокусе

    blockInput.addEventListener('click', function (event) {
        let target = event.target;
        target.setAttribute('placeholder', '');
    });

    // -------------------------

    // Tabs

    blockMenu.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('tab')) {

            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
                    console.log(target);
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    function hideTabContent(a) {                        // функция скрытия контента
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b) {                        // функция показа контента
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    // ---------------------------------------------





});