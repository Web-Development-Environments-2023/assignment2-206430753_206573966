var users=[]
var counter=1
var img_good=0
var img_bad=0
var timeLeft=120
var shoot_key=-1
var notInGame;
var flag="about_close"
var isPlaying;
var restartClicked = false;

var canvas;
var context;


var canvasHeight;
var canvasWidth;

//variables for size
var boardBottom;
var boardTop;
var boardRight;
var boardLeft;

//variables for player
var player;
var currentPositionX;
var currentPositionY;
var maxHeightForPlayer;
var keysDown;
var ShotsP;


//variables for images
var goodShipIMG;
var backgroundIMG;
var alien1;
var alien2;
var alien3;
var alien4;
var badShotIMG;
var goodShotIMG;

var intervalTimer;

//vriables for player movement
var upKey;
var downKey;
var rightKey;
var leftKey;

//variables for badShips
var badShips;
var shots;
var createNew;
var corter_more;
var updateSpeed;
var widthD;
var heightD;

//variables for game
var numOfUpdates;
var records;
var points;
var strikes;
var is_striked;
var timerCount; // number of times the timer fired since the last second
var timeLeftReal; // the amount of time left in seconds

//variables for record table dialog
var finalMassege;
var tableDialog;
var displayFinalMessage;
var recordsTable;

window.addEventListener("load", first_load, false);

document.addEventListener("mouseup",function(e){
    restartClicked=true
})

function first_load()
{
    document.getElementById("signup_button").addEventListener("click", signup_fun, false );
    document.getElementById("login_button").addEventListener("click", login_fun, false );
    users[0]=["p","testuser"]

    notInGame = true;
    widthD = canvasWidth*0.1;
    heightD = canvasHeight*0.1;
    isPlaying = false;
    setUpGame();
}

window.addEventListener("resize", function(e){
    var section = document.getElementById("content");

    canvas.width  = section.clientWidth;
    canvas.height = section.clientHeight;

    canvasHeight = canvas.height;
    canvasWidth = canvas.width;

    widthD = canvasWidth*0.1;
    heightD = canvasHeight*0.1;

    corter_more = canvasHeight*0.75;

    draw();
})

function clearRadioButtons(){
    var ele = document.querySelectorAll("input[type=radio]");
        for(var i=0;i<ele.length;i++){
        ele[i].checked = false;
        }
    }

function mainpage_fun()
{
    if(document.getElementById("game").style.display=="inline"){
        document.getElementById("back_song").pause()
        document.getElementById("back_song").currentTime=0
        endGame();
    }
    document.getElementById("welcome").style.display="inline"
    document.getElementById("signup").style.display="none"
    document.getElementById("login").style.display="none"
    document.getElementById("configuration").style.display="none"
    document.getElementById("game").style.display="none"
    document.getElementById("content").style.background="url('alien_back4.jpg') no-repeat";
    document.getElementById("content").style.backgroundSize="100% 100%"
    document.getElementById("signup_form").reset();
    document.getElementById("Pname").value = ""
    document.getElementById("Lname").value = ""
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("password_confirm").value = ""
    document.getElementById("mail").value = ""
    document.getElementById("birth").value = ""
    document.getElementById("username_login").value = ""
    document.getElementById("password_login").value = ""
    document.getElementById("geme_time").value = ""

    clearRadioButtons();
    document.getElementsByName("game_img1").checked = false;
    document.getElementsByName("game_img2").checked = false;
    document.getElementsByName("game_img3").checked = false;
    document.getElementsByName("game_img4").checked = false;
}

function signup_fun()
{
    if(document.getElementById("game").style.display=="inline"){
        document.getElementById("back_song").pause()
        document.getElementById("back_song").currentTime=0
        endGame();
    }
    document.getElementById("welcome").style.display="none"
    document.getElementById("signup").style.display="inline"
    document.getElementById("login").style.display="none"
    document.getElementById("game").style.display="none"
    document.getElementById("configuration").style.display="none"
    document.getElementById("content").style.background="url('alien_back4.jpg') no-repeat";
    document.getElementById("content").style.backgroundSize="100% 100%"
    document.getElementById("Pname").value = ""
    document.getElementById("Lname").value = ""
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("password_confirm").value = ""
    document.getElementById("mail").value = ""
    document.getElementById("birth").value = ""
    document.getElementById("username_login").value = ""
    document.getElementById("password_login").value = ""
    document.getElementById("geme_time").value = ""
    
    clearRadioButtons();
    document.getElementsByName("game_img1").checked = false;
    document.getElementsByName("game_img2").checked = false;
    document.getElementsByName("game_img3").checked = false;
    document.getElementsByName("game_img4").checked = false;


}

