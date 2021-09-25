window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Подсветка меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(2);                              // делаем активной третью ссылку

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

    // Расчет НОК 

    let inputValue = [],      // массив входных чисел
        blockInput = document.querySelector('.solution_input'),
        inputItems = document.querySelectorAll('.solution_input > input'),
        calcBtn = document.querySelector('.calc'),
        inputResult = document.querySelector('.solution_result > input'),
        nok = 1,
        nod = 1;

    let msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных

    let appData = {    // объект для хранения данных
        inputValue: [],
        resultNok: 1
    };

    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        appData.resultNok = 1;
        appData.inputValue = [];
        nod = 1;
        multiply_1 = [];
        multiply_2 = [];
        nok = 1;
        deleteMessageError();
    });

    function calcNod(a, b) {                     // функция нахождения НОД
        if (!b) {
            return a;
        }
        return nod = calcNod(b, a % b);
    }

    function calcNok(a, b) {                            // функция быстрого вычисления НОK для вывода ответа
        return nok = (a * b) / calcNod(a, b);
    }

    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Рассчитать", вывода результата и очистка решения

        for (let i = 0; i < inputItems.length; i++) {
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
        calcNod(...inputValue);
        appData.resultNok = calcNok(...inputValue);
        inputResult.value = appData.resultNok;
        solutionText.textContent = '';
    });

    // ------------------------------------------------

    // Расчет НОК первым способом

    let solutionText = document.querySelector('.solution_text'),
        solutionBtn = document.querySelector('.solution_btn');

    // Вывод решения

    solutionBtn.addEventListener('click', function () {

        for (let i = 0; i < appData.inputValue.length; i++) {
            appData.inputValue[i] = (inputValue[i]);
        }
        NOK(appData.inputValue[0], appData.inputValue[1]);
        solutionText.textContent = '';
        showFirstMethod(appData.inputValue[0], appData.inputValue[1]);
        showSecondMethod(appData.inputValue[0], appData.inputValue[1]);    // вывод решения вторым способом

    });

    // функция нахождения НОК первым способом
    let multiply_1 = [], multiply_2 = [];
    function NOK(a, b) {
        let i = 0, j = 0, nok_1;
        multiply_1[0] = a;
        multiply_2[0] = b;
        while (multiply_1[i] != multiply_2[j]) {
            if (multiply_1[i] > multiply_2[j]) {
                multiply_2.push(b * (j + 2));
                j++;
                // console.log(multiply_2);
            } else {
                multiply_1.push(a * (i + 2));
                i++;

            }
        };
    };

    // функция показа решения первым способом

    function showFirstMethod(a, b) {
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem;">Первый способ решения</h3>`);
        solutionText.insertAdjacentHTML('beforeend', `Найти наименьшее общее кратное чисел: ${appData.inputValue[0]} и ${appData.inputValue[1]}. <br><br>`);
        solutionText.insertAdjacentHTML('beforeend', `Кратные первого числа: ${multiply_1}... <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Кратные второго числа: ${multiply_2}... <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Находим первое совпадение среди кратных обоих чисел. Оно равно ${nok}. <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Наименьшее общее кратное равно ${nok}. <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Ответ: НОК(${inputValue[0]}, ${inputValue[1]}) = ${nok}. <br>`);

    }

    // функция показа решения вторым способом

    function showSecondMethod(a, b) {
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem;">Второй способ решения</h3>`);
        solutionText.insertAdjacentHTML('beforeend', `Найти НОK чисел: ${inputValue[0]} и ${inputValue[1]}. <br><br>`);
        solutionText.insertAdjacentHTML('beforeend', `Умножаем два числа:  ${inputValue[0]} &middot; ${inputValue[1]} = ${a * b}.
        <br>`);
        solutionText.insertAdjacentHTML('beforeend', `<a class='nod' href="nod.html">Наибольший общий делитель</a> чисел ${inputValue[0]} и ${inputValue[1]} равен ${nod}. <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Наименьшее общее кратное равно: ${inputValue[0] * inputValue[1]} / ${nod} = ${nok}. <br>`);
        solutionText.insertAdjacentHTML('beforeend', `Ответ: НОК(${inputValue[0]}, ${inputValue[1]}) = ${nok}. <br>`);
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
        for (let i = 0; i < inputItems.length; i++) {
            inputItems[i].classList.remove('input_error');

        }

    }

    // -------------------------------------------------

});
