window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Подсветка меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(5);                              // делаем активной седьмую ссылку

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

    // Расчет 

    function calc() {

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

            if (+inputValue.value <= 0) {
                inputResult.value = `Введите положительное число`;
            } else if (+inputValue.value == 1) {
                inputResult.value = `${inputValue.value} - не простое и не составное число`;
            }
            else {
                solutionText.textContent = '';
                msgError.classList.remove('message_error_active');
                inputValue.classList.remove('input_error');
                if (isPrime(+inputValue.value)) {
                    inputResult.value = `${inputValue.value} - простое число`;
                } else {
                    inputResult.value = `${inputValue.value} - составное число`;
                }
            }
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
            if (target.name != 'left' && target.name != 'C' && target.name != 'Enter' && target.name != undefined) {
                inputValue.value = `${inputValue.value}${target.name}`;
            } else if (target.name == 'C') {
                inputValue.value = '';
                inputResult.value = '';
            } else if (target.name == 'Enter') {

                if (reg.test(inputValue.value || inputValue.value == '')) {
                    inputValue.value = 'Введите число';
                    inputResult.value = 'Введите число';
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
    }

    // Подсветка внутреннего меню

    let mainTitle = document.querySelector('h1'),
        li = document.querySelectorAll('.tab');

    switch (mainTitle.textContent) {
        case 'Простые и составные числа':

            li[0].classList.add('tab_active');
            break;
        case 'Таблицы простых чисел':
            li[1].classList.add('tab_active');
            break;
        case 'Онлайн проверка числа':
            li[2].classList.add('tab_active');
            calc();
            break;
        case 'Примеры решения задач':
            li[3].classList.add('tab_active');
            break;
        default:
            break;
    }

    // Заполнение таблицы простых чисел до 1000

    let tr = document.querySelectorAll('.prime1000 tr td');
    let k = 0;
    for (let i = 2; i <= 1013; i++) {
        if (isPrime(i)) {
            tr[k].textContent = i;
            k++;
        }
    }

    function isPrime(n) {             // функция проверки простое ли число
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

});