function login_fun()
{
    if(document.getElementById("game").style.display=="inline"){
        document.getElementById("back_song").pause()
        document.getElementById("back_song").currentTime=0
        endGame();
    }
    document.getElementById("welcome").style.display="none"
    document.getElementById("login").style.display="inline"
    document.getElementById("signup").style.display="none"
    document.getElementById("game").style.display="none"
    document.getElementById("configuration").style.display="none"
    document.getElementById("content").style.background="url('alien_back4.jpg') no-repeat";
    document.getElementById("content").style.backgroundSize="100% 100%"
    document.getElementById("Pname").value = ""
    document.getElementById("Lname").value = ""
    document.getElementById("username").value = ""
    document.getElementById("password").value = ""
    document.getElementById("password_confirm").value = ""
    document.getElementById("mail").value = ""
    document.getElementById("birth").value = ""
    document.getElementById("username_login").value = ""
    document.getElementById("password_login").value = ""
    document.getElementById("geme_time").value = ""
    
    clearRadioButtons();
    document.getElementsByName("game_img1").checked = false
    document.getElementsByName("game_img2").checked = false
    document.getElementsByName("game_img3").checked = false
    document.getElementsByName("game_img4").checked = false

}

function check_fun()
{
    var check_not_empty=0
    var message=""
    pname=document.getElementById("Pname").value
    lname=document.getElementById("Lname").value
    username=document.getElementById("username").value
    password=document.getElementById("password").value
    password_confirm=document.getElementById("password_confirm").value
    mail=document.getElementById("mail").value
    birth=document.getElementById("birth").value

    if(pname.length==0 || lname.length==0 || username.length==0|| password.length==0 || password_confirm.length==0 
        || mail.length==0 ||  birth.length==0)
    {
        
        message+="\nאין להשאיר שדה ריק"
    }
    if(mail.length==0)
    {
        check_not_empty=1
    }
    if(pname.includes("0")||pname.includes("1")||pname.includes("2")||pname.includes("3")||pname.includes("4")||
    pname.includes("5")||pname.includes("6")||pname.includes("7")||pname.includes("8")||pname.includes("9"))
    {
        message+="\nשם פרטי לא יכול להכיל מספרים"
    }

    if(lname.includes("0")||lname.includes("1")||lname.includes("2")||lname.includes("3")||lname.includes("4")||
    lname.includes("5")||lname.includes("6")||lname.includes("7")||lname.includes("8")||lname.includes("9"))
    {
        message+="\nשם משפחה לא יכול להכיל מספרים"
    }
    if(!(password.match(/[0-9]/)&&password.match(/[a-zA-Z]/)))
    {
        message+="\nסיסמא צריכה להכיל גם אותיות וגם מספרים"
    }

    if(password.length<8)
    {
        message+="\nסיסמא צריכה להיות מינימום 8 תווים"
    }
    if(password!=password_confirm)
    {
        message+="\nהסיסמא והווידוי לא זהים"
    }
    if(check_not_empty==0)
    {
        if(!(mail[0].match(/[0-9]/)||mail[0].match(/[a-zA-Z]/)))
        {
            message+=" \nכתובת  מייל חייבת להתחיל באות או ספרה"
        }
    }   
    var holder=0
    var i=0
    for(i=0;i<mail.length;i++)
    {
	if(i==(mail.length-1))
        {
            if(mail[i].match(/[.]/))
            {
                message+=" \nכתובת מייל לא יכולה להסתיים בנקודה"
            }
        }
        if(!(mail[i].match(/[0-9]/)||mail[i].match(/[a-zA-Z]/)||mail[i].match(/[.]/)||mail[i].match(/[@]/)))
        {
            message+=" \nכתובת מייל יכולה להיות מורכבת מאותיות, מספרים ונקודה בלבד"
        }
        if(mail[i].match(/[.]/))
        {
            if(i+1<mail.length)
            {
                if(mail[i+1].match(/[.]/))
                {
                    message+=" \nכתובת מייל לא יכולה להכיל 2 נקודות ברצף"
                }
            }
        }
        if(mail[i].match(/[@]/))
        {
            holder+=1
            if(i+1<mail.length)
            {
                if(mail[i+1].match(/[.]/))
                {
                    message+=" \nכתובת מייל לא יכולה להכיל רצף של @ ואז נקודה"
                }
            }
        }
    }
    if(holder>0)
    {
        if(holder>1)
        {
            message+=" \nכתובת מייל חייבת להכיל @ אחד בלבד בתוכה"
        }

    }
    else
    {
        message+=" \nכתובת מייל חייבת להכיל @ בתוכה"
    }

    if(message!="")
        window.alert(message)
    else
    {
        users[counter]=[username,password]
        counter+=1
        document.getElementById("Pname").value = ""
        document.getElementById("Lname").value = ""
        document.getElementById("username").value = ""
        document.getElementById("password").value = ""
        document.getElementById("password_confirm").value = ""
        document.getElementById("mail").value = ""
        document.getElementById("birth").value = ""
        login_fun()
    }
}

