    prediction_1="";
    prediction_2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("snapshot").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    });
}
console.log('ml5 version',ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/XS0TmszbY/model.json",modelloaded);
function modelloaded(){
    console.log("modelloaded");
}
function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img,gotresult);
}
function gotresult(error,result){
    if(error){
        console.error(error);
    }
    else{
        console.log(result);
        prediction_1=result[0].label;
        prediction_2=result[1].label;
        document.getElementById("result_hand_name").innerHTML=prediction_1;
        document.getElementById("result_hand_name2").innerHTML=prediction_2;
        if(prediction_1=="Rock emoji"){
            document.getElementById("update_hand").innerHTML="&#129311;";
        }
        if(prediction_1=="hand emoji"){
            document.getElementById("update_hand").innerHTML="&#9995;";
        }
        if(prediction_1=="thumbs up emoji"){
            document.getElementById("update_hand").innerHTML="&#128077;";
        }



        if(prediction_2=="Rock emoji"){
            document.getElementById("update_emoji2").innerHTML="&#129311;";
        }
        if(prediction_2=="hand emoji"){
            document.getElementById("update_emoji2").innerHTML="&#9995;";
        }
        if(prediction_2=="thumbs up emoji"){
            document.getElementById("update_emoji2").innerHTML="&#128077;";
        }

        speak();
    }
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The First Prediction Is "+prediction_1;
    speak_data2="And The Second Prediction Is "+prediction_2;
    var utterthis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    utterthis.rate=0.9;
    synth.speak(utterthis);
}