window.addEventListener('DOMContentLoaded', function () {

    'use strict';


    // Расчет факториала

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
            solutionText.textContent = '';
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
