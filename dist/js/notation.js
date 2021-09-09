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




    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Перевести", вывода результата и очистка решения

        let input = inputNumber.value,
            notationIn = +notationInput.value,
            notationOut = +notationOutput.value;

        inputResult.textContent = '';

        // console.log('Входное число: ' + +inputNumber.value);
        // console.log('Система счисления входного числа: ' + +notationInput.value);
        // console.log('Система счисления результата: ' + +notationOutput.value);



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
        inputResult.insertAdjacentHTML('beforeend', `${input} <sub>${notationIn}</sub> = ${appData.result.toUpperCase()} <sub>${notationOut}</sub>`);
        solutionText.textContent = '';
    });

    // ------------------------------------------------



    // Перевод в другую систему счисления

    let solutionText = document.querySelector('.solution_text'),
        solutionBtn = document.querySelector('.solution_btn');

    function convertNotation(num, notationOut, notationIn) {     // функция перевода в другую систему счисления

        let numberToTen = parseInt(num, notationIn);
        // console.log(num);
        // console.log(numberToTen);
        // console.log(notationOut);
        let output = numberToTen.toString(notationOut);

        return output;
    };

    // Вывод решения


    solutionBtn.addEventListener('click', function () {

        let input = +inputNumber.value,
            notationIn = +notationInput.value,
            notationOut = +notationOutput.value;

        solutionText.insertAdjacentHTML('beforeend', `Перевести число ${inputNumber.value}<sub>${notationIn}</sub> в ${notationOut}-ю систему счисления. <br>`);

        if (notationIn == 10 && notationOut != 10) {
            calculateFromTen(input, notationIn, notationOut);
        } else if (notationOut == 10 && notationIn != 10) {
            calculateToTen(inputNumber.value, notationIn, notationOut);
        } else if (notationOut != 10 && notationIn != 10) {
            solutionText.insertAdjacentHTML('beforeend', `Сначала переводим число ${inputNumber.value}<sub>${notationInput.value}</sub> в десятичную систему счисления.<br>`);

            calculateToTen(inputNumber.value, notationIn, 10);
            solutionText.insertAdjacentHTML('beforeend', `Затем переводим число ${convertNotation(inputNumber.value, 10, notationIn)}<sub>10</sub> в ${notationOutput.value}-ю систему счисления.<br>`);
            let input = convertNotation(inputNumber.value, 10, notationIn);

            // calculateFromTen(input, 10, notationOut);

            solutionText.insertAdjacentHTML('beforeend', `Последовательно делим число ${input} на ${notationOut}.<br>`);

            while (input > 0) {
                solutionText.insertAdjacentHTML('beforeend', `${input} : ${notationOut} = ${Math.floor(input / notationOut)}, остаток <span style="font-size:1.3rem; color: red; font-weight: bold">${input % notationOut} <br>`);

                input = Math.floor(input / notationOut);

            }

            solutionText.insertAdjacentHTML('beforeend', `${inputNumber.value}<sub>${notationInput.value}</sub> = ${appData.result.toUpperCase()}<sub>${notationOut}.`);

        }








    });

    // --------------------------------------------------

    // функция перевода из десятичной системы

    function calculateFromTen(input, notationIn, notationOut) {

        solutionText.insertAdjacentHTML('beforeend', `Последовательно делим число ${input} на ${notationOut}.<br>`);

        while (input > 0) {
            solutionText.insertAdjacentHTML('beforeend', `${input} : ${notationOut} = ${Math.floor(input / notationOut)}, остаток <span style="font-size:1.3rem; color: red; font-weight: bold">${input % notationOut}</span>`);

            if (input % notationOut > 15) {
                solutionText.insertAdjacentHTML('beforeend', `, <span style="font-size:1.3rem; color: red; font-weight: bold">${input % notationOut} = H </span>`);
            }
            solutionText.insertAdjacentHTML('beforeend', `<br>`);

            input = Math.floor(input / notationOut);

        }

        solutionText.insertAdjacentHTML('beforeend', `<span style="font-weight: bold"> ${inputNumber.value}<sub>${notationIn}</sub> = ${appData.result.toUpperCase()}<sub>${notationOut}</sub></span>`);

    }

    // функция перевода в десятичную систему

    function calculateToTen(inputNumber, notationIn, notationOut) {
        console.log(inputNumber);
        console.log(typeof (inputNumber));
        let input = toString(inputNumber);

        let arr = inputNumber.split('');
        console.log(arr);


        solutionText.insertAdjacentHTML('beforeend', `${inputNumber}<sub>${notationIn}</sub> = `);

        for (let i = 0; i < arr.length - 1; i++) {
            solutionText.insertAdjacentHTML('beforeend', `${arr[i]} &middot; ${notationIn}<sup>${arr.length - 1 - i}</sup> + `);

        }
        solutionText.insertAdjacentHTML('beforeend', `${arr[arr.length - 1]} &middot; ${notationIn}<sup>0</sup> =  ${convertNotation(inputNumber, 10, notationIn)}<sub>${notationOut}. <br>`);

        solutionText.insertAdjacentHTML('beforeend', `${inputNumber}<sub>${notationIn}</sub> = ${convertNotation(inputNumber, 10, notationIn)}<sub>${notationOut}.<br>`);

    }

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

