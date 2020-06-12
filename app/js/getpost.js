
    const 
        sectionPost = document.querySelector('.post'),
        portfolioContainer = document.querySelector('.portfolio-container');

    // Генерация поста
    const createPost = (name, content, images, _id) => {
        const post = document.createElement('article');
        
        let imageList = '';
        const link = 'https://posts-8609.restdb.io/media/';

        images.forEach(el => {
            const image = `<a class="post-images__item" 
                            href="${link + el}">
                                <img src="${link + el}" class="img-responsive"/>
                            </a>`;
            imageList += image;
        })
        
		post.className = `${_id}`;
        post.innerHTML = `<div class="container">
                            <div class="row">
                                <div class="col-3">
                                    <a href="/" class="button button-black"><i class="far fa-arrow-alt-circle-left"></i> Назад</a>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <h3 class="post-title">${name}</h3>
                                    <span class="post-description">${content}</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <div class="post-images">
                                        ${imageList}
                                    </div>
                                </div>
                            </div>
                        </div>`;
		return post;
    };

    // рендер поста
    const renderPost = (items) =>{
		sectionPost.textContent = '';
		if (items.length) {
			items.forEach(({ name, content, images, _id }) => {
                sectionPost.appendChild(createPost(name, content, images, _id));
            })
            $('.post-images').lightGallery({
                thumbnail:true,
                download:false,
                share:false
            }); 
		} else {
			sectionPost.textContent = 'Извините мы не нашли изображение по вашему запросу';
		}	
    };

    portfolioContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList.contains('linkPost')) {

            hideTabContent(0);
            sectionPost.classList.add('active');
            getPosts(renderPost, (img) => img.filter((item) => item.name.includes(target.dataset.name)));
            
        }
    })
