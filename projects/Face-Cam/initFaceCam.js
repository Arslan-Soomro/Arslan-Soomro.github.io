//Get The Video Element From HTML With ID faceCam
const faceCam = document.getElementById("faceCam");

//Load All The Models Required For Face Detection First
Promise.all([

    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("/models")
    //faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
    //faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
    //faceapi.nets.ageGenderNet.loadFromUri("/models") //For Age And Gender

]).then(startfaceCam);//Then Start The Camera

//Gets The Video From Camera
function startfaceCam(){
    navigator.getUserMedia(
        { video: {} },
        stream => (faceCam.srcObject = stream),
        err => console.error(err)
    )
}