(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        /***** WORKING ON IMAGE REQUEST FROM UNSPLASH ****/

        const unsplashRequest = new XMLHttpRequest();
        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        // setting request header for authorization    
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID ddaefa4c92ec5deae8988523e03426a592933e19724005cc626934743cf88c80');
        unsplashRequest.onload = addImage;
        unsplashRequest.onerror = onError();

        unsplashRequest.send();

        // onload function for success
        function addImage() {
            /* TODO
            // convert the JSON response to object JSON.parse()
            // get the first image from the response
            // display the image on the page
            */
            let htmlContent = '';
            const data = JSON.parse(this.responseText);

            if(data && data.results && data.results[0]) {
                const firstImage = data.results[0];
                console.log(firstImage);
                htmlContent = `<figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
                </figure>`
            } else {
                htmlContent = `<div class="error-no-image">OOPS!! NO Image Available...</div>`
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent)

        }

        /**** HANDLING THE ARTICLES REQUEST ****/

        const articleRequest = new XMLHttpRequest();
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=D8vhAXpJCLAebrGLBbCohT84d5UM882W`);
        articleRequest.onload = addArticle;
        articleRequest.onerror = onError()
        articleRequest.send();

        function addArticle() {
            // console.log('working');
            // debugger;
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const articles = data.response.docs;
            // console.log(articles);
            if(data && articles && articles.length > 1) {
                htmlContent = '<ul>' + articles.map(article => 
                    `<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`
                ).join('') + '</ul>';
            } else {
                htmlContent = '<div class="error-no-articles">No articles available</div>'
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent)

        }

        function onError() {
            console.log('not working')
        }
    });

    
})();
