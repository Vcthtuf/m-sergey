window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Подсветка меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(6);                              // делаем активной седьмую ссылку

    function linkActive(b) {                        // функция делает активной одну ссылку
        for (let i = 0; i < menuItems.length; i++) {
            if (i != b) {
                menuItems[i].classList.remove('menu_active');
            } else {
                menuItems[b].classList.add('menu_active');
            }
        }
    }

    // Tabs

    let blockMenu = document.querySelector('.nav_tabs > ul'),
        tabs = document.querySelectorAll('.tab'),
        tabContent = document.querySelectorAll('section');

    hideTabContent(1);                              // скрытие вего контента, кроме первого таба
    tabs[0].classList.add('tab_active');                // показ первого таба

    blockMenu.addEventListener('click', function (event) {   // обработка клика выбора табов
        let target = event.target;
        if (target && target.classList.contains('tab')) {

            for (let i = 0; i < tabs.length; i++) {
                if (target == tabs[i]) {
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
            tabs[i].classList.remove('tab_active');
        }
    }

    function showTabContent(b) {                        // функция показа контента
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
            tabs[b].classList.add('tab_active');
        }
    }

    // ---------------------------------------------

    // Разложение на простые множители

    let inputValue = document.querySelector('.solution_input > input'),      // входное число
        blockInput = document.querySelector('.solution_input'),
        calcBtn = document.querySelector('.calc'),
        inputResult = document.querySelector('.solution_result > input'),
        // solutionBtn = document.querySelector('.solution_btn'),
        solutionText = document.querySelector('.solution_text'),
        simpleNumbers = [];

    let msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных

    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        // dividedYes = [];
        // dividedNo = [];
        deleteMessageError();
    });

    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Разложить", вывода результата и очистка решения

        if (+inputValue.value < 0) {
            inputResult.value = `Введите положительное число`;
            solutionText.textContent = 'Факториалы отрицательных чисел не определены';
        }
        else {
            msgError.classList.remove('message_error_active');
            inputValue.classList.remove('input_error');
            factorial(inputValue.value);
            inputResult.value = `${inputValue.value}! = ${factorial(inputValue.value)}`;
        }
    });

    function factorial(n) {             // функция вычисления факториала
        if (n == 0) { n = 1; return n }
        else { return n ? n * factorial(n - 1) : 1; }
    }

    // ------------------------------------------------

    // Функция вывода сообщения об ошибке (не введены значения или одно из значений)

    function messageError() {

        msgError.classList.add('message_error_active');

        inputValue.classList.add('input_error');
        inputResult.value = '';
    }

    // -------------------------------------------------

    // Функция отмены вывода сообщения об ошибке

    function deleteMessageError() {
        msgError.classList.remove('message_error_active');
        inputValue.classList.remove('input_error');
    }

    // -------------------------------------------------

});
