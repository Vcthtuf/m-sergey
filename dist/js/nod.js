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

    let nod = function (a, b) {
        if (!b) {
            return a;
        }
        return nod(b, a % b);
    }

    calcBtn.addEventListener('click', function () {
        for (let i = 0; i < inputItems.length; i++) {
            inputValue[i] = +inputItems[i].value;
        }
        inputResult.value = nod(...inputValue);
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

    // ----------------------------------

    // функция вывода решения



    let solutionText = document.querySelector('.solution_text'),
        solutionBtn = document.querySelector('.solution_btn');

    solutionBtn.addEventListener('click', function () {
        solutionText.insertAdjacentHTML('afterbegin', '<h3> Решение </h3>');
        for (let i = 0; i <= inputValue.length; i++) {

            solutionText.append(fact(inputValue[i]));
            solutionText.append('<br>');
        }
    });


    // solutionText.append(fact(36));

    console.log(fact(54));
    console.log(inputValue);
    // console.log(simpleNumbers);







});