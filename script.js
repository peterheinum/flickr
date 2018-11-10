const key = "c6172fde54b6b96d7afbd08ad5118a7a";
let photoArray = [];

class Photo {
    constructor(id, farm, server, secret) {
        this.id = id;
        this.farm = farm;
        this.server = server;
        this.secret = secret;
    }
}

function generatePhotoArray(tempPhotoArray) {
    if (photoArray) {
        photoArray = [];
        tempPhotoArray.forEach(x => {
            let tempPhoto = new Photo(x.id, x.farm, x.server, x.secret);
            photoArray.push(tempPhoto);
        });
    } else {
        tempPhotoArray.forEach(x => {
            let tempPhoto = new Photo(x.id, x.farm, x.server, x.secret);
            photoArray.push(tempPhoto);
        });
    }
}

function displayImagesFromPhotoArray() {
    var body = document.querySelector('.gallerySpace');
    cleanElement(body);
    
    

    for (let i = 0; i < 50; i++) {
        var image = new Image();
        image.onload = function () {
            image.className = "imageItem";
            body.appendChild(image);
        }(i)  //IMPORTANT (i)
        image.src = `https://farm${photoArray[i].farm}.staticflickr.com\/${photoArray[i].server}\/${photoArray[i].id}_${photoArray[i].secret}.jpg`;
    }
}

function generateSuggestions(TagArray){
    var navbar = document.querySelector('#miniNavbar');
    //cleanElement(navbar);

    if(TagArray.length != 0){
        for (let i = 0; i < 10; i++) {                    
            let tag = TagArray[i]._content;
            let button = document.createElement("button");
            button.className = "relatedLink";
            button.addEventListener("click", followTagLink);
            button.textContent = tag;
            navbar.appendChild(button);
        }
    }   
}

function cleanElement(element){
    while(element.firstChild){ //TODO but not h2 elements!
        element.removeChild(element.firstChild);
    }
}

function followTagLink(event){
    console.log(event.target.textContent);

}


const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keydown", handleSearch);

function fetchPhotos(tag){
    
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        console.log(searchBar.value);
        const promise = fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${searchBar.value}&tags=${searchBar.value}&format=json&nojsoncallback=1`)
            .then((res) => res.json())
            .then((JsonData) => {
                generatePhotoArray(JsonData.photos.photo);                
                displayImagesFromPhotoArray();
            }).catch(error => console.log(error));
        const promise2 = fetch(`https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=${key}&tag=${searchBar.value}&format=json&nojsoncallback=1`)
            .then((res) => {
                return res.json();
            }).then((JsonData) => {
                generateSuggestions(JsonData.tags.tag)
                
            })
    }
}