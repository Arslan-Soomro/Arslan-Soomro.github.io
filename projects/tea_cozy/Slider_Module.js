class Slider {
    //Make sure to define width and height of parentDiv in order to see it.
    //Do define buttons and bind below functions with them to be able to move throught images

    constructor(childSlides, style = false ,transitionTime = 1){
        
        //this.container = parentDiv;//It was Extra 
        this.slides = childSlides;
        this.time = transitionTime;
        this.style = style; 

        //Will Set the style of container and Slides to look like a slider
        if(this.style){
            //this.container.style.cssText = 'position: relative;overflow: hidden;'; 
            this.slides.forEach(element => {
                element.style.cssText = 'width: 100%;height: 100%;object-fit: cover;object-position: center;position: absolute;';
            })
        }

        //Sets Initial Position Of Slides, So They Can transition Between Them Smoothly
        for(let i = 0; i < this.slides.length; i++){
            this.slides[i].style.transform = 'translate('+100*i+'%)';
        }
    }

    //It is important that all child slides must have one common class

    //Below Function should be fired on an event e.g Click
    showNextSlide(){
        //Makes slides transition between them but its better to move this block of code somewhere else
        if(!(this.slides[0].style.transition)){//Checks if slide has a transition property, if it doesn't it returns an empty string which evaluates to false, so this if statement will run only once, saving us some performance
            this.slides.forEach(element => {
                element.style.transition = `transform ${this.time}s`;
            });
        }


        //Below conditional says that if we have reached the last image don't go any forward
        if(this.slides[this.slides.length-1].style.transform !== 'translate(0%)'){
            let value;
            let valueNum;
            for(let i = 0; i < this.slides.length; i++){
                value = this.slides[i].style.transform; //Saves property of transform e.g: translate(100%);
                //Below takes that property and only saves the numbers from the property e.g: 100
                valueNum = parseInt(value.substr(value.indexOf('(')+1,value.indexOf('%')-value.indexOf('(')-1));
                //Below gives the transform a new property to move images properly
                this.slides[i].style.transform = 'translate('+(valueNum-100)+'%)';//-100 for moving images to right
                
                //console.log('Transform: '+ this.slides[i].style.transform + ' ,Class: ' + this.slides[i].classList);
            }
        }else{
            //If Last Slide Is Reached Return True
            return true;
        }
        


    }
    
    //Below Function should be fired on an event e.g Click
    showPrevSlide() {
        //Below conditional says that if we have reached the last image don't go any forward
        if(this.slides[0].style.transform !== 'translate(0%)'){
            let value;
            let valueNum;
            for(let i = 0; i < this.slides.length; i++){
                value = this.slides[i].style.transform; //Saves property of transform e.g: translate(100%);
                //Below takes that property and only saves the numbers from the property e.g: 100
                valueNum = parseInt(value.substr(value.indexOf('(')+1,value.indexOf('%')-value.indexOf('(')-1));
                //Below gives the transform a new property to move images properly
                this.slides[i].style.transform = 'translate('+(valueNum+100)+'%)';//+100 for moving images to right
                
                //console.log('Transform: '+ this.slides[i].style.transform);
            }
        }else{
            //If Last Slide Is Reached and this function is fired again Return True
            return true;
        }
    }
}

//module.exports = Slider; //For use wtih node

export default Slider;//For in use with browser
