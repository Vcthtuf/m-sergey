window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Tabs

    let blockMenu = document.querySelector('.nav_tabs > ul'),
        tabs = document.querySelectorAll('.tab'),
        tabContent = document.querySelectorAll('section');

    hideTabContent(1);                              // скрытие вего контента, кроме первого таба
    tabs[0].classList.add('active');                // показ первого таба


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
            tabs[i].classList.remove('active');
        }
    }

    function showTabContent(b) {                        // функция показа контента
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
            tabs[b].classList.add('active');
        }
    }

    // ---------------------------------------------

    // Перевод в другую системы счисления 

    let inputValue = [],      // массив входных чисел
        blockInput = document.querySelector('.solution_input'),
        inputItems = document.querySelectorAll('.solution_input > input'),
        inputNumber = document.querySelector('#input_number'),
        notationInput = document.querySelector('#not_input'),
        notationOutput = document.querySelector('#not_output'),
        calcBtn = document.querySelector('.calc'),
        inputResult = document.querySelector('.solution_result .result');

    let msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных



    let appData = {    // объект для хранения данных
        result: 1,
        inputValue: [],
        simpleNum: [[], []],
        commonFactors: [],
        resultNod: 1
    };

    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        appData.result = 1;
        appData.inputValue = [];
        appData.simpleNum = [[], []];
        appData.commonFactors = [];
        appData.resultNod = 1;
        deleteMessageError();

    });

    let nod = function (a, b) {    // функция быстрого вычисления НОД для вывода ответа
        if (!b) {
            return a;
        }
        return nod(b, a % b);
    }

    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Рассчитать", вывода результата и очистка решения

        console.log('Входное число: ' + +inputNumber.value);
        console.log('Система счисления входного числа: ' + +notationInput.value);
        console.log('Система счисления результата: ' + +notationOutput.value);

        let input = inputNumber.value,
            notationIn = +notationInput.value,
            notationOut = +notationOutput.value;

        for (let i = 0; i < inputValue.length; i++) {
            inputValue[i] = +inputItems[i].value;
            if (!inputValue[i]) {
                messageError();
                break;
            } else {
                msgError.classList.remove('message_error_active');
                for (let i = 0; i < inputItems.length; i++) {
                    inputItems[i].classList.remove('input_error');

                }

            }
            appData.inputValue.push(inputValue[i]);
        }
        appData.result = convertNotation(input, notationOut, notationIn);
        inputResult.insertAdjacentHTML('beforeend', `${input} <sub>${notationIn}</sub> = ${appData.result} <sub>${notationOut}</sub>`);
        solutionText.textContent = '';
    });

    // ------------------------------------------------



    // Перевод в другую систему счисления

    let solutionText = document.querySelector('.solution_text'),
        solutionBtn = document.querySelector('.solution_btn');

    function convertNotation(num, notationOut, notationIn) {     // функция перевода в другую систему счисления

        let numberToTen = parseInt(num, notationIn);
        // console.log(num);
        console.log(numberToTen);
        // console.log(notationOut);

        return numberToTen.toString(notationOut);
    };

    // разложение на простые множители чисел


    for (let i = 0; i < appData.inputValue.length; i++) {
        appData.simpleNum[i] = fact(inputValue[i]);
    }
    // ----------------------------------

    function commonFactor() {      // нахождение общих множителей

        appData.simpleNum[0].forEach(function (item) {
            if (appData.simpleNum[1].indexOf(item) != -1) {
                appData.commonFactors.push(item);
                appData.simpleNum[1].splice(appData.simpleNum[1].indexOf(item), 1);
            }
        });
    }

    function calcNod(arr) {                         // нахождение НОД для решения методом разложения
        arr.forEach(function (item) {
            appData.resultNod *= item;
        })
        return appData;
    }

    // Вывод решения методом разложения


    solutionBtn.addEventListener('click', function () {

        for (let i = 0; i < appData.inputValue.length; i++) {
            appData.simpleNum[i] = fact(inputValue[i]);
        }
        solutionText.textContent = '';
        commonFactor();
        calcNod(appData.commonFactors);
        showSolution();    // вывод решения методом разложения

    });

    // функция вывода рещения алгоритмом Евклида
    let k, nodEvklid;
    function showEvklid(a, b) {
        solutionText.insertAdjacentHTML('beforeend', `Найти НОД чисел: ${inputValue[0]} и ${inputValue[1]} <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Делим большее число на меньшее, а далее делитель на остаток от деления <br>`);
        calcEvklid(a, b);
        k = null;
        solutionText.insertAdjacentHTML('beforeend', `Последний ненулевой остаток равен: ${nodEvklid} <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Следовательно, НОД равен: ${nodEvklid}. <br>`);

    }

    // функция вычисления НОД алгоритмом Евклида

    function calcEvklid(a, b) {
        if (a < b) { let c = a; a = b; b = c; }
        if (k != 0) {
            k = a % b;
            solutionText.insertAdjacentHTML('beforeend', ` ${a} : ${b} = ${Math.floor(a / b)} остаток ${k} <br>`);
            if (k === 0) {
                nodEvklid = b; return nodEvklid;
            } else {
                calcEvklid(b, k);
            }
        }
    }

    // функция вывода решения методом разложения

    function showSolution() {
        solutionText.textContent = '';
        solutionText.insertAdjacentHTML('afterbegin', '<h3 style="text-align: center; margin-bottom: 1rem;"> Решение </h3>');
        solutionText.insertAdjacentHTML('beforeend', '<p style="text-align: center; font-size: 1.5rem;"> 1 способ. Метод разложения на простые множители </p>');
        solutionText.insertAdjacentHTML('beforeend', `Найти НОД чисел: ${inputValue[0]} и ${inputValue[1]} <br>`);
        for (let i = 0; i < inputValue.length; i++) {
            solutionText.insertAdjacentHTML('beforeend', `Раскладываем число ${inputValue[i]} на <a class='simple' href='simple.html'>простые множители</a>:  <br>`);

            let simpleNum = [];
            simpleNum = fact(inputValue[i]);
            solutionText.insertAdjacentHTML('beforeend', `${inputValue[i]} = ${simpleNum.join('&middot;')} <br>`);
        }

        if (appData.commonFactors.length > 1) {

            solutionText.insertAdjacentHTML('beforeend', 'Находим общие множители двух чисел. Они равны: ' + appData.commonFactors.join(',') + '.<br>');
            solutionText.insertAdjacentHTML('beforeend', 'Перемножаем общие делители обоих чисел: ' + appData.commonFactors.join('&middot;') + ' = ' + appData.resultNod + '. <br>');
            solutionText.insertAdjacentHTML('beforeend', 'Получаем ответ. Наибольший общий делитель чисел равен ' + appData.resultNod + '.');

        } else if (appData.commonFactors.length === 1) {
            solutionText.insertAdjacentHTML('beforeend', 'Находим общие множители двух чисел. Он один и равен: ' + appData.commonFactors[0] + '.<br>');

            solutionText.insertAdjacentHTML('beforeend', 'Получаем ответ. Наибольший общий делитель чисел НОД = ' + appData.commonFactors[0] + '.');
        } else if (appData.commonFactors.length === 0) {
            solutionText.insertAdjacentHTML('beforeend', 'Находим общие множители двух чисел. Он один и равен: 1' + '.<br>');

            solutionText.insertAdjacentHTML('beforeend', 'Получаем ответ. Наибольший общий делитель чисел НОД = 1.');
        }
        solutionText.insertAdjacentHTML('beforeend', '<p style="text-align: center; font-size: 1.5rem;"> 2 способ. Алгоритм Евклида</p>');
        showEvklid(inputValue[0], inputValue[1]);
    }

    // --------------------------------------------------

    // Функция вывода сообщения об ошибке (не введены значения или одно из значений)

    function messageError() {

        msgError.classList.add('message_error_active');
        for (let i = 0; i < inputItems.length; i++) {
            inputItems[i].classList.add('input_error');

        }
    }

    // -------------------------------------------------

    // Функция отмены вывода сообщения об ошибке

    function deleteMessageError() {
        msgError.classList.remove('message_error_active');
        for (let i = 0; i < inputValue.length; i++) {
            inputItems[i].classList.remove('input_error');

        }

    }

    // -------------------------------------------------

});
