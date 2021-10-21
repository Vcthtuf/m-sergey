window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    let hamburger = document.querySelector('.hamburger'),
        aside = document.querySelector('.aside');

    hamburger.addEventListener('click', function() {
        aside.classList.toggle("aside_active");
        hamburger.classList.toggle("hamburger_active");
    });

    window.addEventListener('click', e => { // при клике в любом месте окна браузера
    const target = e.target // находим элемент, на котором был клик
    if (!target.closest('.hamburger') && !target.closest('.aside')) { // если этот элемент или его родительские элементы не окно навигации и не кнопка
      asidePassive();
    }
  })

    function asideActive() {
        aside.classList.add("aside_active");
        hamburger.classList.add("hamburger_active");
    }

    function asidePassive() {
        aside.classList.remove("aside_active");
        hamburger.classList.remove("hamburger_active");
    }
    



 
});