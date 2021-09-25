window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let hamburger = document.querySelector('.hamburger'),
        aside = document.querySelector('.aside');
    hamburger.addEventListener("click", function () {
        aside.classList.toggle("aside_active");
        hamburger.classList.toggle("hamburger_active");
    });
});