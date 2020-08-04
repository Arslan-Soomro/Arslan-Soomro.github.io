//Imports Slider Module
import Slider from './Slider_Module.js';


// Image Slider --- Setup -- Start
const imgSlider = new Slider(document.querySelectorAll('#img_container .slide'), true);

const headingSlider = new Slider(document.querySelectorAll('#img_container .heading'), true);

document.getElementById('prevbtn').addEventListener('click', () => {
    //console.log(imgSlider.showPrevSlide());
    headingSlider.showPrevSlide();
})

document.getElementById('nextbtn').addEventListener('click', () => {
    //console.log(imgSlider.showNextSlide());
    headingSlider.showNextSlide();
})
// Image Slider --- Setup -- End
