$(document).ready(function () {

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

    // Разложение на простые множители

    let inputValue = document.querySelector('.solution_input > input'),      // входное число
        blockInput = document.querySelector('.solution_input'),
        calcBtn = document.querySelector('.calc'),
        inputResult = document.querySelector('.solution_result > input'),
        solutionBtn = document.querySelector('.solution_btn'),
        solutionText = document.querySelector('.solution_text'),
        simpleNumbers = [];



    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        dividedYes = [];
        dividedNo = [];
    });

    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Разложить", вывода результата и очистка решения
        getSimpleFactors(inputValue.value);
        inputResult.value = `${inputValue.value} = ${simpleNumbers.join(' * ')}`;
        solutionText.textContent = '';
    });

    // ------------------------------------------------
    let dividedYes = [], dividedNo = [];
    function getSimpleFactors(n) {  // функция вычисления проcтых множителей числа
        simpleNumbers = [];


        function isPrime(n) {             // функция проверки на простое число

            for (let i = 2; i <= Math.sqrt(n); i++) {
                if (n % i === 0) {
                    return false;
                }
            }

            return true;
        }


        function checkDivided(n, i) {         // функция проверки на делимость

            if (n % i === 0) {
                dividedYes.push(i);
                return true;
            } else {
                dividedNo.push(i);
                return false
            }
        }
        // let i = 2;

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

    // Вывод решения

    solutionBtn.addEventListener('click', function () {

        for (let i = 0; i < inputValue.value; i++) {

            solutionText.textContent = '';
            showSolution(inputValue.value);         // вывод решения
        }

        console.log(dividedYes);
        console.log(dividedNo);

        solutionText.textContent = '';
        showSolution(inputValue.value);
    });

    // функция разложения на простые множители с промежуточными результатами

    // let multiply_1 = [], multiply_2 = [];
    // function NOK(a, b) {
    //     let i = 0, j = 0, nok_1;
    //     multiply_1[0] = a;
    //     multiply_2[0] = b;
    //     while (multiply_1[i] != multiply_2[j]) {
    //         if (multiply_1[i] > multiply_2[j]) {
    //             multiply_2.push(b * (j + 2));
    //             j++;
    //             // console.log(multiply_2);
    //         } else {
    //             multiply_1.push(a * (i + 2));
    //             i++;

    //         }
    //     };
    // };

    // функция показа решения

    function showSolution(n) {
        solutionText.insertAdjacentHTML('beforeend', `<h3 style="margin-bottom: 1rem;">Разложение на простые множители</h3>`);
        solutionText.insertAdjacentHTML('beforeend', `Разложить на простые множители число ${n}. <br><br>`);
        // solutionText.insertAdjacentHTML('beforeend', `Кратные первого числа: ${multiply_1}... <br>`);
        // solutionText.insertAdjacentHTML('beforeend', `Кратные второго числа: ${multiply_2}... <br>`);
        // solutionText.insertAdjacentHTML('beforeend', `Находим первое совпадение среди кратных обоих чисел. Оно равно ${nok}. <br>`);
        // solutionText.insertAdjacentHTML('beforeend', `Наименьшее общее кратное равно ${nok}. <br>`);
        // solutionText.insertAdjacentHTML('beforeend', `Ответ: НОК(${inputValue[0]}, ${inputValue[1]}) = ${nok}. <br>`);

    }

});
