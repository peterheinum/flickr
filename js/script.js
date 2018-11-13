const key = "c6172fde54b6b96d7afbd08ad5118a7a";
const key2 = "cebc2030b371023e059937c2550c8851";
const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keydown", handleSearch);

class Photo {
    constructor(id, farm, server, secret) {
        this.id = id;
        this.farm = farm;
        this.server = server;
        this.secret = secret;
    }
}


function generatePhotoArray(tempPhotoArray) {
    let photoArray = [];
    tempPhotoArray.forEach(x => {
        let tempPhoto = new Photo(x.id, x.farm, x.server, x.secret);
        photoArray.push(tempPhoto);
    });
    return photoArray;
}

function displayImagesFromPhotoArray(photoArray) {
    var gallerySpace = document.querySelector('.gallerySpace');
    cleanElement(gallerySpace);

    for (let i = 0; i < photoArray.length; i++) {
        var image = new Image();
        image.onload = function () {
            image.className = "imageItem";
            gallerySpace.appendChild(image);
        }(i)  //IMPORTANT (i)
        image.src = `https://farm${photoArray[i].farm}.staticflickr.com\/${photoArray[i].server}\/${photoArray[i].id}_${photoArray[i].secret}.jpg`;
    }
}

function generateSuggestions(TagArray) {
    var navbar = document.querySelector('#miniNavbar');
    cleanElement(navbar);

    if (TagArray.length < 10) {
        TagArray.forEach(tag => {
            let button = createButtonElement(tag);
            navbar.appendChild(button);
        });
    }
    else{
        for (let i = 0; i < 10; i++) {
            let tag = TagArray[i];
            let button = createButtonElement(tag);
            navbar.appendChild(button);
        }
    }
}

function createButtonElement(tag) {
    let button = document.createElement("button");
    button.className = "relatedLink";
    button.addEventListener("click", followTagLink);
    button.textContent = tag;
    return button;
}

function cleanElement(element) {
    while (element.firstChild) { //TODO but not h2 elements!
        element.removeChild(element.firstChild);
    }
}

function followTagLink(event) {
    searchBar.value = "";
    let tag = event.target.textContent;
    fetchPhotos(tag);
}




function fetchPhotos(tag) {
    let amount = 20;
    const promise = fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tag}&per_page=${amount}&format=json&nojsoncallback=1`)
        .then((res) => res.json())
        .then((JsonData) => {
            let photoArray = generatePhotoArray(JsonData.photos.photo);
            displayImagesFromPhotoArray(photoArray);
        }).catch(error => console.log(error));

    const promise2 = fetch(`http://words.bighugelabs.com/api/2/${key2}/${tag}/json`)
        .then((res) => {
            return res.json();
        }).then((JsonData) => {
            console.log(JsonData.noun.syn);
            generateSuggestions(JsonData.noun.syn);
        })
        .catch(error => console.log(error));
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        fetchPhotos(searchBar.value);
    }
}



