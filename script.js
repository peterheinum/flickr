const key = "c6172fde54b6b96d7afbd08ad5118a7a";

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
    cleanElement(navbar);

    if (TagArray.length != 0) {
        for (let i = 0; i < 10; i++) {
            let tag = TagArray[i]._content;
            let button = createButtonElement(tag);
            navbar.appendChild(button);
        }
    }
}



function createButtonElement(tag){
    let button = document.createElement("button");
    button.className = "relatedLink";
    button.addEventListener("click", followTagLink);
    button.textContent = tag;
    return button;
}

function cleanElement(element){
    while(element.firstChild){ //TODO but not h2 elements!
        element.removeChild(element.firstChild);
    }
}

function followTagLink(event){
    searchBar.value = "";
    let tag = event.target.textContent;
    fetchPhotos(tag);
}


const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keydown", handleSearch);

function fetchPhotos(tag){
    let amount = 20;
    const promise = fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tag}&per_page=${amount}&format=json&nojsoncallback=1`)
    .then((res) => res.json())
    .then((JsonData) => {
        let photoArray = generatePhotoArray(JsonData.photos.photo);                
        displayImagesFromPhotoArray(photoArray);
    }).catch(error => console.log(error));
const promise2 = fetch(`https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=${key}&tag=${tag}&format=json&nojsoncallback=1`)
    .then((res) => {
        return res.json();
    }).then((JsonData) => {
        generateSuggestions(JsonData.tags.tag)
        
    })
}

function handleSearch(event) {
    if (event.key === 'Enter') {
        fetchPhotos(searchBar.value);        
    }
}

element.addEventListener('scroll', function(event)
{   
    
    var element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight)
    {
        console.log('scrolled');
    }
});