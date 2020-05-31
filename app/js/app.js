document.addEventListener("DOMContentLoaded", function() {

	// Custom JS
	const navBurger = document.querySelector('.navBurger');
	const menu = document.querySelector('.menu');

	navBurger.addEventListener('click', (e) => {
		const target = e.target;
		console.log(target);
		if (target.classList.contains('active')) {
			target.classList.remove('active');
			menu.classList.remove('active');
		} else {
			target.classList.add('active');
			menu.classList.add('active');
		}
		
	})

	//tabs
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
		}
		for (let i = a; i < tab.length; i++) {
            tab[i].classList.remove('active');
        }
    }

    hideTabContent(1);

    function showTabContent(b, target) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
		}
		for (let i = b; i < tab.length; i++) {
            tab[b].classList.add('active');
        }
		if (target && target.classList.contains('review-show')) {
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
	});
	
});
