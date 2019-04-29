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
                htmlContent = `<div class="error-no-image">OOPS!! There is no image result...</div>`
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent)

        }
        
    });

    
})();
