const createRandomImg = (parentNode) => {
    //Basic Initialization Of Properties
    let path = "resources/images/";
    let imgSrcs = ["happy.jpg", "surprised.jpg", "angry.jpg", "sad.jpg"];
    //mutiply random() with four when you are ready to deal with sad emoji
    let rand = Math.floor(Math.random() * 3);
    
    //Create New Image And Set Properties
    let newImg = document.createElement("img");
    newImg.src = path + imgSrcs[rand];
    newImg.style.left = parentNode.offsetWidth.toString() + "px";
    newImg.classList.add(imgSrcs[rand].slice(0, imgSrcs[rand].indexOf('.')));
    newImg.classList.add('emoji');

    //Insert Image Into Parent Node
    parentNode.appendChild(newImg);

    console.log(rand);
}