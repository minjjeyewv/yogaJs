window.addEventListener('DOMContentLoaded',function(){
    'use strict';
    let info = document.querySelector('.info-header');
    let tab = document.querySelectorAll('.info-header-tab');
    let tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) =>{
        for (let i = a; i<tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }
    hideTabContent(1);
    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
    info.addEventListener('click', function(event){
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i<tab.length; i++){
                if (target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    })
    // Timer 
    let deadline = '2021-10-25';
    let getTimeRemaing = (endtime) =>{
        let t = Date.parse(endtime) - Date.parse(new Date());
        let seconds = Math.floor((t/1000)%60);
        let minutes = Math.floor((t/1000/60)%60);
        let hours = Math.floor((t/1000/60/60));
        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds 
        }
    }
    let setClock = (id, endtime) => {
        let timer = document.getElementById(id);
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(function(){
            setInterval(updateClock, 1000);
        });
    
    let updateClock = () => {
        let t = getTimeRemaing(endtime);
        hours.textContent = t.hours;
        minutes.textContent = t.minutes;
        seconds.textContent = t.seconds;
        if (t.total<=0){
            clearInterval(timeInterval);
        }

    }
    }
    setClock('timer', deadline);
    // Modal
    let overlay = document.querySelector('.overlay');
    let more = document.querySelector('.more');
    let close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function(){
        this.classList.add('more-splash');
        overlay.style.display = 'block';
    });
    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');

    })

    //Post
    let form = document.querySelector('.main-form');
    let input = form.getElementsByTagName('input');
    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');

    let message = {
        success: "Спасибо! Скоро мы с вами свяжемся.",
        loading: "Загрузка...",
        failed: "Что-то пошло не так..."
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        
        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function(value, key){
            obj[key] = value;
        });
        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4){
                statusMessage.textContent = message.loading;
            }
            else if (request.readyState === 4 && request.status === 200){
                statusMessage.textContent = message.success;
            }
            else statusMessage.textContent = message.failed;
        });
        for (let i = 0; i<input.length; i++){
            input[i].value = '';
        }
            
        
    });
    // Slider
    let slideIndex = 0,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');
    showSlides(slideIndex);
    function showSlides(n){
        if (n > slides.length - 1) {
            slideIndex = 0
        }
        if (n < 0){
            slideIndex = slides.length - 1
        }
        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex].style.display = 'block';
        dots[slideIndex].classList.add('dot-active');
    };
    function plusSlides(n){
        showSlides(slideIndex+=n);
    }
    next.addEventListener('click', () => {
        plusSlides(1);
    });
    prev.addEventListener('click', () => {
        plusSlides(-1);
    })
    function currentSlide(n){
        showSlides(slideIndex = n);
    }
    dotsWrap.addEventListener('click', (event) => {
        for (let i = 0; i < dots.length; i++){
            if (event.target === dots[i]){
                currentSlide(i);
            }
        }
    });

    // Calc
    let persons = document.querySelectorAll('.counter-block-input')[0],
        days = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daySum = 0,
        total = 0;

        totalValue.textContent = 0;
        persons.addEventListener('input', function() {
            personSum = +this.value;
            total = (daySum + personSum)*4000;
            if (persons.value =='' || days.value ==''){
                totalValue.textContent = 0;
            }
            else{
                totalValue.textContent = total;
            }
        });
        days.addEventListener('input', function() {
            daySum = +this.value;
            total = (daySum + personSum)*4000;
            if (persons.value =='' || days.value ==''){
                totalValue.textContent = 0;
            }
            else{
                totalValue.textContent = total;
            }
            place.addEventListener('change', function(){
                if (totalValue.textContent != 0){
                    totalValue.textContent = total * this.options[this.selectedIndex].value;
                }
            });
        });
})