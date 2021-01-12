IMG = "";
Status = "";
Objects = [];

function preload() {

}

function setup() {
    Canvas = createCanvas(460, 400);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.size(460 , 400);
    Video.hide();
    ObjectDetector = ml5.objectDetector('cocossd', ModelLoaded);
    document.getElementById("Status").innerHTML = "Status: Detecting objects . . .";
}

function draw() {
    image(Video, 0, 0, 640, 420);



    if (Status != "") {
        R = random(255);
        G = random(255);
        B = random(255);
        ObjectDetector.detect(Video , GotResult)
        for (i = 0; i < Objects.length; i++) {
            document.getElementById("Status").innerHTML = "Status : Object Detected";
            document.getElementById("Object_Number").innerHTML = "Number of objects detected : " + Objects.length;
            fill(R , G , B);
            Percent = floor(Objects[i].confidence * 100);
            text(Objects[i].label + " " + Percent + "%", Objects[i].x + 15 , Objects[i].y + 15);
            noFill();
            stroke(R , G , B);
            rect(Objects[i].x , Objects[i].y , Objects[i].width , Objects[i].height);
        }

    }


}

function ModelLoaded() {
    console.log("Model is loaded");
    Status = true;
}

function GotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        Objects = results;
    }
}