function back_fun()
{
    document.getElementById("signup").style.display="none"
    document.getElementById("welcome").style.display="inline"
}

function check_login_fun()
{
    username=document.getElementById("username_login").value
    password=document.getElementById("password_login").value
    var count=0
    var i=0
    for(i=0;i<counter;i++)
    {
        if(users[i][0]==username)
        {
            count=1
            if(users[i][1]==password)
            {
                count=2
                
            }
        }

    }
    if(count==1)
    {
        window.alert("סיסמא שגויה")
    }
    else
    {
        if(count==2)
        {
            document.getElementById("username_login").value = ""
            document.getElementById("password_login").value = ""
            records = []
            document.getElementById("userName").innerHTML = "hello, " +username;
            confi()
        }
        else
        {
        window.alert("משתמש זה אינו קיים במערכת")
        }

    }
}

function startgame()
{
    document.getElementById("signup").style.display="none"
    document.getElementById("welcome").style.display="none"
    document.getElementById("login").style.display="none"
    timeLeft=document.getElementById("geme_time").value
    good_nodelist=document.getElementsByName("good_spaceship")
    var i=0
    for(i=0;i<4;i++)
    {
        if(good_nodelist[i].checked)
        {
            img_good=good_nodelist[i].value
        }
    }
    
    if(timeLeft=="")
    {
        window.alert("לא נבחר זמן משחק")
    }
    else
    {
        if(timeLeft<120)
        {
            window.alert("זמן משחק מינימלי הינו לפחות 2 דקות(120) שניות")
        }
        if(img_good==0)
        {
            window.alert(" אתה חייב לבחור חללית בתור השחקן שלך")
        }
        else
        {
            if(shoot_key>90 || shoot_key<65 && shoot_key!=32)
            {
                window.alert("מקש יריה חייב להיות אחד ממקשי האותיות או הרווח")
            }
            else
            {
                document.getElementById("configuration").style.display="none"
                document.getElementById("game").style.display="inline"
                document.getElementById("restart_button").style.display="inline"
                removeEventListener("keydown", configuration_key)
                isPlaying = true;
                document.getElementById("geme_time").value = ""
                
                clearRadioButtons();
                document.getElementsByName("game_img1").checked = false;
                document.getElementsByName("game_img2").checked = false;
                document.getElementsByName("game_img3").checked = false;
                document.getElementsByName("game_img4").checked = false;
                newGame();
            }
        }
    }
}
    

//configuration part

function confi()
{
    document.getElementById("signup").style.display="none"
    document.getElementById("welcome").style.display="none"
    document.getElementById("login").style.display="none"
    document.getElementById("game").style.display="none"
    document.getElementById("configuration").style.display="inline"
    document.getElementById("content").style.background="url('game_bak.gif') no-repeat";
    document.getElementById("content").style.backgroundSize="100% 100%"
    addEventListener("keydown", configuration_key)
}

function configuration_key(e){
    shoot_key=e.keyCode;
}

function shootkey()
{
    if(shoot_key>90 || shoot_key<65 && shoot_key!=32)
    {
        alert("מקש יריה חייב להיות אחד ממקשי האותיות או הרווח")
    }
    else
    {
        text=String.fromCodePoint(shoot_key)
        if(shoot_key==32){
            text="Space"}
        document.getElementById("show_key").innerHTML="בחרת במקש: "+text
    }
}

function open_about()
{
    isPlaying = false;
    document.getElementById("back_song").pause()
    about_dialog.showModal();
    flag="about_open"

}
function close_dialog()
{
    isPlaying = true;
    about_dialog.close()
    flag="about_close"
    if(document.getElementById("game").style.display=="inline"){
        document.getElementById("back_song").play()
    }
}

document.addEventListener("keyup", function(e)
{
    if(e.key=="Escape")
    {
        close_dialog()
    }
})


