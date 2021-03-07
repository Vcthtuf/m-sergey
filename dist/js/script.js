'use strict';

let money, time;

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget_value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget_value')[0],
    expensesValue = document.getElementsByClassName('expenses_value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses_value')[0],
    incomeValue = document.getElementsByClassName('income_value')[0],
    monthSaving = document.getElementsByClassName('monthsaving_value')[0],
    yearSaving = document.getElementsByClassName('yearsaving_value')[0],
    countButton = document.getElementsByClassName('countbudget_btn')[0],

    expensesItem = document.getElementsByClassName('expenses_item'),
    button = document.getElementsByTagName('button'),
    buttonExpensesApprove = document.getElementsByClassName('expenses_btn')[0],
    buttonOptexpensesApprove = document.getElementsByClassName('optexpenses_btn')[0],
    buttonCountbudgetCalc = button[2],
    optExpensesItem = document.querySelectorAll('.optexpenses_item'),
    income = document.querySelector('.income_label'),
    savingCheck = document.querySelector('.saving_btn'),
    savingSum = document.querySelector('.saving_sum > input'),
    savingPercent = document.querySelector('.saving_percent > input'),
    yearValue = document.querySelector('.year_value'),
    monthValue = document.querySelector('.month_value'),
    dayValue = document.querySelector('.day_value');

startBtn.addEventListener('click', function () {
    countButton.removeAttribute('disabled', 'none');
    buttonOptexpensesApprove.removeAttribute('disabled', 'none');
    buttonExpensesApprove.removeAttribute('disabled', 'none');

    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    while (isNaN(money) || money == '' || money == null) {
        money = +prompt('Ваш бюджет на месяц?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = appData.budget;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

buttonExpensesApprove.addEventListener('click', function () {
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value;
        let b = expensesItem[++i].value;

        if ((typeof (a)) == 'string' && (typeof (a)) != null && (typeof (b)) != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

buttonOptexpensesApprove.addEventListener('click', function () {
    console.log(optExpensesItem.length);
    for (let i = 0; i < optExpensesItem.length; i++) {
        let opt = optExpensesItem[i].value;
        console.log(opt);
        if ((typeof (opt)) == 'string' && (typeof (opt)) != null && opt != '' && opt.length < 50) {

            appData.optionalExpenses[i] = opt;
            optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
        } else {
            i--;
        }
    }
});

countButton.addEventListener('click', function () {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget / 30) - +expensesValue.textContent).toFixed(2);
        dayBudgetValue.textContent = appData.moneyPerDay;
    }
    else {
        dayBudgetValue.textContent = 'Произошла ошибка';
    }
});

income.addEventListener('input', function () {
    let items = income.value;
    if (typeof (items) == 'string' && typeof (items) != null && items != '') {
        appData.income = items.split(', ');
        incomeValue.textContent = appData.income;
    }
});

savingCheck.addEventListener('click', function () {
    if (appData.savings) {
        appData.savings = false;
    } else { appData.savings = true; }
});

savingSum.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +savingSum.value,
            percent = +savingPercent.value;
        appData.monthIncome = (sum * percent / 1200).toFixed(2);
        appData.yearIncome = (sum * percent / 100).toFixed(2);
        monthSaving.textContent = appData.monthIncome;
        yearSaving.textContent = appData.yearIncome;
    }

});

savingPercent.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +savingSum.value,
            percent = +savingPercent.value;
        appData.monthIncome = (sum * percent / 1200).toFixed(2);
        appData.yearIncome = (sum * percent / 100).toFixed(2);
        monthSaving.textContent = appData.monthIncome;
        yearSaving.textContent = appData.yearIncome;
    }
});

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};




// animateBtn.addEventListener('click', function () {
//     animateBox.classList.toggle('animate_active');
// });

window.addEventListener('DOMContentLoaded', function () {


    // let position = 0,
    //     animateBtn = document.querySelector('.animate_btn'),
    //     animateBox = document.querySelector('.animate');

    // console.log(document.animateBox);

    // animateBtn.addEventListener('click', function () {
    //     if (position == 0) {
    //         animate();
    //     } else if (position == 80) {
    //         animateReverse();
    //     }

    //     // animateBtn.classList.toggle('animate_btn_active');

    // });

    let btnBlock = document.querySelector('.expenses'),
        buttons = document.getElementsByClassName('expenses_item');

    btnBlock.addEventListener('click', function (event) {
        let input = event.target;
        if (event.target && event.target.matches('.expenses_item')) {
            input.setAttribute('placeholder', '');
        }
    });


    // animateBtn.addEventListener('mousedown', function () {
    //     animate();
    //     animateBtn.classList.toggle('animate_btn_active');
    // });

    function animate() {
        let id = setInterval(frame, 10);
        function frame() {
            if (position == 80) {
                clearInterval(id);
            } else {
                position++;
                animateBox.style.left = position + '%';
                // animateBox.style.top = position + '%';
            }
        }
    }

    function animateReverse() {
        let id = setInterval(frame, 10);
        function frame() {
            if (position == 0) {
                clearInterval(id);
            } else {
                position--;
                animateBox.style.left = position + '%';
                // animateBox.style.top = position + '%';
            }
        }
    }

});






// let timerId = setTimeout(function sayHello() {
//     console.log('Hello!!!');
//     setTimeout(sayHello, 3000);


// })

// clearTimeout(timerId);








