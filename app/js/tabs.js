//tabs
let initGalery = false;

const tab = document.querySelectorAll('.info-header-tab'),
    info = document.querySelector('.info-header'),
    tabContent = document.querySelectorAll('.info-tabcontent'),
    main = document.querySelector('.main');

function hideTabContent(a) {
    for (let i = a; i < tabContent.length; i++) {
        tabContent[i].classList.remove('show');
        tabContent[i].classList.add('hide');
    }
    for (let i = a; i < tab.length; i++) {
        tab[i].offsetParent.classList.remove('active');
    }
    
};

hideTabContent(1);

function showTabContent(b, target) {
    if (tabContent[b].classList.contains('hide')) {
        tabContent[b].classList.remove('hide');
        tabContent[b].classList.add('show');
    }
    tab[b].offsetParent.classList.add('active');
    remuvStyle();
    if (target && target.classList.contains('review-show') && !initGalery) {
        $('.review-list').slick({
            centerMode: true,
            centerPadding: '60px',
            slidesToShow: 3,
            focusOnSelect: true,
            dots: true,
            arrows: true,
            responsive: [
                {
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 2
                }
                },
                {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
                }
            ]
        });
        initGalery = true;
    }
    if (tab[b] !== tab[0]) {
        main.classList.add('active');
    } else {
        if (main.classList.contains('active')) {
            main.classList.remove('active');
        }
    }
    
}

info.addEventListener('click', function(event) {
    event.preventDefault();
    let target = event.target;
    if (target && target.classList.contains('info-header-tab')) {
        for(let i = 0; i < tab.length; i++) {
            if (target == tab[i]) {
                hideTabContent(0);
                showTabContent(i, target);
                break;
            }
        }
    }
    if (sectionPost.classList.contains('active')) {
        sectionPost.classList.remove('active');
    }
});