document.addEventListener("mousedown", function(e)
{  
    
    if(flag=="about_open")
    {
        var about=document.getElementById("about_dialog")
        var mouse_width=e.clientX
        var mouse_height=e.clientY
        var header_height=document.getElementById("header_part").offsetHeight
        var nav_width=document.getElementById("nav_part").offsetWidth
        var topleft=about.offsetLeft
        var topright=about.offsetTop
        if(topleft>mouse_width || mouse_width>topleft+about.offsetWidth || topright>mouse_height || mouse_height>topright+about.offsetHeight)
        {
            close_dialog()
        }

    }

})


function setUpGame(){

    canvas = document.getElementById("board");
    context = canvas.getContext("2d");    

    alien1 = new Image();
    alien1.src = "alien1.gif";

    alien2 = new Image();
    alien2.src = "alien2.gif";

    alien3 = new Image();
    alien3.src = "alien3.gif";

    alien4 = new Image();
    alien4.src = "alien4.gif";

    backgroundIMG = new Image();
    backgroundIMG.src = "game_bak.gif";

    badShotIMG = new Image();
    badShotIMG.src = "laser_bad.gif";

    goodShotIMG= new Image();
    goodShotIMG.src = "good_laser.gif";

};

function resetElements(){

    var section = document.getElementById("content");

    canvas.width  = section.clientWidth;
    canvas.height = section.clientHeight;


    canvasHeight = canvas.height;
    canvasWidth = canvas.width;

    corter_more = canvasHeight*0.75;

    //reset player
    var xP = Math.random()*canvasWidth;
    player = new Player(xP, canvasHeight-5, canvasHeight*0.1, canvasWidth*0.05);
    player.x = xP;
    player.y = canvasHeight-5;
    player.height = canvasHeight*0.1;
    player.width = canvasWidth*0.05;
    player.xspeed = 0;
    player.yspeed = 0;
    player.friction = 0.4;
    player.maxspeed = 10;
    player.active = true;
    
    //reset bad ships
    badShips = new BadShips(150,55);
    badShips.exists = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
    ]
    badShips.alive = 20;
    badShips.x = 150; 
    badShips.y = 55;
    badShips. direction = true;
    badShips.speed = 6;
    badShips.heightD = canvasHeight*0.1;
    badShips.widthD = canvasWidth*0.08;
    badShips.height = canvasHeight*0.08;
    badShips.width = canvasWidth*0.06;
    this.column0 = 4;
    this.column1 = 4;
    this.column2 = 4;
    this.column3 = 4;
    this.column4 = 4;
    this.fromLeft = 0;
    this.fromRight = 4.5;
    badShips.cordinates = [
        [[badShips.x+badShips.heightD*0,badShips.y+badShips.heightD*0],[badShips.x+badShips.heightD*1,badShips.y+badShips.heightD*0],[badShips.x+badShips.heightD*2,badShips.y+badShips.heightD*0],[badShips.x+badShips.heightD*3,badShips.y+badShips.heightD*0],[badShips.x+badShips.heightD*4,badShips.y+badShips.heightD*0]],
        [[badShips.x+badShips.heightD*0,badShips.y+badShips.heightD*1],[badShips.x+badShips.heightD*1,badShips.y+badShips.heightD*1],[badShips.x+badShips.heightD*2,badShips.y+badShips.heightD*1],[badShips.x+badShips.heightD*3,badShips.y+badShips.heightD*1],[badShips.x+badShips.heightD*4,badShips.y+badShips.heightD*1]],
        [[badShips.x+badShips.heightD*0,badShips.y+badShips.heightD*2],[badShips.x+badShips.heightD*1,badShips.y+badShips.heightD*2],[badShips.x+badShips.heightD*2,badShips.y+badShips.heightD*2],[badShips.x+badShips.heightD*3,badShips.y+badShips.heightD*2],[badShips.x+badShips.heightD*4,badShips.y+badShips.heightD*2]],
        [[badShips.x+badShips.heightD*0,badShips.y+badShips.heightD*3],[badShips.x+badShips.heightD*1,badShips.y+badShips.heightD*3],[badShips.x+badShips.heightD*2,badShips.y+badShips.heightD*3],[badShips.x+badShips.heightD*3,badShips.y+badShips.heightD*3],[badShips.x+badShips.heightD*4,badShips.y+badShips.heightD*3]],
    ];

    //reset bad ships shots
    shots = new Shots();
    shots.firstShot = null;
    shots.secondShot = null;
    shots.shotsNow = [];
    shots.speed = 10;
    shots.turnToCreate = 0;
    shots.firstAck = false;
    shots.secondAck = false;

    //reset player shots
    ShotsP = new PlayerShots();
    ShotsP.existingShots = [];
    ShotsP.speed = 10;

    strikes = 3;

    createNew = true;

    is_striked = false;

    timerCount = 0;

    points = 0;

    numOfUpdates = 0;

    timeLeftReal = timeLeft;

}


