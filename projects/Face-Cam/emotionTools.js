//The Object That Keeps Track Of The Accuracy Of An Emotion
let express = {
    neutral: 0,
    happy: 0,
    sad: 0,
    surprised: 0,
    angry: 0,
    detected: false
};

//The Current And Previous Emotion
let currentEmotions = {
    prev: 'neutral',
    curr: 'neutral'
}

//Sets The prev to curr and curr to prev
let setCurrentEmotion = (newEmotion) => {
    currentEmotions.prev = currentEmotions.curr;
    currentEmotions.curr = newEmotion;
}

//Compares All Emotions And Returns One With Most Precision
const getEmotion = (emotions) => {
    
    let emotion = 'none';
    
    if(emotions.neutral >= emotions.happy && emotions.neutral >= emotions.sad && emotions.neutral >= emotions.surprised && emotions.neutral >= emotions.angry){
        emotion = 'neutral';
    }else if(emotions.sad >= emotions.happy && emotions.sad >= emotions.sad && emotions.sad >= emotions.surprised && emotions.sad >= emotions.angry){
        emotion = 'sad';
    }else if(emotions.angry >= emotions.happy && emotions.angry >= emotions.sad && emotions.angry >= emotions.surprised && emotions.angry >= emotions.neutral){
        emotion = 'angry';
    }else if(emotions.surprised >= emotions.happy && emotions.surprised >= emotions.sad && emotions.surprised >= emotions.neutral && emotions.surprised >= emotions.angry){
        emotion = 'surprised';
    }else if(emotions.happy >= emotions.neutral && emotions.happy >= emotions.sad && emotions.happy >= emotions.surprised && emotions.happy >= emotions.angry){
        emotion = 'happy';
    }

    return emotion;
}

//Converts Big Decimal Numbers Into Percent Integers
const toPercent = (num) => {
    return (num*100).toFixed(0);
}