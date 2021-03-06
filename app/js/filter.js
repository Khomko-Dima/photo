

    const 
        wishlistBtn =document.getElementById('wishlist'),
        wishlistClearBtn =document.getElementById('clear-wishlist'),

        categoryList = document.querySelector('.category-list'),
        imgWrapper = document.querySelector('.img-wrapper'),

        location = document.querySelector('.location'),
        locationList = document.querySelector('.location-list'),

        typeLocation = document.querySelector('.typeLocation'),
        typeLocationList = document.querySelector('.typeLocation-list'),

        season = document.querySelector('.season'),
        seasonList = document.querySelector('.season-list');


    let categoryChose, locationChose, typeLocationChose, seasonChose = null;
    const wishlist = [];

    
    // Генерация карточек
	const createCard = (category, img, location, season, typeLocation, _id) => {
        const card = document.createElement('div');
        
        let tagsList = [];
        const tags = [category, location, typeLocation, season];
        
        tags.forEach((elem, i) => {
            let listElement = '';
            elem.forEach((el, i, arr) => {
                listElement += `${el}${i+1 == arr.length ? '' : ', '}`;
            });
            tagsList[i] = listElement;
        });
        const link = 'https://filter-cc17.restdb.io/media/';

		card.className = 'card-wrapper col-12 col-md-6 col-lg-4';
        card.innerHTML = `
                        <div class="card">
                            <div class="card-img">
                                <img class="img-responsive" src="${link + img}" >
                                <div 
                                    class="card-wishlist ${wishlist.includes(_id) ? 'active' : ''}"
                                    data-img-id="${_id}"></div>
                            </div>
                            <div class="card-desc">
                            ${tagsList[0] ? `<span>Категории: ${tagsList[0]}</span><br>` : ''}
                            ${tagsList[1] ? `<span>Локация: ${tagsList[1]}</span><br>` : ''}
                            ${tagsList[2] ? `<span>Тип локация: ${tagsList[2]}</span><br>` : ''}
                            ${tagsList[3] ? `<span>Сезон: ${tagsList[3]}</span>` : ''}
                            </div>                            
                        </div>`;
		return card;
    };
    
    // рендеры карточек
	const renderCard = (items) =>{
		imgWrapper.textContent = '';
		if (items.length) {
			items.forEach(({ category, img, location, season, typeLocation, _id }) => {
				imgWrapper.appendChild(createCard(category, img, location, season, typeLocation, _id));
			})
		} else {
			imgWrapper.textContent = 'Извените мы не нашли изображение по вашему запросу';
		}	
    };

    //работа с хранилищем
    const storageQuery = (get) => {
		if (get) {
			if (localStorage.getItem('whishlist')) {
				wishlist.push(...JSON.parse(localStorage.getItem('whishlist')));
			}
		} else {
			localStorage.setItem('whishlist', JSON.stringify(wishlist));
		}
	};

    //фильтры
    const showWishlist = (e) => {
        const target = e.target;
        hideOllList([location, typeLocation, season]);
        const elementsList = [...(categoryList.getElementsByTagName('a'))];
        resetStyle(elementsList);

        if(wishlist.length) {
            wishlistClearBtn.classList.add('active');
        }

		getImg(renderCard, img => img.filter(item => wishlist.includes(item._id)));
	};
    
    //рендеры списков
    const showList = (list) => {
        list.classList.add('active');
    }
    const hideList = (list) => {
        list.classList.remove('active');

        const elementsList = [...(list.getElementsByTagName('a'))];
        resetStyle(elementsList)
    }
    const hideOllList = (lists) => {
        lists.forEach(el => {
            const elementsList = [...(el.getElementsByTagName('a'))];

            resetStyle(elementsList)
            if (el.classList.contains('active')) {
                el.classList.remove('active');
            }
        })
    }

    const resetStyle = (elementsList, target) => {
        elementsList.forEach(el => {
            if (el.classList.contains('active')) {
                el.classList.remove('active');
            }
            if (target) {
                target.classList.add('active');
            }
            
        })
    };

    //обработчики событий
    
    const toogleWhishList = (id, elem) => {
		if (wishlist.includes(id)) { //проверка или есть в массиве
			wishlist.splice(wishlist.indexOf(id), 1);
			elem.classList.remove('active');
		} else {
			wishlist.push(id);
			elem.classList.add('active');
        }
		storageQuery();
	};

    const choiceCategory = (e) => {
		e.preventDefault();
		const target = e.target;
		
		if (target.classList.contains('category-item')) {
            categoryChose = target.dataset.category;

            hideOllList([location, typeLocation, season]);
            
            const elementsList = [...(categoryList.getElementsByTagName('a'))];
            resetStyle(elementsList, target)

            getImg(renderCard, (img) => img.filter((item) => item.category.includes(categoryChose)));

            showList(location);
        }
    };

    const choiceLocationList = (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('category-item')) {
            locationChose = target.dataset.category;

            hideOllList([typeLocation, season]);
            
            const elementsList = [...(locationList.getElementsByTagName('a'))];
            resetStyle(elementsList, target)
            
            getImg(renderCard, 
                (img) => img.filter((item) => (item.location.includes(locationChose) && item.category.includes(categoryChose))));
            
            if (target.dataset.category == 'Уличная') {
                showList(typeLocation);
            }
                
        }
    }

    const choiceTypeLocationList = (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('category-item')) {
            typeLocationChose = target.dataset.category;

            hideList(season);
            
            const elementsList = [...(typeLocationList.getElementsByTagName('a'))];
            resetStyle(elementsList, target)
            
            getImg(renderCard, 
                (img) => img.filter((item) => (
                    item.category.includes(categoryChose) &&
                    item.location.includes(locationChose) &&
                    item.typeLocation.includes(typeLocationChose) )));
            
            showList(season);
        }
    }

    const choiceSeasonList = (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.classList.contains('category-item')) {
            seasonChose = target.dataset.category;
            
            const elementsList = [...(seasonList.getElementsByTagName('a'))];
            resetStyle(elementsList, target)
            
            getImg(renderCard, 
                (img) => img.filter((item) => (
                    item.category.includes(categoryChose) &&
                    item.location.includes(locationChose) &&
                    item.typeLocation.includes(typeLocationChose) && 
                    item.season.includes(seasonChose))));
            
        }
    }

    const handlerBasket = (e) => {
        const target = e.target;
		if (target.classList.contains('card-wishlist')) {
			toogleWhishList(target.dataset.imgId, target);
		}
    };
    
    const clearStoranje = (e) => {
        const target = e.target;
        imgWrapper.textContent = 'Изображения удалены';
        hideOllList([location, typeLocation, season]);
        wishlist.splice(0, wishlist.length);
        localStorage.removeItem('whishlist');
        storageQuery(true);
        if(wishlistClearBtn.classList.contains('active')) {
            wishlistClearBtn.classList.remove('active');
        }
    }

    
    //иницилизация
    
        storageQuery(true);
        categoryList.addEventListener('click', choiceCategory);
        locationList.addEventListener('click', choiceLocationList);
        typeLocationList.addEventListener('click', choiceTypeLocationList);
        seasonList.addEventListener('click', choiceSeasonList);
        wishlistBtn.addEventListener('click', showWishlist);
        imgWrapper.addEventListener('click', handlerBasket);
        wishlistClearBtn.addEventListener('click', clearStoranje);
    
    

