document.addEventListener("DOMContentLoaded", function() {

	// Custom JS
	const menu = document.querySelector('.opacity-nav');

	const header = document.querySelector('.header');

	const openMenu = document.querySelector('.open-menu'),
		closeMneu = document.querySelector('.close-menu');
	console.log(openMenu.offsetParent);

	openMenu.addEventListener('click', (e) => {
		const target = e.target;

		menu.classList.add('active');
		target.offsetParent.classList.remove('active');
		closeMneu.parentElement.classList.add('active');

	})

	closeMneu.addEventListener('click', (e) => {
		const target = e.target;

		menu.classList.remove('active');
		target.offsetParent.classList.remove('active');
		openMenu.parentElement.classList.add('active');

	})

});
