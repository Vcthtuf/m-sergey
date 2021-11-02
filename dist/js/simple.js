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

    // Разложение на простые множители

    let inputValue = document.querySelector('.solution_input > input'),      // входное число
        blockInput = document.querySelector('.solution_input'),
        inputResult = document.querySelector('.solution_result > input'),
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

    function answer() {  // обработка клика по кнопке "Разложить", вывода результата и очистка решения

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
            inputResult.value = `${inputValue.value} = ${simpleNumbers.join(' ∙ ')}`;
            solutionText.textContent = '';
        }
    }

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

    // Функция вывода решения

    function solution() {

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
    };

    // функция показа решения, если число составное

    function showSolution(n) {
        // solutionText.textContent = '';
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem; font-size: 1.2rem; text-align: center">Решение</h3>`);
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
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem; text-align: center">Решение</h3>`);
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

    // Ввод значений с клавиатуры на экране

    let keys = document.querySelector('.keys');

    let reg = /\D/;

    keys.addEventListener('mousedown', function (e) {
        let target = e.target;
        target.classList.add('button_click');
        target.style.transform = "translate(2%, 2%)";
        if (target.name != 'left' && target.name != 'C' && target.name != 'Enter' && target.name != undefined) {
            inputValue.value = `${inputValue.value}${target.name}`;
        } else if (target.name == 'C') {
            inputValue.value = '';
            inputResult.value = '';
            solutionText.textContent = '';
            dividedNo = [];
            dividedYes = [];
        } else if (target.name == 'Enter') {

            if (reg.test(inputValue.value || inputValue.value == '')) {
                inputValue.value = 'Введите число';
                inputResult.value = 'Введите число';
            } else {
                answer();
                solution();
            }
        }
    });

    let left = document.querySelector('#left');
    left.addEventListener('click', function () {
        inputValue.value = inputValue.value.slice(0, -1);
    });

    keys.addEventListener('mouseup', function (e) {
        let target = e.target;
        target.style.transform = "";
    });


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
            calc();
            break;
        case 'Онлайн проверка взаимно простых чисел':
            li[3].classList.add('tab_active');
            break;
        default:
            break;
    }

});
