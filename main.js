status1 = ""
objects = [];

function preload() {
    video = createVideo("video.mp4");
    }

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide()
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results)
    objects = results
}

function draw() {
    image(video, 0, 0, 480, 380);
    if (status1 != "") {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects dectected:" + objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + percent + "%", objects[i].x, objects[i].y)
            noFill()
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
}

function modelLoaded() {
    console.log("Model is Loaded");
    status1 = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}