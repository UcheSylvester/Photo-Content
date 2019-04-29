(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    searchedForText = 'hippos';

    // onload function for success
    function addImage() {
        console.log('working!')
    }

    const unsplashRequest = new XMLHttpRequest();
    unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    unsplashRequest.onload = addImage;

    // setting request header for authorization
    unsplashRequest.setRequestHeader('Authorization', 'Client-ID 25b73c89-86b9-4b40-b447-04657a3149fa');
    unsplashRequest.send();

})();
