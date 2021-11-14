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

    // -------------------------------------------------

    let inputValue = document.querySelectorAll('.solution_input > input'),      // входные инпуты
        input = [],                                                                  // входные числа
        blockInput = document.querySelector('.solution_input'),
        inputResult = document.querySelector('.solution_result > input'),
        solutionText = document.querySelector('.solution_text');



    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';

        if (target === inputValue[0]) {
            inputValue[0].setAttribute('autofocus', 'autofocus');
            inputValue[1].removeAttribute('autofocus');
        }

        if (target === inputValue[1]) {

            inputValue[1].setAttribute('autofocus', 'autofocus');
            inputValue[0].removeAttribute('autofocus');
        }

    });

    let msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных

    // Расчет 

    function nod(a, b) {    // функция быстрого вычисления НОД для вывода ответа
        if (!b) {
            return a;
        }
        return nod(b, a % b);
    }

    function answer(n) {  // обработка клика по кнопке "Проверить", вывода результата и очистка решения

        if (nod(n[0], n[1]) == 1) {
            inputResult.value = `Числа ${n[0]} и ${n[1]} взаимно простые`;
            solutionText.insertAdjacentHTML('beforeend', `Числа ${n[0]} и ${n[1]} имеют один общий множитель и он равен 1.<br> Поэтому эти числа взаимно просты <br>`);


        } else {
            inputResult.value = `Числа ${n[0]} и ${n[1]} НЕ взаимно простые`;

            solutionText.insertAdjacentHTML('beforeend', `Числа ${n[0]} и ${n[1]} имеют общий множитель, равный ${nod(n[0], n[1])}.<br> Поэтому эти числа <span style="color: red">НЕ</span> взаимно просты <br>`);
        }
    }

    function calc() {

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

    }

    // Ввод значений с клавиатуры на экране

    let keys = document.querySelector('.keys');

    let reg = /\D/;

    keys.addEventListener('mousedown', function (e) {
        let left = document.querySelector('.icon-long-arrow-left');
        let target = e.target;
        target.classList.add('button_click');
        target.style.transform = "translate(2%, 2%)";
        if (inputValue[0].hasAttribute('autofocus', 'autofocus')) {
            if (target.name != 'left' && target.name != 'C' && target.name != 'Enter' && target.name != undefined) {
                inputValue[0].value = `${inputValue[0].value}${target.name}`;
            } else if (target.name == 'C') {
                inputValue[0].value = '';
                inputValue[1].value = '';
                inputResult.value = '';
            } else if (target === left) {
                inputValue[0].value = inputValue[0].value.slice(0, -1);
            } else if (target.name == 'Enter') {
                if (reg.test(inputValue[0].value || inputValue[0].value == '' || inputValue[0].value == ' ')) {
                    inputValue[0].value = 'Введите число';
                    inputResult.value = 'Введите число';
                } else {
                    input[0] = +inputValue[0].value;
                    input[1] = +inputValue[1].value;
                    solutionText.textContent = "";
                    answer(input);
                }
            }
        }

        if (inputValue[1].hasAttribute('autofocus', 'autofocus')) {
            if (target.name != 'left' && target.name != 'C' && target.name != 'Enter' && target.name != undefined) {
                inputValue[1].value = `${inputValue[1].value}${target.name}`;
            } else if (target.name == 'C') {
                inputValue[1].value = '';
                inputValue[0].value = '';
                inputResult.value = '';
            } else if (target === left) {
                inputValue[1].value = inputValue[1].value.slice(0, -1);
            } else if (target.name == 'Enter') {
                if (reg.test(inputValue[1].value || inputValue[1].value == '' || inputValue[1].value == ' ')) {
                    inputValue[1].value = 'Введите число';
                    inputResult.value = 'Введите число';
                } else {
                    input[0] = +inputValue[0].value;
                    input[1] = +inputValue[1].value;
                    solutionText.textContent = "";
                    answer(input);
                }
            }
        }

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