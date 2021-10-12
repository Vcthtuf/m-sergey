window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    // Подсветка меню 

    let menuItems = document.querySelectorAll('.menu');

    linkActive(5);                              // делаем активной шестую ссылку

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
    };

    function showTabContent(b) {                        // функция показа контента
        for (let i = 0; i < tabContent.length; i++) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
            tabs[b].classList.add('tab_active');
        }
    };

    // ---------------------------------------------

    // Расчет комплексных чисел 

    let inputValue = [],      // массив входных чисел
        blockInput = document.querySelector('.solution_input'),
        inputItemsReal = document.querySelectorAll('.real'),  // массив действительных частей
        inputItemsIm = document.querySelectorAll('.im'), // массив мнимых частей
        calcBtn = document.querySelector('.calc'),
        outputResult = document.querySelector('.solution_result > input'),
        solutionBtn = document.querySelector('.solution_btn'),
        solutionText = document.querySelector('.solution_text'),
        msgError = document.querySelector('.message_error'); // сообщение об ошибке ввода данных

    let inputSign,
        outputValueReal = 0,
        outputValueIm = 0,
        a, b, c, d, signIm;

    blockInput.addEventListener('click', function (event) {  // скрытие значений input и очистка данных при клике 
        let target = event.target;
        target.setAttribute('placeholder', '');
        target.value = '';
        outputValueReal = 0;
        outputValueIm = 0;
        // deleteMessageError();
    });


    calcBtn.addEventListener('click', function () {  // обработка клика по кнопке "Рассчитать", вывода результата и очистка решения
        solutionText.textContent = '';   // очистка предыдущего решения
        a = +inputItemsReal[0].value;
        b = +inputItemsIm[0].value;
        c = +inputItemsReal[1].value;
        d = +inputItemsIm[1].value;

        sign();

        console.log(inputSign);

        switch (inputSign) {
            case "+":
                outputValueReal = a + c;
                outputValueIm = b + d;
                break;
            case "-":
                outputValueReal = a - c;
                outputValueIm = b - d;
                break;
            case "*":
                outputValueReal = a * c - b * d;
                outputValueIm = a * d + b * c;
                break;
            case ":":
                outputValueReal = (a * c + b * d) / (c * c + d * d);
                outputValueIm = (b * c - a * d) / (c * c + d * d);
                break;
            default:
                break;
        }

        console.log(inputSign);
        console.log("Результат действительного числа " + outputValueReal);
        console.log("Результат мнимого числа " + outputValueIm);
        signIm = "+";
        if (outputValueIm < 0) { signIm = "-"; outputValueIm = -outputValueIm; }

        outputResult.value = ` ${outputValueReal} ${signIm} ${outputValueIm}i`;

        return a, b, c, d, inputSign;
    });

    // -----------------------------------------------

    // функция выбора знака действия с комплексными числами

    function sign() {
        let selectHead = document.querySelector('.select__head');
        inputSign = selectHead.textContent;
        console.log(inputSign);

        switch (inputSign) {
            case "+":
                outputValueReal = a + c;
                outputValueIm = b + d;
                break;
            case "-":
                outputValueReal = a - c;
                outputValueIm = b - d;
                break;
            case "*":
                outputValueReal = a * c - b * d;
                outputValueIm = a * d + b * c;
                break;
            case "/":
                outputValueReal = Math.floor(((a * c + b * d) / (c * c + d * d)) * 1000) / 1000;
                outputValueIm = Math.floor(((b * c - a * d) / (c * c + d * d)) * 1000) / 1000;
                break;
            default:
                break;
        }
    }

    // ------------------------------------------------

    // Вывод решения

    solutionBtn.addEventListener('click', function () {

        solutionText.textContent = '';   // очистка предыдущего решения

        solutionText.insertAdjacentHTML('afterbegin', '<h3 style="text-align: center; margin-bottom: 1rem;"> Решение </h3>');
        let signText_1, signText_2;
        switch (inputSign) {
            case "+":
                signText_1 = "Число";
                signText_2 = "сложить с числом";
                break;
            case "-":
                signText_1 = "Из числа";
                signText_2 = "вычесть число";
                break;
            case "*":
                signText_1 = "Число";
                signText_2 = "умножить на число";
                break;
            case "/":
                signText_1 = "Число";
                signText_2 = "разделить на число";
                break;
            default:
                break;
        }

        let b_common = b, signB_common = "+", d_common = d, signD_common = "+";

        if (b < 0) { b_common = -b; signB_common = "-" };
        if (d < 0) { d_common = -d; signD_common = "-" };
        if (inputSign == "*") { inputSign = "&middot;" };
        if (inputSign == "/") { inputSign = "/" };

        solutionText.insertAdjacentHTML('beforeend', `${signText_1} (${a} ${signB_common} ${b_common}i) ${signText_2} (${c} ${signD_common} ${d_common}i) <br>`);
        solutionText.insertAdjacentHTML('beforeend', `(${a} ${signB_common} ${b_common}i) ${inputSign} (${c} ${signD_common} ${d_common}i) = `);

        switch (inputSign) {
            case "+":
                textAdd();
                break;
            case "-":
                textSubtraction();
                break;
            case "&middot;":
                textMultiply();
                break;
            case "/":
                textDivide();
                break;
            default:
                break;
        }
    });

    // --------------------------------------------------

    // функция вывода решения при сложении

    function textAdd() {
        let signC = "+",
            signD = "+";

        if (c < 0) { c = -c; signC = "-" };
        if (d < 0) { d = -d; signD = "-" };

        solutionText.insertAdjacentHTML('beforeend', `(${a} ${signC} ${c}) + (${b} ${signD} ${d})i = ${outputValueReal} ${signIm} ${outputValueIm}i <br><br>`);
        solutionText.insertAdjacentHTML('beforeend', `Ответ: ${outputValueReal} ${signIm} ${outputValueIm}i`);
    }

    // функция вывода решения при вычитании

    function textSubtraction() {

        let signC = "-",
            signD = "-";

        if (c < 0) { c = -c; signC = "+" };
        if (d < 0) { d = -d; signD = "+" };

        solutionText.insertAdjacentHTML('beforeend', `(${a} ${signC} ${c}) + (${b} ${signD} ${d})i = ${outputValueReal} ${signIm} ${outputValueIm}i <br><br>`);
        solutionText.insertAdjacentHTML('beforeend', `Ответ: ${outputValueReal} ${signIm} ${outputValueIm}i`);
    }

    // функция вывода решения при умножении

    function textMultiply() {

        if (a < 0) { a = `(${a})` };
        if (b < 0) { b = `(${b})` };

        if (c < 0) { c = `(${c})` };
        if (d < 0) { d = `(${d})` };

        solutionText.insertAdjacentHTML('beforeend', `${a} &middot; ${c} + ${b}i &middot; ${c} + ${a} &middot;  ${d}i - ${b} &middot; ${d} = ${outputValueReal} ${signIm} ${outputValueIm}i <br><br>`);
        solutionText.insertAdjacentHTML('beforeend', `Ответ: ${outputValueReal} ${signIm} ${outputValueIm}i`);
    }

    // функция вывода решения при делении

    function textDivide() {

        let b_common = b, signB_common = "+", d_common = d, signD_common = "+", signD_commonNeg = "-";

        if (a < 0) { a = `(${a})` };
        if (b < 0) { b = `(${b})` };

        if (c < 0) { c = `(${c})` };
        if (d < 0) { d = `(${d})` };

        if (a < 0) { a = `(${a})`; };
        if (b < 0) { b = `(${b})`; };

        if (c < 0) { c = `(${c})`; };
        if (d < 0) { d = `(${d})`; };

        if (b < 0) { b_common = -b; signB_common = "-"; };
        if (d < 0) { d_common = -d; signD_common = "-"; signD_commonNeg = "+"; };
        // if (inputSign == "*") { inputSign = "&middot;" };
        // if (inputSign == ":") { inputSign = "/" };
        console.log(typeof (c));

        solutionText.insertAdjacentHTML('beforeend', `(${a} ${signB_common} ${b_common}i)&middot;(${c} ${signD_commonNeg} ${d_common}i) / (${c} ${signD_common} ${d_common}i)&middot;(${c} ${signD_commonNeg} ${d_common}i) = <br>`);
        solutionText.insertAdjacentHTML('beforeend', `(${a} &middot; ${c} + ${b}i &middot; ${c} + ${a} &middot;  ${d}i - ${b} &middot; ${d}) = <br>`);


        solutionText.insertAdjacentHTML('beforeend', `Ответ: ${outputValueReal} ${signIm} ${outputValueIm}i`);
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

    // function deleteMessageError() {
    //     msgError.classList.remove('message_error_active');
    //     for (let i = 0; i < inputItems.length; i++) {
    //         inputItems[i].classList.remove('input_error');
    //     }
    // }

    // -------------------------------------------------

    // Выпадающий список

    jQuery(($) => {
        $('.select').on('click', '.select__head', function () {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).next().fadeOut();
            } else {
                $('.select__head').removeClass('open');
                $('.select__list').fadeOut();
                $(this).addClass('open');
                $(this).next().fadeIn();
            }
        });

        $('.select').on('click', '.select__item', function () {
            $('.select__head').removeClass('open');
            $(this).parent().fadeOut();
            $(this).parent().prev().text($(this).text());
            $(this).parent().prev().prev().val($(this).text());
        });

        $(document).click(function (e) {
            if (!$(e.target).closest('.select').length) {
                $('.select__head').removeClass('open');
                $('.select__list').fadeOut();
            }
        });
    });
});
