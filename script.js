const key = "c6172fde54b6b96d7afbd08ad5118a7a";
const photoArray = [];

const promise = fetch(`https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=${key}&gallery_id=66911286-72157647277042064&format=json&nojsoncallback=1`)
    .then((res) => {
        return res.json();
    })
    .then(JsonData => {
        let tempPhotoArray = JsonData.photos.photo;
        //generatePhotoArray(tempPhotoArray);
        //displayImagesFromPhotoArray();
    })
    .catch(err => {
        console.log("Error:", err);
    })





class Photo {
    constructor(id, farm, server, secret) {
        this.id = id;
        this.farm = farm;
        this.server = server;
        this.secret = secret;
    }
}
function generatePhotoArray(tempPhotoArray) {
    tempPhotoArray.forEach(x => {
        let tempPhoto = new Photo(x.id, x.farm, x.server, x.secret);
        photoArray.push(tempPhoto);
    });
}

function displayImagesFromPhotoArray() {
    var body = document.querySelector('.gallerySpace ');
    for (let i = 0; i < 20; i++) {
        var image = new Image();
        image.onload = function () {
            image.className = "imageItem";
            body.appendChild(image);
        }(i)  //IMPORTANT (i)
        image.src = `https://farm${photoArray[i].farm}.staticflickr.com\/${photoArray[i].server}\/${photoArray[i].id}_${photoArray[i].secret}.jpg`;
    }
}



const searchBar = document.querySelector("#searchBar");
searchBar.addEventListener("keydown", handleSearch);

function handleSearch(event) {
    if (event.key === 'Enter') {
        console.log(searchBar.value);
        const promise = fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&text=${searchBar.value}&tags=${searchBar.value}&format=json&nojsoncallback=1`)
            .then((res) => {
                return res.json();
            }).then((JsonData) => {
                generatePhotoArray(JsonData.photos.photo);
                //console.log(JsonData.photos.photo);
                displayImagesFromPhotoArray();
            }).catch(error => console.log(error));
        const promise2 = fetch(`https://api.flickr.com/services/rest/?method=flickr.tags.getRelated&api_key=${key}&tag=${searchBar.value}&format=json&nojsoncallback=1`)
            .then((res) => {
                return res.json();
            }).then((JsonData) => {
                var body = document.querySelector('.navbar-right');

                for (let i = 0; i < 10; i++) {
                    let tag = JsonData.tags.tag[i]._content;
                    let temp = document.createElement("p");
                    temp.className = "relatedLink";
                    
                    temp.textContent = tag;

                    body.appendChild(temp);

                }

            })
    }
}