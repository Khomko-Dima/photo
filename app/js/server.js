document.addEventListener("DOMContentLoaded", function() {

    "use strict";

    const loading = (nameFunc) => {
        const spiner = `<div class="loader">Loading...</div>`;
        if (nameFunc == 'renderCard') {
            imgWrapper.innerHTML = spiner;
        }
        if (nameFunc == 'renderPost') {
            sectionPost.innerHTML = spiner;
        }
        
    };
    
    const objPhotos = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
			"content-type": "application/json",
			"x-apikey": "5ed376082032862ff2ce26ed",
			"cache-control": "no-cache"
        }
    };

    const getResuorse = async(url, opt) => {
        const res = await axios(`${url}`, opt);
        if(res.status !== 200) {
            throw new Error(`Colud not fetch ${url}, status: ${res.status}`);
        };
        return res;
    }


    const getImg = (handler, filter) => {
        loading(handler.name);
        getResuorse('https://filter-cc17.restdb.io/rest/photos', objPhotos)
            .then(data => filter(data.data))
            .then(data => handler(data))
    };

    const objPosts = {
        "async": true,
        "crossDomain": true,
        "method": "GET",
        "headers": {
			"content-type": "application/json",
			"x-apikey": "5ed5361a2032862ff2ce27bc",
			"cache-control": "no-cache"
        }
    };

    const getPosts = (handler, filter) => {
        loading(handler.name);
        getResuorse('https://posts-8609.restdb.io/rest/posts', objPosts)
            .then(data => filter(data.data))
            .then(data => handler(data))
    };