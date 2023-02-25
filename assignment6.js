
var imageUrl = "";
var i = 0;
var interval = 5000;
var timer;
var count;

var imageRequest = new XMLHttpRequest();
imageRequest.open('GET', './image_list.txt', true);
imageRequest.onload = function () {
    createImages()
}

function createImages(){
    var imageData = JSON.parse(imageRequest.responseText);
    imageUrl = imageData[i].URL;
    var img = document.createElement("img");
    img.src = imageUrl;
    var name = imageData[i].name;
    var namep = document.createElement("p");
    document.getElementById("image-div").appendChild(img);
    document.getElementById("name-div").appendChild(namep);
    namep.innerHTML = name;
    count = Object.keys(imageData).length - 1;
    imageData.forEach(element => {
        var sImg = document.createElement("img");
        sImg.style.width = "100px";
        sImg.style.height = "100px";
        sImg.src = element.URL;
        sImg.style.marginRight = "15px";
        document.getElementById("gallery").appendChild(sImg);        
    });
    document.getElementsByTagName("img")[i+1].style.border = "thick solid red";
}

function nextImage() {
    imageRequest.open('GET', './image_list.txt', true);
    if (i >= 0 && i < count) {
        i++;
    }
    else {
        i = 0;
    }
    loadImage()
}
function previousImage() {
    imageRequest.open('GET', './image_list.txt', true);
    if (i > 0 && i <= count) {
        i--;
    }
    else {
        i = count;
    }
    loadImage();
}

function loadImage() {
    document.getElementById("image-div").innerHTML = "";
    document.getElementById("name-div").innerHTML = "";
    document.getElementById("gallery").innerHTML = "";
    imageRequest.send();
    runTimer();
}

function resetImage() {
    imageRequest.open('GET', './image_list.txt', true);
    i = 0;
    loadImage();
}

function runTimer() {
    clearInterval(timer);
	timer = setInterval(nextImage, interval);
}

function loadPage() {
     loadImage();
}

window.addEventListener("load", loadPage, false);
document.getElementById("next-button").addEventListener("click", nextImage, false);
document.getElementById("previous-button").addEventListener("click", previousImage, false);
document.getElementById("reset-button").addEventListener("click", resetImage, false);