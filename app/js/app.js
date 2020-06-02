
	const navBurger = document.querySelector('.navBurger');
	const menu = document.querySelector('.menu');

	navBurger.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('active')) {
			target.classList.remove('active');
			menu.classList.remove('active');
		} else {
			target.classList.add('active');
			menu.classList.add('active');
		}
		
	});
	function remuvStyle()  {
		if(navBurger.classList.contains('active') && menu.classList.contains('active')) {
			menu.classList.remove('active');
			navBurger.classList.remove('active');
		}
	};

	//flag
	const maskPhoneBy = () => {
        $("input[name=phone]").mask("+375(99)999-99-99");
    };
    const maskPhoneRu = () => {
        $("input[name=phone]").mask("+7(999)999-9999");
    };
    const maskPhoneUa = () => {
        $("input[name=phone]").mask("+380(999)999-9999");
    };
    maskPhoneBy();

	const flag = document.querySelectorAll('.chose-mask');
	const flagCountry = document.querySelectorAll('.flag');
	const dropdown = document.querySelectorAll('.dropdown');

	const swapFlag = (reg) => {
		flagCountry.forEach(el => {
			el.classList.add(`${reg}`)
		})
	};

	flag.forEach((el, i) => {
		el.addEventListener('click', (e) => {
			const target = e.target;
			if (dropdown[i].classList.contains('active')){
				dropdown[i].classList.remove('active');
			} else dropdown[i].classList.add('active');
		})
	})
	
	dropdown.forEach((el, i) => {
		el.addEventListener('click', (e) => {
			const target = e.target.dataset.country;
			flagCountry[i].className = 'flag';
			if (target == 'by') {
				swapFlag('by');
				el.classList.remove('active');
				maskPhoneBy();
			}
			if (target == 'ru') {
				swapFlag('ru');
				el.classList.remove('active');
				maskPhoneRu();
			}
			if (target == 'ua') {
				swapFlag('ua');
				el.classList.remove('active');
				maskPhoneUa();
			}
		})
	});

	$(document.body).ready(function() {
		$(".preloader").fadeOut("slow");
	});

	const form = document.querySelectorAll('form');

	function submitForm (e, form) {
		e.preventDefault();
		const formData = new FormData(form);

		console.log('data: ', formData);
		axios({
			method: 'post',
			url: '/submit.php',
			data: formData,
			headers: {"content-type": "multipart/form-data"}
		})
		.then(data => console.log(data.data))
	}


	form.forEach(el => el.addEventListener('submit', (e) => {
		submitForm(e, el);
	}));


	
});
