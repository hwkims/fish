window.onload = function() {
    const gameContainer = document.querySelector("#game-container");
    const clickContainer = document.querySelector("#click-container");
    const fishingLine = document.querySelector("#line");
    const startScreen = document.querySelector("#start-screen");
    const startTitle = document.querySelector("#start-title");
    const infoWrapper = document.querySelector("#info-wrapper");
    const instructions = document.querySelector("#instructions");
    const startBtn = document.querySelector("#start-btn");
    const gameStats = document.querySelector("#game-stats");
    const gameGoal = document.querySelector("#game-goal");
    const gameDay = document.querySelector("#game-day");
    const gameTimer = document.querySelector("#game-timer");
    const gameTimerGauge = document.querySelector(".timer-gauge");
    const gameScore = document.querySelector("#game-score");
    var mousePosition = {
        x:0,
        y:0
    }
    var gameTimerInterval = null;
    var day = 0;
    var score = 0;
    var currentScore = 0;
    var fishTracker = [0,0,0,0] //first item is fish, second is rare fish, third is trash, fourth is jellyfish. no sharks as it will lead to autolose

    //initialise the create items interval variables
    var createFishInterval = null;
    var createFishInterval1 = null;
    var createFishInterval2 = null;
    var createFishInterval3 = null;
    var createFishInterval4 = null;
    var createFishInterval5 = null;
    var createFishInterval6 = null;
    var createFishInterval7 = null;
    var createRareFishInterval = null;
    var createTrashInterval = null;
    var createJellyfishInterval = null;
    var createSharkInterval = null;

    var days = [{
        "day": 0,
        "score": 9999999999999999999,
        
        
        "instruction": ""

        // "instruction": "<p>You are on a fishing trip!<br>There are total of 5 days to go through.<br>You need to get a certain score to proceed to the next day</p><p>Happy fishing!</p>"
    }
    // ,{
    //     "day": 1,
    //     "score": 30,
    //     "instruction": "You can catch rare fishes now.<br>They are fast, so be ready!"
    // },{
    //     "day": 2,
    //     "score": 35,
    //     "instruction": "Lately, more trash are found in the ocean.<br>There is penalty if you catch some.<br> Let's continue and avoid the trash!"
    // },{
    //     "day": 3,
    //     "score": 40,
    //     "instruction": "Jellyfishes have invaded this ocean region.<br>You will get stunned if you catch them<br>Let's continue and avoid getting stunned by them!"
    // },{
    //     "day": 4,
    //     "score": 45,
    //     "instruction": "Sharks have been sighted lately.<br>You have to restart the entire week if you catch them!<br>Let's continue and not provoke them!"
    // }
];

    //music and sounds
    var bgm; //set bgm
    var blop; //fish sound
    var rareBlop; // rare fish sound
    var trashSound; // trash sound
    var bzzt; //jellyfish zapping sound
    var bite; //shark bite sound

    //event listeners
    startBtn.addEventListener("click", startGame);
    clickContainer.addEventListener("mousemove", checkCursor);

    function checkCursor (event){
        //update cursor co ordinates
        mousePosition.x = event.clientX+50;
        mousePosition.y = event.clientY;
        //set fishing line to follow cursor
        fishingLine.style.left= mousePosition.x+"px";
        fishingLine.style.top = mousePosition.y+"px";
    }
    //create audio element for playing music and sfx
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    }
    //start game function
    function startGame () {
        //day = 4;
        //initialise sounds
        blop = new sound('sfx/fish.mp3');
        rareBlop = new sound('sfx/rare-fish.mp3');
        trashSound = new sound('sfx/trash.mp3');
        bzzt = new sound('sfx/bzzt.mp3');
        bite = new sound('sfx/bite.mp3');
        bgm = new sound('sfx/Bug_Catching.mp3');
        bgm.play();
        if (day === 0){
            fishTracker = [0,0,0,0,0];
            score = 0;
        }
        currentScore=0;
        infoWrapper.style.display = "none";
        // startTitle.style.display = "none";
        startTitle.style.display = "block";
        clickContainer.style.display = "block";
        // gameStats.style.display = "flex";
        // gameGoal.style.display = "block";
        gameStats.style.display = "none";
        gameGoal.style.display = "block";

        createItems();
    }
    //create items function
    function createItems() {
        createTimer();
        day++;
        gameDay.innerText = "Day 0"+day;
        gameGoal.innerText = `${currentScore}`;
        // gameGoal.innerText = `Goal: ${currentScore}/${days[day-1].score}`;
        //start creating items depending on the day
        switch (day) {
            case 1:
                createFishInterval = setInterval(createFish, 1000);
                createFish1Interval = setInterval(createFish1, 1500);
                createFish2Interval = setInterval(createFish2, 2000);
                createFish3Interval = setInterval(createFish3, 1300);
                createFish4Interval = setInterval(createFish4, 1200);
                createFish5Interval = setInterval(createFish5, 2500);
                createFish6Interval = setInterval(createFish6, 3000);
                createFish7Interval = setInterval(createFish7, 700);

                break;

            case 2:
                createFishInterval = setInterval(createFish, 250);
                createRareFishInterval = setInterval(createRareFish, 2200);
                break;

            case 3:
                createFishInterval = setInterval(createFish, 250);
                createRareFishInterval = setInterval(createRareFish, 1500);
                createTrashInterval = setInterval(createTrash, 1000);
                break;

            case 4:
                createFishInterval = setInterval(createFish, 250);
                createRareFishInterval = setInterval(createRareFish, 1250);
                createTrashInterval = setInterval(createTrash, 1500);
                createJellyfishInterval = setInterval(createJellyfish,2000);
                break;

            case 5:
                createFishInterval = setInterval(createFish, 200);
                createRareFishInterval = setInterval(createRareFish, 1100);
                createTrashInterval = setInterval(createTrash, 1500);
                createJellyfishInterval = setInterval(createJellyfish,2000);
                createSharkInterval = setInterval(createShark,4000);
                break;
        }
    }
    //create timer function
    function createTimer () {
        gameTimer.innerText = "60";
        gameScore.innerText = "Total Score: 0";
        let sec = 0;
        gameTimerInterval = setInterval(startGameTimer, 1000);
        function startGameTimer () {
            gameTimer.textContent = 60-sec;
            if (sec === 60) {
                sec = 0;
                endDay(false);
                gameTimer.textContent = 60-sec;
                gameTimer.classList.remove("warning");
                gameTimerGauge.classList.remove("ticking");
            }
            else {
                if (sec === 1) {
                    gameTimerGauge.classList.add("ticking");
                }
                if (sec > 9){
                    gameTimer.classList.add("warning");
                }
                // sec++
            }
        }
    }
    //create fish function
    function createFish () {
        let fish = document.createElement("div");
        fish.classList.add("item");
        fish.classList.add("fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish.classList.contains("caught")){
                fish.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish)){
                    clickContainer.removeChild(fish);
                }
            }, 350);
        }, 1000);
    }
    function createFish1 () {
        let fish1 = document.createElement("div");
        fish1.classList.add("item");
        fish1.classList.add("fish1");
        clickContainer.appendChild(fish1);
        setPosition(fish1);
        fish1.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish1.classList.contains("caught")){
                fish1.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish1)){
                    clickContainer.removeChild(fish1);
                }
            }, 350);
        }, 1000);
    }

    function createFish2 () {
        let fish2 = document.createElement("div");
        fish2.classList.add("item");
        fish2.classList.add("fish2");
        clickContainer.appendChild(fish2);
        setPosition(fish2);
        fish2.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish2.classList.contains("caught")){
                fish2.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish2)){
                    clickContainer.removeChild(fish2);
                }
            }, 350);
        }, 1000);
    }

    function createFish3 () {
        let fish3 = document.createElement("div");
        fish3.classList.add("item");
        fish3.classList.add("fish3");
        clickContainer.appendChild(fish3);
        setPosition(fish3);
        fish3.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish3.classList.contains("caught")){
                fish3.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish3)){
                    clickContainer.removeChild(fish3);
                }
            }, 350);
        }, 1000);
    }

    function createFish4 () {
        let fish4 = document.createElement("div");
        fish4.classList.add("item");
        fish4.classList.add("fish4");
        clickContainer.appendChild(fish4);
        setPosition(fish4);
        fish4.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish4.classList.contains("caught")){
                fish4.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish4)){
                    clickContainer.removeChild(fish4);
                }
            }, 350);
        }, 1000);
    }

    function createFish5 () {
        let fish5 = document.createElement("div");
        fish5.classList.add("item");
        fish5.classList.add("fish5");
        clickContainer.appendChild(fish5);
        setPosition(fish5);
        fish5.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish5.classList.contains("caught")){
                fish5.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish5)){
                    clickContainer.removeChild(fish5);
                }
            }, 350);
        }, 1000);
    }

    function createFish6 () {
        let fish6 = document.createElement("div");
        fish6.classList.add("item");
        fish6.classList.add("fish6");
        clickContainer.appendChild(fish6);
        setPosition(fish6);
        fish6.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish6.classList.contains("caught")){
                fish6.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish6)){
                    clickContainer.removeChild(fish6);
                }
            }, 350);
        }, 1000);
    }

    function createFish7 () {
        let fish7 = document.createElement("div");
        fish7.classList.add("item");
        fish7.classList.add("fish7");
        clickContainer.appendChild(fish7);
        setPosition(fish7);
        fish7.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish7.classList.contains("caught")){
                fish7.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish7)){
                    clickContainer.removeChild(fish7);
                }
            }, 350);
        }, 1000);
    }
    //create rare fish function
    function createRareFish () {
        let fish = document.createElement("div");
        fish.classList.add("item");
        fish.classList.add("rare-fish");
        clickContainer.appendChild(fish);
        setPosition(fish);
        fish.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!fish.classList.contains("caught")){
                fish.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(fish)){
                    clickContainer.removeChild(fish);
                }
            }, 350);

        }, 650);
    }
    //create trash function
    function createTrash () {
        let trash = document.createElement("div");
        trash.classList.add("item");
        trash.classList.add("trash");
        clickContainer.appendChild(trash);
        setPosition(trash);
        trash.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!trash.classList.contains("caught")){
                trash.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(trash)){
                    clickContainer.removeChild(trash);
                }
            }, 350);
        }, 3000);
    }
    //create jellyfish function
    function createJellyfish () {
        let jellyfish = document.createElement("div");
        jellyfish.classList.add("item");
        jellyfish.classList.add("jellyfish");
        clickContainer.appendChild(jellyfish);
        setPosition(jellyfish);
        jellyfish.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!jellyfish.classList.contains("caught")){
                jellyfish.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(jellyfish)){
                    clickContainer.removeChild(jellyfish);
                }
            }, 350);
        }, 3000);
    }
    //create shark function
    function createShark () {
        let shark = document.createElement("div");
        shark.classList.add("item");
        shark.classList.add("shark");
        clickContainer.appendChild(shark);
        setPosition(shark);
        shark.addEventListener("mouseover", hit);
        setTimeout(function() {
            if (!shark.classList.contains("caught")){
                shark.classList.add("disappear");
            }
            setTimeout(function() {
                if (clickContainer.contains(shark)){
                    clickContainer.removeChild(shark);
                }
            }, 350);
        }, 3000);
    }

    function setPosition(item) {
        let leftPos = Math.floor(Math.random() * (clickContainer.offsetWidth));
        let topPos = Math.floor(Math.random() * ((clickContainer.offsetHeight/5*4))+(clickContainer.offsetHeight/5));
        // if it a type of sea creature and is not trash
        if (!item.classList.contains("trash")) {
            let randomNum = Math.floor(Math.random()*2);
            //left side
            if (randomNum%2 === 0){
                if (!item.classList.contains("jellyfish")){
                    leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/4)));
                }
                else {
                    leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/2)));
                }
                setInterval(function(){
                    if (item.classList.contains("fish")) {
                        leftPos+=45;
                    }

                    else if (item.classList.contains("fish1")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("fish2")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("fish3")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("fish4")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("fish5")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("fish6")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("fish7")) {
                        leftPos+=45;
                    }
                    else if (item.classList.contains("rare-fish")){
                        leftPos+=65;
                    }
                    else if (item.classList.contains("jellyfish")){
                        leftPos+=5;
                    }
                    else if (item.classList.contains("shark")){
                        leftPos+=15;
                        if (topPos>mousePosition.y) {
                            topPos-=10;
                        }
                        else {
                            topPos+=10;
                        }
                    }
                    item.style.left = leftPos+"px";
                    item.style.top = topPos+"px";
                }, 100);
                item.classList.add("left");
            }
            //right side
            else {
                if (!item.classList.contains("jellyfish")){
                leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/4)-100)+(clickContainer.offsetWidth/4*3));
                }
                else {
                    leftPos = Math.floor(Math.random() * ((clickContainer.offsetWidth/2)-100)+(clickContainer.offsetWidth/2));
                }
                setInterval(function(){
                    if (item.classList.contains("fish")) {
                       leftPos-=45;
                    }

                    else if (item.classList.contains("fish1")) {
                        leftPos-=45;
                     }
                     else if (item.classList.contains("fish2")) {
                        leftPos-=45;
                     }
                     else if (item.classList.contains("fish3")) {
                        leftPos-=45;
                     }
                     else if (item.classList.contains("fish4")) {
                        leftPos-=45;
                     }
                     else if (item.classList.contains("fish5")) {
                        leftPos-=45;
                     }
                     else if (item.classList.contains("fish6")) {
                        leftPos-=45;
                     }
                     else if (item.classList.contains("fish7")) {
                        leftPos-=45;
                     }
                    else if (item.classList.contains("rare-fish")){
                       leftPos-=65;
                    }
                    else if (item.classList.contains("jellyfish")){
                        leftPos-=5;
                    }
                    else if (item.classList.contains("shark")){
                        leftPos-=15;
                        if (topPos>mousePosition.y) {
                            topPos-=10;
                        }
                        else {
                            topPos+=10;
                        }
                    }
                    item.style.left = leftPos+"px";
                    item.style.top = topPos+"px";
                }, 100);
                item.classList.add("right");
            }
            item.style.left = leftPos+"px"
            item.style.top = topPos+"px";
        }
        //if it is trash
        else {
            item.style.left = leftPos+"px";
            item.style.top = topPos+"px";
        }
    }
    function hit(event) {
        if (!fishingLine.classList.contains("zapped")) {
            let type = event.target.classList;
            let hitText = document.createElement('span');
            hitText.setAttribute('class','hit-text');
            this.parentNode.insertBefore(hitText,this);
            hitText.style.left = this.style.left;
            hitText.style.top = this.style.top;
            if (!this.classList.contains("caught")){
                this.classList.add("caught");
                if (type.contains("fish")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish1")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish2")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish3")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish4")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish5")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish6")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }
                else if (type.contains("fish7")) {
                    hitText.innerText = "+1";
                    hitText.style.color = "#00ffcd";
                    hitText.style.textShadow = "0px 0px 10px #00ffcd";
                    blop.play();
                    score++;
                    currentScore++;
                    fishTracker[0]++;
                }


                else if (type.contains("rare-fish")) {
                    hitText.innerText = "+5";
                    hitText.style.color = "#9766d3";
                    rareBlop.play();
                    score+=5;
                    currentScore+=5;
                    fishTracker[1]++;
                }
                else if (type.contains("trash")){
                    hitText.innerText = "-3";
                    hitText.style.color = "#ff5252";
                    trashSound.play();
                    score-=3;
                    currentScore-3;
                    fishTracker[2]++;
                }
                else if (type.contains("jellyfish")){
                    fishingLine.classList.add("zapped");
                    clickContainer.classList.add("zapped");
                    hitText.innerText = "zap!";
                    bzzt.play();
                    hitText.style.color = "#ffff33";
                    fishTracker[2]++;
                    setTimeout(function() {
                        fishingLine.classList.remove("zapped");
                        clickContainer.classList.remove("zapped");
                    }, 2000);
                }
                else if (type.contains("shark")){
                    bite.play();
                    endDay(true);
                    sec = 0;
                }
                setTimeout(function() {
                    clickContainer.removeChild(hitText);
                }, 1000);
                gameScore.innerText = `Total Score: ${score}`;
                // gameGoal.innerText = `Goal: ${currentScore}/${days[day-1].score}`;
                gameGoal.innerText = `${currentScore}`;
            }
        }
    }
    function endDay(died) {
        bgm.stop();
        clearInterval(gameTimerInterval);
        clearInterval(createFishInterval);
        clearInterval(createFish1Interval);
        clearInterval(createFish2Interval);
        clearInterval(createFish3Interval);
        clearInterval(createFish4Interval);
        clearInterval(createFish5Interval);
        clearInterval(createFish6Interval);
        clearInterval(createFish7Interval);
        clearInterval(createRareFishInterval);
        clearInterval(createTrashInterval);
        clearInterval(createJellyfishInterval);
        clearInterval(createSharkInterval);
        let remainingItems = document.querySelectorAll(".item");
        for (var i=0;i<remainingItems.length;i++){
            clickContainer.removeChild(remainingItems[i]);
        }
        gameStats.style.display = "none";
        clickContainer.style.display = "none";
        gameGoal.style.display = "none";
        startBtn.style.top = "66%";
        if (!died) {


            // console.log (`Day${day}`);
            // if (day < 5) {
            //     if (currentScore<=days[day-1].score){
            //         instructions.innerHTML = `<h2>END OF DAY 0${day}</h2>Your score for the day: ${currentScore}</p><p>Your score is not high enough. Please try again!</p>`;
            //         day=0;
            //     }
            //     else {
            //         instructions.innerHTML = `<h2>END OF DAY 0${day}</h2>Your score for the day: ${currentScore}</p><p>${days[day].instruction}</p>`;
            //     }
            // }
            // else {
            //     instructions.innerHTML = `<h2>You have finished the entire week!</h2><p>You have caught ${fishTracker[0]} fishes, ${fishTracker[1]} rare fishes, ${fishTracker[2]} trash and ${fishTracker[2]} jellyfishes.<br>Your Total Score: ${score}</p>`;
            //     day=0;
            // }
            day=0;
        }
        else {
            day = 0;
            instructions.innerHTML = `<h2>Too bad!</h2><p>You provoked the shark and it destroyed your boat.<br>Your entire week of fishing went to waste!</p>`;
        }
        infoWrapper.style.display = "block";
        startTitle.style.display = "block";
    }
    //Make bubbles
    var bubbles = document.getElementById('bubbles');
    var randomN = function(start, end){
        return Math.random()*end+start;
    };
    var bubbleNumber = 0,
    generateBubble = function(){
        if(bubbleNumber < 20){
            var bubble = document.createElement('div');
            var size = randomN(5, 10);
            bubble.setAttribute('style','width: '+size+'px; height: '+size+'px; left:'+randomN(1, bubbles.offsetWidth-(size+4) )+'px;');
            bubbles.appendChild(bubble);
            bubbleNumber++;
        }
        else {
          clearInterval(bubbleInterval);
        }
    };
    generateBubble();
    var bubbleInterval = setInterval(generateBubble, 500);

    instructions.innerHTML = `<p>${days[day].instruction}</p>`;
};