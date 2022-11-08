const gameValues = () => {
    tries = 5;
    qualScore = 3;
}

const correctOrNot = document.getElementById('guessCorrectOrNot');
const hud_numberOfTries = document.getElementById('numberOfTries');
const hud_score = document.getElementById('score');
const winNumLogOutput = document.getElementById('winNumLog');
const guessLogOutput = document.getElementById('guessLog');
const gameRestartElement = document.getElementById('gameRestart');
const keyGuideElement = document.getElementById('keyGuide');
const guessButtonsContainer = document.getElementById('guessButtonContainer');
const dice = document.querySelector('.dice');

const emotes = document.getElementById('emotes');
var emoteRandomizer = Math.floor(Math.random() * 4);

var winNum;
var guessNum;
// STORAGE VARIABLE
let diceSide; // WINNING NUMBER STORAGE
let guessSide; // USER GUESS STORAGE
var winLog = [];
var guessLog = [];
var tries;
var wins = 0;
var qualScore;
var globalDelay = 4050;

gameValues();
// #STORAGE VARIABLE

// ################## GENERATOR / DISPLAY ELEMENTS ##################

// DISPLAYS THE DICE
const diceDisplay = () => {
    for(let i = 1; i <= 6; i++){
        dice.innerHTML += `
            <div class="face side${i}">
                <img src="assets/diceFaces/${i}.png" alt="">
            </div>
            `;
    }
}
diceDisplay();

// INITIAL EMOTE ANIMATION
const emoteDisplay = (animator = 0) => {
    
    const animateEmote = () => {
        emotes.innerHTML = `<img src="assets/emotes/emote_${animator}.png" alt="">`;
        animator++;
        if(animator == 7) clearInterval(animteEmote_interval);
        console.log('animateEmote()');
    };
    const animteEmote_interval = setInterval(animateEmote, 50);

}

// COIN
const coinDisplay = (animator = 0) => {
    setInterval(() => {
        hud_numberOfTries.innerHTML = `
            <span>
                [&nbsp${+tries}&nbsp*&nbsp]&nbsp
            </span>
            <img src="assets/coin/coin_${animator}.png" alt="">
        `;
        animator++;
        if(animator == 8) animator = 0;
    }, 100);
};
coinDisplay();

// EMOTES
var emoteWinLoseID;
const emoteDisplayWinOrLose = (win) => {
    emoteDisplay();

    switch(diceSide) {
        case 1:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_winNum1.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
        case 2:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_winNum2.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
        case 3:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_winNum3.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
        case 4:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_winNum4.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
        case 5:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_winNum5.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
        case 6:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_winNum6.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
        default:
            setTimeout(() => {
                emotes.innerHTML = `<img src="assets/emotes/emote_19.png" alt="">`;
                console.log('emoteDisplayLose()');
            }, 400);
        break;
    }

    const emoteWinLose = () => {
        if(win){
            emotes.innerHTML = `<img src="assets/emotes/emote_Win${emoteRandomizer + 1}.png" alt="">`;
        }
        else{
            emotes.innerHTML = `<img src="assets/emotes/emote_Lose${emoteRandomizer}.png" alt="">`;
        }
    };
    emoteWinLoseID = setTimeout(emoteWinLose, 3000)
};

const emoteDisplayInvalid = () => {
    emoteDisplay();
    
    setTimeout(() => {
        emotes.innerHTML = `<img src="assets/emotes/emote_Invalid${emoteRandomizer}.png" alt="">`;
    }, 400);
};

const emoteDisplaySpinning = () => {
    emoteDisplay();

    setTimeout((animator = 0) => {
        const animateEmote = () => {
            emotes.innerHTML = `<img src="assets/emotes/emote_Spin${animator}.png" alt="">`;
            animator++;
            if(animator == 4) animator = 0;
            // console.log('animator '+animator);
        };
        const animteEmote_interval = setInterval(animateEmote, 200);
        // ANIMATION STOPS AFTER 200ms
        setTimeout(() => {
            clearInterval(animteEmote_interval);
        }, globalDelay - 500);
    }, 200);
}

// DISPLAY HUD
const hudDisplay = () => {
    // hud_numberOfTries animates automaticall in line 36
    hud_score.innerHTML = `
        SCORE ${wins}
    `;
}
hudDisplay();

