(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;

        const url = `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`;
        const myInit = {
            headers: {authorization: 'Client-ID ddaefa4c92ec5deae8988523e03426a592933e19724005cc626934743cf88c80'}
        };

        fetch(url, myInit)
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

        function requestError(e, part) {
            console.log(e.message)

            let errorMessage = `<p class="network-warning">Oh... no! <em>${e.message}</em> error occurred on ${part} request for ${searchedForText}. Please check network connections and try again!`
            responseContainer.insertAdjacentHTML('beforeend', errorMessage);
        }


    });
})();
