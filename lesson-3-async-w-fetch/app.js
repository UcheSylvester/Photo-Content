(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        /*** FETCHING IMAGES FROM UNSPLASH ***/

        const imageUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
        const imageObject = {
            headers: {authorization: 'Client-ID ddaefa4c92ec5deae8988523e03426a592933e19724005cc626934743cf88c80'}
        };


        fetch(imageUrl, imageObject)
            .then(response=> response.json())
            .then(addImage)
            .catch(e => requestError(e, 'image'))

        // adding Image to the page
        function addImage(data) {
            let htmlContent = '';
            const firstImage = data.results[0];

            if(firstImage) {
                htmlContent = `
                <figure>
                    <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                    <figcaption>${searchedForText}</figcaption>
                </figure>
                `
            } else {
                htmlContent = `Oppsss!! There is no image available`
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }


        /**** FETCHING ATICLES FOR SEARCH */

        const articlesUrl = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=D8vhAXpJCLAebrGLBbCohT84d5UM882W`;

        fetch(articlesUrl)
            .then(response => response.json())
            .then(addArticles)
            .catch(e => requestError(e, 'articles'))

        
        function addArticles(data) {
            let htmlContent ='';
            const articles = data.response.docs;
            console.log(articles)
            if(articles && articles.length >= 1) {
                htmlContent = '<ul>' + articles.map(article =>
                    `<li class="article">
                        <h2><a href="${article.web_url}">${article.headline.main}</a></h2>
                        <p>${article.snippet}</p>
                    </li>`
                ).join('') + '</ul>'
            } else {
                htmlContent = 'OPPSSS! There is no articles available';
            }

            responseContainer.insertAdjacentHTML('beforeend', htmlContent);
        }


        /*** HANDLING NETWORK ERRORS ***/
        function requestError(e, part) {
            console.log(e.message)

            let errorMessage = `<p class="network-warning">Oh... no! <em>${e.message}</em> error occurred on ${part} request for ${searchedForText}. Please check network connections and try again!`
            responseContainer.insertAdjacentHTML('beforeend', errorMessage);
        }


    });
})();