// DISPLAY THE SIX GUESS BUTTONS
const guessButtonsDisplay = () => {
    guessButtonsContainer.innerHTML = '';
    for(let i = 1; i <= 6; i++){
        guessButtonsContainer.innerHTML += `
        <div>
            <input type="radio" name="guess_nums" value="${i}" onclick="guessButtonValue(this)" class="guess_radio" id="guessButton${i}">
            <label class="guess_Button" for="guessButton${i}">${i}</label>
        </div>
        `;
    }
}
guessButtonsDisplay();

const keyGuideDisplay = (animator = 0) => {
    setInterval(() => {
        keyGuideElement.innerHTML = `
            <img src="assets/keySpace${animator}.png" alt="">
        `;
        animator++;
        if(animator == 2) animator = 0;
    }, 300);
}
keyGuideDisplay();

// DISPLAY GAME RESTART DIALOGUE
const gameRestartDisplay = (e) => {

    
    if(e){
        setTimeout(() => {
            gameRestartElement.innerHTML = `
            <h1>YOU WIN!</h1>
            <div class="gameRestartButtons">
                <button id="restartYes" onclick="gameRestart()">Play again</button>
                <button id="restartRate" onclick="gameRate()">Rate the game</button>
            </div>
            `;
        }, 50);
    }
    else{
        setTimeout(() => {
            gameRestartElement.innerHTML = `
            <h1>YOU LOSE!</h1>
            <div class="gameRestartButtons">
                <button id="restartYes" onclick="gameRestart()">Play again</button>
                <button id="restartRate" onclick="gameRate()">Rate the game</button>
            </div>
            `;
        }, 50);
    }
}

// ################ DICE PROGRAM #################

// RANDOMIZES THE WINNING NUMBER
const randomizer = () => {
    winNum = Math.floor(Math.random() * 6) + 1;
    console.log(winNum);
}
randomizer();

// ASSIGNS ${guessNum} FROM USER CHOICE OF NUMBER
const guessButtonValue = (e) => {    
    guessNum = Number(e.value);
}

// ROLLS THE DICE AND DECIDES WHETHER THE USER WINS OR NOT
var keyID = 32;
document.body.onkeyup = (e) => {
    if(tries != 0){
        if(e.keyCode == keyID) {
            diceRoll();
        }
    }
}
const diceRoll = () => {
    if(inputValidation()){
        console.log(`${guessNum} INPUT`)
        console.log(`${tries - 1} TRIES`);
        // ADDS SCORE WHEN USER GUESSES CORRECTLY
        if(guessNum == winNum){
            wins++;
            console.log(`${wins} WINS`);
        }
        else{
            console.log(`${wins} WINS`);
        }
    
        // DECREMENTS NUMBER OF  TRIES EVERY USER TRY
        tries--
        // IF USER TRIES REACHES 0, THE GAME ENDS
        if(tries === 0){
            dice.style.pointerEvents = 'none';
            // IF USER SCORES AT LEAST 3, OUTPUTS 'YOU WIN!', OTHERWISE 'YOU LOSE!'
            setTimeout(() => {
                if(wins >= qualScore){
                    // SHOWS GAME RESTART POPUP WHEN GAME ENDS
                    gameRestartElement.style.display = 'flex';
                    gameRestartDisplay(true);
                    emoteDisplayWinOrLose(true);
                }
                else{ 
                    // SHOWS GAME RESTART POPUP WHEN GAME ENDS
                    gameRestartElement.style.display = 'flex';
                    gameRestartDisplay();
                    emoteDisplayWinOrLose(false);
                }
            }, globalDelay);
        }
        else{
            dice.style.pointerEvents = 'all';
        }

        // PUSHES USER GUESSES TO AN ARRAY AND DISPLAYS IT
        guessLog.push(guessNum);
        guessLogOutput.innerHTML = guessLog.join(' - ');

        // STORES A NUMBER FROM LAST TURN NUMBERS. BECAUSE THE WINNUM IS PREDEFINED BEFORE THE GAME EVEN STARTED
        diceSide = winNum;
        guessSide = guessNum;
        rollingDiceAnimation(diceSide, guessSide);

        // RANDOMIZES EVERYTIME I CLICK THE DICE
        randomizer();
    }
}

