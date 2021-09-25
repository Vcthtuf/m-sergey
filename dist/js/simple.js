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
        solutionBtn = document.querySelector('.solution_btn'),
        solutionText = document.querySelector('.solution_text'),
        simpleNumbers = [];

    let msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных

    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        dividedYes = [];
        dividedNo = [];
        deleteMessageError();

    });

    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Разложить", вывода результата и очистка решения

        if (+inputValue.value === 0) {

            messageError();
        } else if (isPrime(+inputValue.value)) {
            inputResult.value = `${inputValue.value} - простое число`;
            solutionText.textContent = '';

        }
        else {
            msgError.classList.remove('message_error_active');
            inputValue.classList.remove('input_error');
            getSimpleFactors(inputValue.value);
            inputResult.value = `${inputValue.value} = ${simpleNumbers.join(' * ')}`;
            solutionText.textContent = '';
        }
    });

    function isPrime(n) {             // функция проверки на простое число

        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    // ------------------------------------------------
    let dividedYes = [], dividedNo = [];
    function getSimpleFactors(n) {  // функция вычисления проcтых множителей числа
        simpleNumbers = [];

        isPrime(n);

        function checkDivided(n, i) {         // функция проверки на делимость

            if (n % i === 0) {
                dividedYes.push(i);
                return true;
            } else if (isPrime(i)) {

                dividedNo.push(i);
                return false
            } else return false
        }

        function simpleNum(n, i) {            // функция определения простых множителей и записи их в массив
            if (checkDivided(n, i) && isPrime(i) && n >= i) {
                simpleNumbers.push(i);
                n /= i;
                simpleNum(n, i);
            } else if (n > i) {
                simpleNum(n, ++i);
            }
        }
        simpleNum(n, 2);
    }

    // ----------------------------------------------------- 

    // Вывод решения

    solutionBtn.addEventListener('click', function () {

        if (isPrime(+inputValue.value)) {
            showSolutionSimple(+inputValue.value);

        } else {

            for (let i = 0; i < inputValue.value; i++) {
                solutionText.textContent = '';
                showSolution(inputValue.value);         // вывод решения
            }

            solutionText.textContent = '';
            showSolution(inputValue.value);
        }
    });

    // функция показа решения, если число составное

    function showSolution(n) {
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem;">Разложение на простые множители</h3>`);
        solutionText.insertAdjacentHTML('beforeend', `Разложить на простые множители число ${n}. <br><br>`);

        for (let i = 0; i < dividedYes.length; i++) {

            for (let j = 0; j < dividedNo.length; j++) {
                if (dividedNo[j] < dividedYes[i]) {
                    solutionText.insertAdjacentHTML('beforeend', `Число ${n}  не делится на ${dividedNo[j]}. Пробуем разделить на следующее простое число ${dividedNo[j + 1]}. <br>`);
                }
            }

            solutionText.insertAdjacentHTML('beforeend', `Число ${n} делится на <span style="color: red; font-size: 1.2rem; font-weight: 700">${dividedYes[i]}</span>.  <br> ${n} : ${dividedYes[i]} = ${n / dividedYes[i]}. <br>`);
            n = n / dividedYes[i];
        }

        solutionText.insertAdjacentHTML('beforeend', `<br>Получили число 1, поэтому разложение закончено`);
        solutionText.insertAdjacentHTML('beforeend', `<br><br> Разложение: ${inputValue.value} = ${simpleNumbers.join(' &middot; ')}`);
    }

    // ----------------------

    // Функция показа решения, если число простое

    function showSolutionSimple(n) {
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem;">Разложение на простые множители</h3>`);
        solutionText.insertAdjacentHTML('beforeend', `Число ${n} является простым, поэтому его нельзя разложить на множители. <br><br>`);
    }

    // ---------------------- 

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
