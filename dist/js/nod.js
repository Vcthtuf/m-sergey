window.addEventListener('DOMContentLoaded', function () {

    'use strict';

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
                    // target.classList.add('active');
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

    hideTabContent(1);
    tabs[0].classList.add('active');

    function showTabContent(b) {                        // функция показа контента
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
            tabs[b].classList.add('active');

        }
    }

    // ---------------------------------------------

    // Расчет НОД 

    let inputValue = [],
        inputItems = document.querySelectorAll('.solution_input > input'),
        calcBtn = document.querySelector('.calc'),
        inputResult = document.querySelector('.solution_result > input');

    let appData = {
        result: 0,
        inputValue: []
    };

    let nod = function (a, b) {
        if (!b) {
            return a;
        }
        return nod(b, a % b);
    }

    appData.result = nod(inputItems[0].value, inputItems[1].value);

    calcBtn.addEventListener('click', function () {

        for (let i = 0; i < inputItems.length; i++) {
            inputValue[i] = +inputItems[i].value;
            appData.inputValue.push(inputValue[i]);
        }
        // inputResult.value = nod(...inputValue);

        appData.result = nod(...inputValue);
        inputResult.value = appData.result;

        for (let i = 0; i < appData.inputValue.length; i++) {
            appData.simpleFactor = {};
            appData.simpleFactor[i] = fact(inputValue[i]);
        }
        console.log(appData);
    });

    // ------------------------------------------------

    // функция разложения на простые множители

    function fact(number) {
        let b = 2,
            simpleNumbers = [];
        while (number > b) {
            while (number % b == 0) {
                number /= b;
                simpleNumbers.push(+b);
            }
            b++;
            if (number == b) {
                simpleNumbers.push(+b);
            }
        }
        return simpleNumbers;
    };

    // разложение на простые множители чисел


    for (let i = 0; i < appData.inputValue.length; i++) {
        appData.simpleFactor = {};
        appData.simpleFactor = fact(inputValue[i]);
    }
    console.log(appData);
    // ----------------------------------

    // Вывод решения



    let solutionText = document.querySelector('.solution_text'),
        solutionBtn = document.querySelector('.solution_btn');

    solutionBtn.addEventListener('click', function () {
        solutionText.textContent = '';
        solutionText.insertAdjacentHTML('afterbegin', '<h3 style="text-align: center"> Решение </h3>');
        solutionText.insertAdjacentHTML('beforeend', `Найти НОД чисел: ${inputValue[0]} и ${inputValue[1]} <br>`);
        for (let i = 0; i < inputValue.length; i++) {
            solutionText.insertAdjacentHTML('beforeend', `Раскладываем число ${inputValue[i]} на простые множители:  <br>`);

            let simpleNum = [];
            simpleNum = fact(inputValue[i]);
            solutionText.insertAdjacentHTML('beforeend', `${inputValue[i]} = ${simpleNum.join('&middot;')} <br>`);

        }

        solutionText.insertAdjacentHTML('beforeend', 'Находим общие множители двух чисел:');




    });


});