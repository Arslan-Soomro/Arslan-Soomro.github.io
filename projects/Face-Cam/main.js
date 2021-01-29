//Game Variables

let loopTime = 100;
//This must be also the transition time for emojis
let timeCounter = emojiTravelTime;//So Not To delay the first time the game starts
let start = false;
let emojiPlate = document.getElementById("emojiPlate");

let score = 0;
let over = false;

//Clicking On Start Button Starts The Game
document.getElementById("start_btn").onclick = () => {
    start = true;
}


//If We Are Succesfully Playing The video
faceCam.addEventListener("playing", () => {

    //Runs The Face Detecting Process After Some Given Amount Of Time Repeatedly
    setInterval( async () => {

        //Detects Faces And Gets Other Information About Face
        const detections = await faceapi
            .detectSingleFace(faceCam, new faceapi.TinyFaceDetectorOptions()) //use detectSingleFace | detectAllFaces
            //.withFaceLandmarks()
            .withFaceExpressions();

        if(detections){//If we have detected a face
            
            express = {
                neutral: detections.expressions.neutral,
                happy: detections.expressions.happy,
                sad: detections.expressions.sad,
                surprised: detections.expressions.surprised,
                angry: detections.expressions.angry,
                detected: true
            }

            

            //Gets The Current Emotion Of Player
            expressionNow = getEmotion(express);
            document.getElementById("emotion_teller").innerText = expressionNow;
            //Sets Current And Previous Emotion
            setCurrentEmotion(getEmotion(express));            

            //Based On Current And Previous Emotion Decides If Current Emotion Is A New Emotion
            //if(currentEmotions.curr != currentEmotions.prev){}

            //If the user has the same emotions as the emoji, To avoid errors, checking if a emoji exists in plate
            if(emojiPlate.firstChild){
                if(emojiPlate.firstChild.classList.contains(expressionNow) && timeCounter < emojiTravelTime){
                    //Effects For Removing The Emoji
                    emojiPlate.firstChild.style.opacity = '0';
                    emojiPlate.firstChild.style.transition = '1s';
                    //total Time - new transition time, lets the previous image finish its fading time
                    timeCounter = emojiTravelTime - emojiDestroyTime;

                    //If Current Emotion Is Not Same As Previous
                    if(currentEmotions.curr != currentEmotions.prev){
                        score += 1;
                        emojiPlate.firstChild.className = 'emoji';
                    }
                    document.getElementById("score_num").innerText = score;
                    over = false;
                }
            }

            if(start){
                
                timeCounter += loopTime;
                
                if(timeCounter >= emojiTravelTime){//If The Emoji Has Succesfully Completed Its Movement
                    //Game Over
                    if(over){
                        emojiPlate.innerText = "Game Over";
                    }else{//Game Not Over
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

        }else{//If we haven't detected a face
            express = {
                neutral: 0,
                happy: 0,
                sad: 0,
                surprised: 0,
                angry: 0,
                detected: false
            };
        }

        //Even If No Face Is Detected, Below Commands Will Run



    }, 100);
})