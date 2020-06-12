const 
            html = document.querySelector('html'),
            overlay = document.querySelector('.modal-overlay'), //оверлей фона
            modalMass = [...(document.querySelectorAll('.modal'))], //все модальные окна
            open_modal = document.querySelectorAll('.open_modal'); //все кнопки вызова модального окна
    let modal = null;
    let modalStatus = false;
    

    const modalStatusFunc = (opt = false) => {
        modalStatus = opt;
        if (!modal) return;
        if (!modalStatus) {
            modal.classList.remove('active');
            overlay.classList.remove('active');
            html.classList.remove('modal-is-locked');
            overlay.removeEventListener('click', closeModal);
        } else {
            modal.classList.add('active');
            overlay.classList.add('active');
            html.classList.add('modal-is-locked');
        }
    }

    const closeModal = (e) => { //Закрытие модального окна
        const target = e.target;
        if (target.classList.contains('modal-overlay') || target.closest('.close-modal')) {
            modalStatusFunc();
        }
    };

    const shoyPopup = (modal) => {
        modalStatusFunc(true);
    };

    const creatorPopup = (val) => {
        const opt = val.dataset; //все значения data атрибутов
        const modalContent = modal.querySelector('.modal-content');
        modalContent.querySelector('.modal-title').innerHTML = `<h3>${opt.header}</h3>`;
        modalContent.querySelector('.input-info').innerHTML += `
                                                        <input class="input" 
                                                            name="valToSend" 
                                                            value="${opt.valToSend}" 
                                                            type="hidden">`;
    };

    const createGalery = (val) => {
        const opt = val.dataset;
        const modalContent = modal.querySelector('.modal-content');
        modalContent.innerHTML = '';
        modalContent.innerHTML += `<h3>${opt.header}</h3>`;
        modalContent.innerHTML += `<div class="modal-galery__list">
                                    ${opt.listImg}
                                    </div>`;
        $('.modal-galery__list').lightGallery({
            thumbnail:true,
            download:false,
            share:false
        });
        const modalGalery = modalContent.querySelector('.modal-galery__list');
        const openImg = (e) => {
            e.preventDefault();
            const target = e.target;
            if (target.classList.contains('img-responsive')) {
                modalStatusFunc();
                modalGalery.removeEventListener('click', openImg);
            }
        }
        modalGalery.addEventListener('click', openImg)
    }

    const openModal = (e) => {
        const target = e.target;
        const dataAction = target.dataset.action; // дата атрибут элемента по каторому нажали
        modal = modalMass.filter(el => el.dataset.target == dataAction)[0];// получение модального окна со значением равному data-target
        shoyPopup(modal); // ф. открывает попап.
        if (dataAction === 'first') {
            creatorPopup(target);
        }
        if (dataAction === 'second') {
            creatorPopup(target)
        }
        if (dataAction === 'galery') {
            createGalery(target);
        }
        overlay.addEventListener('click', closeModal);
    };

    open_modal.forEach((el) => el.addEventListener('click', openModal));