function newGame(){
    document.getElementById("back_song").play();  

    goodShipIMG = new Image();
    switch(img_good){
        case "1":
            goodShipIMG.src = "1.gif";
            break;
        case "2":
            goodShipIMG.src = "2.gif";
            break;
        case "3":
            goodShipIMG.src = "3.gif";
            break;
        case "4":
            goodShipIMG.src = "4.gif";
            break;
        default:
            goodShipIMG.src = "1.gif";
            break;
    } 

    resetElements();

    document.addEventListener("keydown", keyDownEvent);

	document.addEventListener("keyup", keyUpEvent);


    intervalTimer = setInterval(mainGame,1000/30);

    updateSpeed = setInterval(function(){
        badShips.speed +=5;

        if(++numOfUpdates===4){
            window.clearInterval(updateSpeed);
        }
    }, 5000)
}


function updateSpeedShips(){
    badShips.speed +=2;

    if(++numOfUpdates===4){
        window.clearInterval(updateSpeed);
    }
}

function keyDownEvent(event){
    if(event.key === "ArrowUp"){
        upKey = true;
    } else if(event.key === "ArrowDown"){
        downKey = true;
    } else if(event.key === "ArrowLeft"){
        leftKey = true;
    } else if( event.key === "ArrowRight"){
        rightKey = true;
    }

    if(event.keyCode == shoot_key){
        ShotsP.addShot(player.x, player.y);
        document. getElementById("shot_song").setAttribute('src', 'Good_shot.mp3');
        document.getElementById("shot_song").play();
    }
}

function keyUpEvent(event){
    if(event.key === "ArrowUp"){
        upKey = false;
    } else if(event.key === "ArrowDown"){
        downKey = false;
    } else if(event.key === "ArrowLeft"){
        leftKey = false;
    } else if( event.key === "ArrowRight"){
        rightKey = false;
    }
}

function after_strike(){

    player.x = player.startX;
    player.y = player.startY;
    shots = new Shots();
    ShotsP = new PlayerShots();
    createNew = true;
}

function updatePositions(modifier) {

    player.step();

    badShips.step();

    shots.step();

    ShotsP.step();
}

function draw(){

    context.drawImage(backgroundIMG, 0, 0, canvas.width, canvas.height);

    player.draw();

    badShips.draw();

    shots.draw();

    ShotsP.draw();

    context.fillStyle = "white";
    context.font = "bold 1.2vw serif";
    context.textBaseline = "top";
    context.fillText("Strikes Left: " + strikes, canvasWidth*0.15, 5);

    context.fillStyle = "white";
    context.font = "bold 1.2vw serif";
    context.textBaseline = "top";
    context.fillText("Seconds Left To Game: " + timeLeftReal, canvasWidth*0.35, 5);

    context.fillStyle = "white";
    context.font = "bold 1.2vw serif";
    context.textBaseline = "top";
    context.fillText("Points: " + points, canvasWidth*0.7, 5);


};


function stopTimer(){

    window.clearInterval(intervalTimer);
};

function endGame(){

    badShips.speed = 6;
    document.removeEventListener("keydown", keyDownEvent);
    document.removeEventListener("keyup", keyUpEvent);
    upKey = false;
    downKey = false;
    leftKey = false;
    rightKey = false;
    window.clearInterval(updateSpeed);
    window.clearInterval(intervalTimer);
}

