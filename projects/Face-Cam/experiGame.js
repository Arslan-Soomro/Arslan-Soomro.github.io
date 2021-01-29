/*
//For Experiment, Build Game Logic Here And Then Insert Into Main

let loopTime = 100;
//This must be also the transition time for emojis
let timeCounter = emojiTravelTime;//So Not To delay the first time the game starts
let start = false;
let emojiPlate = document.getElementById("emojiPlate");

let score = 0;
let over = false;

//Works Instead For Expressions
document.getElementById("kill").onclick = () => {

    if(emojiPlate.firstChild && timeCounter < emojiTravelTime){//If There is an emoji present    
        //Effects For Removing The Emoji
        emojiPlate.firstChild.style.opacity = '0';
        emojiPlate.firstChild.style.transition = '1s';
        //total Time - new transition time, lets the previous image finish its fading time
        timeCounter = emojiTravelTime - emojiDestroyTime;

        score += 1;
        document.getElementById("score_num").innerText = score;
        over = false;
    }
}

setInterval(() => {
    

    if(start){
        timeCounter += loopTime;
        
        if(timeCounter >= emojiTravelTime){//If The Emoji Has Succesfully Completed Its Movement
            if(over){
                console.log("Game Over");
            }else{
                while(emojiPlate.firstChild){//Remove The Image If Already In EmojiPlate
                    emojiPlate.removeChild(emojiPlate.firstChild);
                }
                //Create And Insert A New Image
                createRandomImg(emojiPlate);
                
    
                //Move The Image To Right Position, For some reason sometimes offsetWidth returns 0, creating unwanted effect so to be on safe side we added 100
                emojiPlate.firstChild.style.left = ((emojiPlate.firstChild.offsetWidth+100) * -1).toString() + "px";
                
                //Reset timeCounter
                timeCounter = 0;

                over = true;
            }
        }

    }

}, loopTime);
*/