let ggPoints;
let bgPoints;
let vers;
var bgHit;
const attackPoints = 10;  // You can change the value of each attack here
const ggStartPts = 100;
const bgStartPts = 100;
// Due to the large amount of document.getElementById calls, I set constants for all of them
const introDoc = document.getElementById('game-intro');
const headDoc = document.getElementById('header');
const startBtnDoc = document.getElementById('start-buttons');
const copyrightDoc = document.getElementById('copyright');
const gameContainerDoc = document.getElementById('game-container');
const ggPtsDoc = document.getElementById('gg-hp');
const bgPtsDoc = document.getElementById('bg-hp');
const ggAtBtnDoc =  document.getElementById('gg-at-btn');
const bgAtBtnDoc = document.getElementById('bg-at-btn');
const resetBtnDoc = document.getElementById('reset-btn');
const returnBtnDoc = document.getElementById('return-btn');
const charDoc = document.getElementById('char');
const explDoc = document.getElementById('expl');
const baddieDoc = document.getElementById('baddie');
const bgImgDoc = document.getElementById('game-container');
const winDoc = document.getElementById('win');
const ggWinDoc = document.getElementById('gg-win');
const bgWinDoc = document.getElementById('bg-win');
const ggTxtDoc = document.getElementById('gg-txt');
const bgTxtDoc = document.getElementById('bg-txt');

function startGame(version) {
    hideWeb();
    initialize();
    vers=version;
    display();
}

// When link attacks Dr. Robotnik:
function ggAttack() {
    if (bgPoints - attackPoints <= 0) {  // Ensure the score doesn't go below 0.  If it does, game over!
        bgPtsDoc.innerHTML = `HP: 0`;
        gameOver(ggPoints, bgPoints);
    } else {
        bgPoints -= attackPoints;
        hit('bg');
    }

}

// When Dr. Robotnik attacks Link:
function bgAttack() {
    if (ggPoints - attackPoints <= 0) {  // Ensure the score doesn't go below 0.  If it does, game over!
        ggPtsDoc.innerHTML = `HP: 0`;
        gameOver(ggPoints, bgPoints);
    } else {
        ggPoints -= attackPoints;
        hit('gg');
    }
}

// Update the score and restart the animation after each hit
function display() {
    ggPtsDoc.innerHTML = `HP: ${ggPoints}`;
    bgPtsDoc.innerHTML = `HP: ${bgPoints}`;
    animate();
}

// Run the animation between rounds.  This uses setTimeout to have Link 
// run for a random amount of time (1-3 seconds) before Dr. Robotnik
// shows up.
function animate() {
    charDoc.src='img/char.gif';
    baddieDoc.style.display='none';
    bgImgDoc.style.backgroundImage='url("img/bg.gif")';
    setTimeout( function() {
            bgImgDoc.style.backgroundImage='url("img/bgnoanim.gif")';
            charDoc.src='img/charnoanim.gif';
            explDoc.style.display='inherit';
            setTimeout( function() {
                explDoc.style.display = 'none';
                baddieDoc.style.display = 'block';
                if (vers === '1') {
                    showButtons();
                } else {
                    randBtn();
                    bgHit = setTimeout(function() {
                        bgAttack();
                    }, 1000);
                    ggAtBtnDoc.onclick = function() {
                        clearTimeout(bgHit);
                        ggAttack();
                    }
                }
            }, 500);
    }, setTiming());
}

// This function randomly moves the 'Attack with Link' button if
// you are playing Version 2 of the game.
function randBtn() {
    ggAtBtnDoc.style.display='block';
    ggAtBtnDoc.style.position='absolute';
    ggAtBtnDoc.style.left='0';
    ggAtBtnDoc.style.transform=`translate(${randPos()})`;
}

function randPos() {
    let xPos = (Math.random() * 600).toString();
    let yPos = (Math.random() * 350).toString();
    console.log(`${xPos}px, -${yPos}px`)
    return (`${xPos}px, -${yPos}px`)
}
// Since there are several calls to hide and show the attack buttons,
// I made functions to shorten the code and reduce the chance of typos.
function hideButtons() {
    ggAtBtnDoc.style.display='none';
    bgAtBtnDoc.style.display='none';
}

function showButtons() {
    ggAtBtnDoc.style.display='inherit';
    bgAtBtnDoc.style.display='inherit';
}

// Random timer generator.  By default set to 1-3 seconds, but you
// can change the values to change the timing.
function setTiming() {
    return Math.random() * (3000 - 1000) + 1000;
}


// This function clears the characters off the screen and displays the
// "game over" text.  It also display's each character's final hit points.
function gameOver(ggscore, bgscore) {
    hideButtons();
    showResets();
    winDoc.style.display='inherit';
    if (ggscore > bgscore) {
        baddieDoc.style.display='none';
        bgWinDoc.style.display='none';
        ggWinDoc.style.display='block';
        ggTxtDoc.innerHTML=`Link finished the game with ${ggscore} hit points, 
            and Dr. Robotnik finished the game with 0 hit points.<br><br>
            Thanks for playing.  Please play again!`;
    } else {
        charDoc.style.display='none';
        ggWinDoc.style.display='none';
        bgWinDoc.style.display='block';
        bgTxtDoc.innerHTML=`Dr. Robotnik finished the game with ${bgscore} hit points,
            and Link finished the game with 0 hit points.<br><br>
            Thanks for playing.  Please play again!`;
    }
}

function showResets() {
    resetBtnDoc.style.display = 'flex';
    returnBtnDoc.style.display = 'flex';
}

function hit(playerHit) {
    hideButtons();
    if (playerHit === 'gg') {
        charDoc.src='/img/charhit.gif';
        baddieDoc.style.display='none';
        setTimeout(function() { display(); }, 750);
    } else {
        baddieDoc.src='/img/baddiehit.png';
        charDoc.style.visibility='hidden';
        setTimeout(function() { 
            charDoc.style.visibility='visible';
            baddieDoc.src='/img/baddie.png';
            display(); 
        }, 850);
    }
}

function hideWeb() {
    introDoc.style.display='none';
    startBtnDoc.style.display='none';
    copyrightDoc.style.display='none';
    headDoc.style.display='block';
    gameContainerDoc.style.display='flex';
}

function initialize() {
    ggPoints = ggStartPts;
    bgPoints = bgStartPts;
    winDoc.style.display='none';
    resetBtnDoc.style.display='none';
    returnBtnDoc.style.display='none';
    charDoc.style.display='inherit';
    baddieDoc.style.display='inherit';
}
// Resets the game after one player wins
function restart() {
    initialize();
    display();
}

function returnHome() {
    winDoc.style.display='none';
    ggPoints = 100;
    bgPoints = 100;
    headDoc.style.display='none';
    gameContainerDoc.style.display='none';
    introDoc.style.display='block';
    startBtnDoc.style.display='flex';
    copyrightDoc.style.display='block';
}