function showRecordsDialog(){

    tableDialog = document.getElementById("table_dialog");
    displayFinalMessage = document.getElementById("headline");
    recordsTable = document.getElementById("records");

    displayFinalMessage.innerHTML = finalMassege;

    for(var j=1; j<recordsTable.rows.length;j++){
        recordsTable.deleteRow(j);
    }

    var tempRecords = records.sort();
    tempRecords = tempRecords.reverse();

    for(var i=0; i< tempRecords.length; i++){
        row = recordsTable.insertRow(i+1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        
        cell2.innerHTML = "Game " + (i+1);
        cell1.innerHTML = tempRecords[i];

    }
    tableDialog.showModal();
}


function mainGame(){
    if(isPlaying){
        updatePositions();

        if(createNew){
            var cordinates = badShips.choose_shoter();
            shots.addShot(cordinates[0]+25, cordinates[1]+25);
        }

        if(shots.firstShot!=null){
            if((player.x<=shots.firstShot[0]) &&(shots.firstShot[0]<=player.x+canvasWidth*0.1) && (player.y<=shots.firstShot[1])&&(shots.firstShot[1]<=player.y+canvasHeight*0.15)){
                is_striked = true;
            }
        }

        if(shots.secondShot!=null){
            if((player.x<=shots.secondShot[0]) &&(shots.secondShot[0]<=player.x+canvasWidth*0.1) && (player.y<=shots.secondShot[1])&&(shots.secondShot[1]<=player.y+canvasHeight*0.15)){
                is_striked = true;
            }
        }

        if(is_striked){
            strikes -= 1;
            if(strikes>0){
                document. getElementById("crash_good_song").setAttribute('src', 'good_is_dead.mp3');
                document.getElementById("crash_good_song").play();
                after_strike();
                is_striked = false;
            }
            else{
                document. getElementById("crash_good_song").setAttribute('src', 'good_is_dead.mp3');
                document.getElementById("crash_good_song").play();
                records.push(points);
                finalMassege = "You Lost";
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(backgroundIMG, 0, 0, canvasWidth, canvasHeight);
                document.getElementById("back_song").pause()
                document.getElementById("back_song").currentTime=0
                endGame();
                document.getElementById("restart_button").style.display="none"
                showRecordsDialog();
            }
        }

        if(badShips.alive<=0){
            records.push(points);
            finalMassege = "Champion!";
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(backgroundIMG, 0, 0, canvas.width, canvas.height);
            document.getElementById("back_song").pause()
            document.getElementById("back_song").currentTime=0
            endGame();
            document.getElementById("restart_button").style.display="none"
            showRecordsDialog();
        }


        timerCount+=1;

        if (30 * timerCount >= 1000)
        {
            timerCount = 0; // reset the count
        --timeLeftReal; // decrement the timer
        ++timeElapsed; // increment the time elapsed
        }

        draw();

        // if the timer reached zero
        if (timeLeftReal <= 0)
        {
        if(points<100){
            finalMassege = "You Can Do Better ";
        } else{
            finalMassege = "Winner!";
        }
        records.push(points);
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(backgroundIMG, 0, 0, canvas.width, canvas.height);
        document.getElementById("back_song").pause()
        document.getElementById("back_song").currentTime=0
        endGame();
        document.getElementById("restart_button").style.display="none"
        showRecordsDialog();
        }
    }
};

function newGameDialog(){
    tableDialog = document.getElementById("table_dialog");
    tableDialog.close();
    document.getElementById("restart_button").style.display="inline"
    newGame();
}



function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player(x,y, height, width){
    this.startX = x;
    this.startY = y;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.xspeed = 0;
    this.yspeed = 0;
    this.friction = 0.4;
    this.maxspeed = 10;
    this.active = true;

    this.step = function(){
        if(this.active){
            if(!rightKey && !leftKey || leftKey && rightKey){
                this.xspeed *= this.friction;
            } else if(rightKey){
                this.xspeed++;
            } else if(leftKey){
                this.xspeed--;
            }

            if(!upKey && !downKey || upKey && downKey){
                this.yspeed *= this.friction;
            } else if(upKey){
                this.yspeed--;
            } else if(downKey){
                this.yspeed++;
            }
            
            if(this.xspeed > this.maxspeed){
                this.xspeed = this.maxspeed;
            } else if(this.xspeed < -this.maxspeed){
                this.xspeed = -this.maxspeed;
            }

            if(this.yspeed > this.maxspeed){
                this.yspeed = this.maxspeed;
            } else if(this.yspeed < -this.maxspeed){
                this.yspeed = -this.maxspeed;
            }

            if(this.x+this.xspeed > canvasWidth-canvasWidth*0.1){
                this.x = canvasWidth-canvasWidth*0.1;
            } else if( this.x + this.xspeed < 0){
                this.x = 0;
            }else{
                this.x += this.xspeed;
            }

            if(this.y+this.yspeed > canvasHeight-canvasHeight*0.15){
                this.y = canvasHeight-canvasHeight*0.15;
            } else if( this.y + this.yspeed < canvasHeight*0.6){
                this.y = canvasHeight*0.6;
            }else{
                this.y += this.yspeed;
            }
        }
    }

    this.draw = function(){
        
        context.drawImage(goodShipIMG, this.x, this.y, canvasWidth*0.1, canvasHeight*0.15 );
    }
}

function BadShips(x, y){
    this.exists = [
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]
    ]
    this.alive = 20;
    this.x = x;
    this.y = y;
    this. direction = true;
    this.speed = 6;
    this.heightD = canvasHeight*0.1;
    this.widthD = canvasWidth*0.1;
    this.height = canvasHeight*0.15;
    this.width = canvasWidth*0.1;
    this.column0 = 4;
    this.column1 = 4;
    this.column2 = 4;
    this.column3 = 4;
    this.column4 = 4;
    this.fromLeft = 0;
    this.fromRight = 4.5;
    this.cordinates = [
        [[this.x+this.heightD*0,this.y+this.heightD*0],[this.x+this.heightD*1,this.y+this.heightD*0],[this.x+this.heightD*2,this.y+this.heightD*0],[this.x+this.heightD*3,this.y+this.heightD*0],[this.x+this.heightD*4,this.y+this.heightD*0]],
        [[this.x+this.heightD*0,this.y+this.heightD*1],[this.x+this.heightD*1,this.y+this.heightD*1],[this.x+this.heightD*2,this.y+this.heightD*1],[this.x+this.heightD*3,this.y+this.heightD*1],[this.x+this.heightD*4,this.y+this.heightD*1]],
        [[this.x+this.heightD*0,this.y+this.heightD*2],[this.x+this.heightD*1,this.y+this.heightD*2],[this.x+this.heightD*2,this.y+this.heightD*2],[this.x+this.heightD*3,this.y+this.heightD*2],[this.x+this.heightD*4,this.y+this.heightD*2]],
        [[this.x+this.heightD*0,this.y+this.heightD*3],[this.x+this.heightD*1,this.y+this.heightD*3],[this.x+this.heightD*2,this.y+this.heightD*3],[this.x+this.heightD*3,this.y+this.heightD*3],[this.x+this.heightD*4,this.y+this.heightD*3]],
    ]


    this.step = function(){

        if(this.column1==0 && this.column2==0 && this.column3==0 && this.column4==0){
            this.fromRight = 0.5;
        } else if(this.column2==0 && this.column3==0 && this.column4==0){
            this.fromRight = 1.5
        } else if(this.column3==0 && this.column4==0){
            this.fromRight = 2.5
        } else if( this.column4==0){
            this.fromRight = 3.5
        }
    
        if(this.column0==0 && this.column1==0 && this.column2==0 && this.column3==0){
            this.fromLeft = 4;
        } else if(this.column2==0 && this.column1==0 && this.column2==0){
            this.fromLeft = 3
        } else if(this.column0==0 && this.column1==0){
            this.fromLeft = 2
        } else if( this.column0==0){
            this.fromLeft = 1
        }


        if(this.x+ canvasWidth*0.1*this.fromRight > canvasWidth){
            this.x -= this.speed;
            this.direction = false;
        } else if(this.x<0-canvasWidth*0.1*this.fromLeft){
            this.x += this.speed;
            this.direction = true;
        } else if(this.direction){
            this.x += this.speed;
        } else if(!this.direction){
            this.x -= this.speed;
        }


    }

    this.draw = function(){
        for(var i=0; i< this.exists.length; i++){
            for(var j=0; j<this.exists[i].length; j++){
                if(!this.exists[i][j]){
                    if(i==0){
                        context.drawImage(alien1, this.x+canvasWidth*0.1*j, this.y+canvasHeight*0.1*i, canvasWidth*0.04, canvasHeight*0.06);
                    } else if(i==1){
                        context.drawImage(alien2, this.x+canvasWidth*0.1*j, this.y+canvasHeight*0.1*i, canvasWidth*0.04, canvasHeight*0.06);
                    } else if(i==2){
                        context.drawImage(alien3, this.x+canvasWidth*0.1*j, this.y+canvasHeight*0.1*i, canvasWidth*0.04, canvasHeight*0.06);
                    } else if(i==3){
                        context.drawImage(alien4, this.x+canvasWidth*0.1*j, this.y+canvasHeight*0.1*i, canvasWidth*0.04, canvasHeight*0.06);
                    }
                    this.cordinates[i][j]=[this.x+canvasWidth*0.1*j, this.y+canvasHeight*0.1*i];
                }
            }  
        }
    }

    this.choose_shoter = function(){
        var i;
        var j;
        i = randomNumber(0,3);
        j = randomNumber(0,4);
        while(true){
            i = randomNumber(0,3);
            j = randomNumber(0,4);

            if(!this.exists[i][j]){
                break;
            }
        }
        return [this.cordinates[i][j][0],this.cordinates[i][j][1]];
    }

    this.exploaded = function(i,j){
        this.exists[i][j] = false;
    }
}