const rollingDiceAnimation = (diceSide, guessSide) => {
    keyID = undefined;
    clearTimeout(emoteWinLoseID);

    dice.style.animation = 'rolling 4s';
    dice.style.pointerEvents = 'none';
    guessButtonsContainer.style.display = 'none';

    // REMOVES THE USER GUESS CHOICE WHEN CHOICE HAS BEEN SUBMITTED
    guessNum = undefined;
    guessButtonsDisplay();

    keyGuideElement.style.display = 'none';
    setTimeout(() => {
        switch (diceSide) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;
            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;
            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;
            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;
            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;
            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;
            default:
                dice.style.transform = 'rotateX(-45deg) rotateY(-45deg)';
                break;
        }

        if(diceSide == guessSide){
            correctOrNot.innerHTML = 'You guessed right!';
            emoteDisplayWinOrLose(true);
        }
        else{
            correctOrNot.innerHTML = 'You guessed wrong!';
            emoteDisplayWinOrLose();
        }

        keyID = 32;
        
        winLog.push(diceSide);
        winNumLogOutput.innerHTML = winLog.join(' - ');

        dice.style.animation = 'none';
        dice.style.pointerEvents = 'all';
        guessButtonsContainer.style.display = 'flex';

        keyGuideElement.style.display = 'block';
        hudDisplay();
    },globalDelay);
}

// VALIDATES IF THE USER SELECTS A NUMBER FROM THE BUTTONS
const inputValidation = () => {
    if(guessNum == null){
        correctOrNot.innerHTML = 'Please select any number from below.';
        emoteDisplayInvalid();
        emoteRandomizer = Math.floor(Math.random() * 4);
        return false;
    }
    else{
        correctOrNot.innerHTML = '';
        emoteDisplaySpinning();
        emoteRandomizer = Math.floor(Math.random() * 4);
        return true;
    }
}

const gameRestart = () => {

    // RESETS THE VALUES
    guessNum = undefined;
    guessLog = [];
    wins = 0;
    gameValues();

    // REDISPLAYS THE DICE
    dice.innerHTML = '';
    diceDisplay();

    // REMOVES SOME ELEMENTS AND ANIMATES DICE
    correctOrNot.innerHTML = '';
    rollingDiceAnimation();
    emoteDisplaySpinning();
    setTimeout(() => {
        correctOrNot.innerHTML = '';
        emoteDisplayWinOrLose(true);
    }, globalDelay);

    // UPDATES HUD ELEMENT
    hudDisplay();

    // RESETS GUESS LOGS
    guessLogOutput.innerHTML = '';
    guessButtonsDisplay();

    // MAKES THE DICE CLICKABLE 
    dice.style.pointerEvents = 'all';

    gameRestartElement.innerHTML = '';
    gameRestartElement.style.display = 'none';

}

// ############ GAME RATING ###############
const perfectLagi = document.getElementById('perfectKoSir');
const gameRate = () => {

    perfectLagi.style.display = 'flex';
}

const perfectKoSir_diliPwede = (x,y) => {
    const perfectKoSir_diliPwedeButton = document.getElementById('perfectKoSir_diliPwede');
    x = Math.ceil(Math.random() * 250) * (Math.round(Math.random()) ? 1 : -1);
    y = Math.ceil(Math.random() * 250) * (Math.round(Math.random()) ? 1 : -1);

    perfectKoSir_diliPwedeButton.style.transform = `translate(${x*2}%, ${y*2}%)`;
}

const perfectKoSir_omsim = () => {
    perfectLagi.innerHTML = `<img src="assets/omsim.gif" alt="">`;
    perfectLagi.classList.add('perfectKoSir_omsim')
}

// TO ADD
// ADD SETTINGS 
// ADD TURN ON MUSIC OR OFF SOUND FX
// ADD CHEAT MODE TOGGLE - UNLI ROLLS, SHOWS THE CURRENT CORRECT NUMBER

// FEATURES
// *RECORDS USER SCORE 
// *SHOWS USERS REMAINING TRIES
// *SHOWS IF THE USER GUESSED RIGHT OR NOT EVERY TURN
// *HAS VALIDATION IF USER HAS PICKED A NUMBER OR NOT
// *CLICK ON THE DICE TO ROLL OR PRESS THE SPACE BAR
// *MANUALLY ANIMATED DICE, EMOTES, COIN, AND KEYGUIDE
// *ANTI SPAM FEATURE
// *CAN PLAY AGAIN WHEN GAME ENDS
// *CAN RATE MY GAME ;)
