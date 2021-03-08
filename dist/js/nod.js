window.addEventListener('DOMContentLoaded', function () {

    'use strict'

    let blockInput = document.querySelector('.solution_input'),
        input = document.querySelectorAll('.solution_input > input');
    console.log(input);

    blockInput.addEventListener('click', function (event) {
        let target = event.target;
        console.log(event.target);
        target.setAttribute('placeholder', '');
    });


});