function Shots(){
    this.firstShot = null;
    this.secondShot = null;
    this.shotsNow = [];
    this.speed = 10;
    this.turnToCreate = 0;
    this.firstAck = false;
    this.secondAck = false;

    this.addShot = function(x,y){

         if(this.turnToCreate == 0){
            this.firstShot = [x,y];
            this.turnToCreate =1;
            createNew = false;
            this.firstAck = false;
        } else if(this.turnToCreate==1){
            this.secondShot = [x,y];
            this.turnToCreate = 0;
            createNew = false;
            this.secondAck = false;
        }
    }

    this.step = function(){
        
        if(this.firstShot != null){
            var current = this.firstShot;
            this.firstShot = [current[0], current[1]+this.speed]
            if(this.firstShot[1]>=corter_more && this.firstAck == false){
                createNew = true;
                this.firstAck = true;
            }
        }

        if(this.secondShot != null){
            var current = this.secondShot;
            this.secondShot = [current[0], current[1]+this.speed]
            if(this.secondShot[1]>=corter_more && this.secondAck == false){
                createNew = true;
                this.secondAck = true;
            }
        }
    }

    this.draw = function(){
        context.fillStyle = "orange";

        if(this.firstShot!=null){
            context.drawImage(badShotIMG, this.firstShot[0], this.firstShot[1], 30, 40);
        }

        if(this.secondShot!=null){
            context.drawImage(badShotIMG, this.secondShot[0], this.secondShot[1], 30, 40);
        }
    }
}


