window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Расчет факториала

    let inputValue = document.querySelector('.solution_input > input'),      // входное число
        blockInput = document.querySelector('.solution_input'),
        inputResult = document.querySelector('.solution_result > input'),
        solutionText = document.querySelector('.solution_text');

    let msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных

    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        deleteMessageError();
    });

    function answer() {  // обработка клика по кнопке "Разложить", вывода результата и очистка решения

        if (+inputValue.value < 0) {
            inputResult.value = `Введите положительное число`;
            solutionText.textContent = 'Факториалы отрицательных чисел не определены';
        }
        else {
            solutionText.textContent = '';
            msgError.classList.remove('message_error_active');
            inputValue.classList.remove('input_error');
            factorial(+inputValue.value);
            inputResult.value = `${inputValue.value}! = ${factorial(inputValue.value)}`;
        }
    }

    function factorial(n) {             // функция вычисления факториала
        if (n == 0) { n = 1; return n; }
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

    // Ввод значений с клавиатуры на экране

    let keys = document.querySelector('.keys');

    let reg = /\D/;

    keys.addEventListener('mousedown', function (e) {
        let target = e.target;
        target.classList.add('button_click');
        target.style.transform = "translate(2%, 2%)";
        if (target.name != 'left' && target.name != 'C' && target.name != '!' && target.name != undefined) {
            inputValue.value = `${inputValue.value}${target.name}`;
        } else if (target.name == 'C') {
            inputValue.value = '';
            inputResult.value = '';
        } else if (target.name == '!') {

            if (reg.test(inputValue.value || inputValue.value == '')) {
                inputValue.value = 'Введите число';
                inputResult.value = 'Введите число';
            } else if (+inputValue.value > 170) {
                inputValue.value = 'Слишком большое число';
                inputResult.value = 'Слишком большое число';
            } else {
                answer();
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
});
