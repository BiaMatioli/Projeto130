musica1 = "";
musica2 = "";

pulsoEsqX = 0;
pulsoEsqY = 0;

pulsoDirX = 0;
pulsoDirY = 0;

placarDir = 0;
placarEsq = 0;

status1 = "";
status2 = "";

function preload(){
    musica1 = loadSound("music1.mp3");
    musica2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    pose = ml5.poseNet(video, modelLoaded);
    pose.on("pose", gotPoses);
}

function draw(){
    image(video, 0, 0, 600, 500);

    status1 = musica1.isPlaying();
    status2 = musica2.isPlaying();

    fill("#ffffff");
    stroke("#ffffff");

    if(placarEsq > 0.2){
        circle(pulsoEsqX, pulsoEsqY, 25);

        musica1.stop();

        if(status2 == false){
            musica2.play();

            document.getElementById("tagh2").innerHTML = "A música que está sendo tocada é Peter Pan";
        }
    }

    if(placarDir > 0.2){
        circle(pulsoDirX, pulsoDirY, 25);

        musica2.stop();

        if(status1 == false){
            musica1.play();

            document.getElementById("tagh2").innerHTML = "A música que está sendo tocada é Harry Potter";
        }
    }
}

function tocar(){
    musica.play();

    musica.setVolume(1);
    musica.rate(1);
}

function modelLoaded(){
    console.log("O modelo foi carregado");
}

function gotPoses(){
    if (results.length > 0) {
        console.log(results);

        pulsoDirX = results[0].pose.rightWrist.x;
        pulsoDirY = results[0].pose.rightWrist.y;
        placarDir = results[0].pose.keypoints[10].score;

        pulsoEsqX = results[0].pose.leftWrist.x;
        pulsoEsqY = results[0].pose.leftWrist.y;
        placarEsq = results[0].pose.keypoints[9].score;

        console.log(pulsoDirX, pulsoDirY, pulsoEsqX, pulsoEsqY);
    }
}