function PlayerShots(){
    this.existingShots = [];
    this.speed = 10;

    this.addShot = function(x ,y){
        this.existingShots.push([x,y]);
    }

    this.step = function(){

        for(var i=0; i<this.existingShots.length;i++){
            var x = this.existingShots[i][0];
            var y = this.existingShots[i][1];
            this.existingShots[i] = [x, y-this.speed];
        }
        
        for(var k=0; k< this.existingShots.length; k++){
            for(var i=0; i< badShips.exists.length; i++){
                for(var j=0; j<badShips.exists[i].length; j++){
                    if(!badShips.exists[i][j]){
                        var cordinates = badShips.cordinates[i][j];
                        if(cordinates[0]<=this.existingShots[k][0] && this.existingShots[k][0]<=cordinates[0]+badShips.width && cordinates[1]<=this.existingShots[k][1] && this.existingShots[k][1]<=cordinates[1]+badShips.height){
                            badShipHit(i, j, k);
                        }
                    }
                }  
            }
        }
    }

    this.draw = function(){

        for(var i=0; i<this.existingShots.length;i++){
            context.drawImage(goodShotIMG, this.existingShots[i][0], this.existingShots[i][1], 30, 50);
        }
    }
}


function badShipHit(i, j, k){
    document. getElementById("crash_bad_song").setAttribute('src', 'Bad_crush.mp3');
    document.getElementById("crash_bad_song").play()
    badShips.exists[i][j] = true;
    ShotsP.existingShots = ShotsP.existingShots.slice(0, k).concat(ShotsP.existingShots.slice(k+1))
    --badShips.alive;

    if(j==0){
        --badShips.column0;
    } else if(j==1){
        --badShips.column1;
    } else if(j==2){
        --badShips.column2;
    } else if(j==3){
        --badShips.column3;
    } else if(j==4){
        --badShips.column4;
    }

    if(i==0){
        points += 20;
    } else if(i==1){
        points += 15;
    } else if(i==2){
        points += 10;
    } else if(i==3){
        points += 5;
    }
}

function restartGame(){
    if(restartClicked){
        isPlaying = false;
        document.getElementById("restart_button").disable 
        document.getElementById("restart_dialog").showModal();
        restartClicked = false;
        document.getElementById("back_song").pause()
    }
}
 
function mainPage(){
    mainpage_fun();
    tableDialog.close();
}

function beginNewGame(){
    isPlaying = true;
    document.getElementById("restart_button").style.display = "inline";
    document.getElementById("restart_dialog").close();
    restartClicked = false;
    endGame();
    document.getElementById("back_song").currentTime=0
    newGame();
}

function countinueGame(){
    isPlaying = true;
    document.getElementById("restart_button").style.display = "inline";
    document.getElementById("restart_dialog").close();
    restartClicked = false;
    document.getElementById("back_song").play()

}
