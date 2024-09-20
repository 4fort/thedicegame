const correctOrNot = document.getElementById("guessCorrectOrNot");
const hudContainerElement = document.getElementById("hud");
const hud_numberOfTries = document.getElementById("numberOfTries");
const hud_score = document.getElementById("score");
const winNumLogOutput = document.getElementById("winNumLog");
const guessLogOutput = document.getElementById("guessLog");
const gameResultsElement = document.getElementById("gameResults");
const gameRestartElement = document.getElementById("gameRestart");
const guideControlsElement = document.getElementById("guideControls");
const keyGuideElement = document.getElementById("keyGuide");
const touchGuideElement = document.getElementById("touchGuide");
const guessButtonsContainer = document.getElementById("guessButtonContainer");
const dice = document.querySelector(".dice");
const diceContainer = document.querySelector(".diceContainer");
const gameDebugElement = document.getElementById("gameDebug");
const gameVersionElement = document.getElementById("gameVersion");
const gameStartElement = document.getElementById("gameStart");
const checkboardElement = document.getElementById("checkboard");

const GAME_METADATA = {
  major: 1,
  minor: 1,
  patch: 2,
  stage: "",
};

// GAME CONSTANTS
const GAME_1_VALUES = {
  TURNS_PER_GAME: 5,
  PASSING_SCORE: 1,
  DEFAULT_DIFFICULTY: 0.1,
};
const GAME_2_VALUES = {
  TURNS_PER_GAME: 7,
  PASSING_SCORE: 3,
  DEFAULT_DIFFICULTY: 0.5,
};
// const DEFAULT_DIFFICULTY = 0.5;

const emotes = document.getElementById("emotes");
let emoteRandomizer = Math.floor(Math.random() * 4);

let winNum;
let guessNum;

// STORAGE VARIABLE
let diceSide; // WINNING NUMBER STORAGE
let guessSide; // USER GUESS STORAGE
let winNumLog = [];
let guessLog = [];
let tries;
let wins = 0;
let qualifyingScore;
let globalDelay = 4050;
let gameEndingDelay = 1500;

let timesPlayed = 0;
let itsMorhpingTime = 3;
let difficultyPercentage;

const showHud = (isShown) => {
  // console.log(isShown);
  if (isShown) {
    dice.style.pointerEvents = "all";
    guessButtonsContainer.style.display = "flex";
    guideControlsElement.style.display = "flex";
  } else {
    dice.style.pointerEvents = "none";
    guessButtonsContainer.style.display = "none";
    guideControlsElement.style.display = "none";
  }
  dice.style.animation = "none";
};

const gameModeSelect = (mode) => {
  gameStartElement.style.display = "flex";
  showHud(false);

  switch (mode) {
    case "game1":
      setup(GAME_1_VALUES);
      break;
    case "game2":
      setup(GAME_2_VALUES);
      break;
  }
};
gameModeSelect();

const setup = ({ TURNS_PER_GAME, PASSING_SCORE, DEFAULT_DIFFICULTY }) => {
  tries = TURNS_PER_GAME;
  qualifyingScore = PASSING_SCORE;

  if (
    !localStorage.getItem("skibidi") ||
    isNaN(localStorage.getItem("skibidi"))
  ) {
    localStorage.setItem("skibidi", DEFAULT_DIFFICULTY);
  }
  if (!localStorage.getItem("prevSkibidi")) {
    localStorage.setItem("prevSkibidi", DEFAULT_DIFFICULTY);
  }
  if (localStorage.getItem("prevSkibidi") !== DEFAULT_DIFFICULTY) {
    localStorage.setItem("skibidi", DEFAULT_DIFFICULTY);
    localStorage.setItem("prevSkibidi", DEFAULT_DIFFICULTY);
  }

  difficultyPercentage = Number(localStorage.getItem("skibidi"));

  gameStartElement.style.display = "none";

  showHud(true);

  console.log("difficultyPercentage: ", difficultyPercentage);
};

gameVersionElement.innerText = `v${GAME_METADATA.major}.${GAME_METADATA.minor}.${GAME_METADATA.patch}${GAME_METADATA.stage} © Fort`;

// ################## GENERATOR / DISPLAY ELEMENTS ##################

// DISPLAYS THE DICE
const diceDisplay = () => {
  for (let i = 1; i <= 6; i++) {
    dice.innerHTML += `
            <div class="face side${i}">
                <img src="assets/dice_faces/${i}.png" alt="">
            </div>
            `;
  }
};
diceDisplay();

// INITIAL EMOTE ANIMATION
const emoteDisplay = () => {
  let animator = 0;
  const animateEmote = () => {
    emotes.innerHTML = `<img src="assets/emotes/emote_${animator}.png" alt="">`;
    animator++;
    if (animator == 7) clearInterval(animteEmote_interval);
    // console.log("animateEmote()");
  };
  const animteEmote_interval = setInterval(animateEmote, 50);
};

// COIN
const coinDisplay = () => {
  let animator = 0;

  setInterval(() => {
    let triesLeftDisplay = tries ? tries : "O";

    if (tries === 0) {
      triesLeftDisplay = "O";
    }
    hud_numberOfTries.innerHTML = `
            <span>
                [&nbsp${triesLeftDisplay}&nbsp*&nbsp]&nbsp
            </span>
            <img src="assets/coin/coin_${animator}.png" alt="">
        `;
    animator++;
    if (animator == 8) animator = 0;
  }, 100);
};
coinDisplay();

// EMOTES
let emoteWinLoseID;
const emoteDisplayWinOrLose = (win) => {
  emoteDisplay();

  setTimeout(() => {
    if (diceSide <= 6 && diceSide >= 1) {
      emotes.innerHTML = `<img src="assets/emotes/emote_winNum${diceSide}.png" alt="">`;
    } else if (diceSide == 0) {
      emoteWinLose();
    } else {
      emotes.innerHTML = `<img src="assets/emotes/emote_19.png" alt="">`;
    }
  }, 400);

  // switch (diceSide) {
  //   case 1:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_winNum1.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  //   case 2:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_winNum2.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  //   case 3:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_winNum3.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  //   case 4:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_winNum4.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  //   case 5:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_winNum5.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  //   case 6:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_winNum6.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  //   default:
  //     setTimeout(() => {
  //       emotes.innerHTML = `<img src="assets/emotes/emote_19.png" alt="">`;
  //       // console.log("emoteDisplayLose()");
  //     }, 400);
  //     break;
  // }

  const emoteWinLose = () => {
    if (win) {
      emotes.innerHTML = `<img src="assets/emotes/emote_Win${
        emoteRandomizer + 1
      }.png" alt="">`;
    } else {
      emotes.innerHTML = `<img src="assets/emotes/emote_Lose${emoteRandomizer}.png" alt="">`;
    }
  };
  emoteWinLoseID = setTimeout(emoteWinLose, 3000);
};

const emoteDisplayInvalid = () => {
  emoteDisplay();

  setTimeout(() => {
    emotes.innerHTML = `<img src="assets/emotes/emote_Invalid${emoteRandomizer}.png" alt="">`;
  }, 400);
};

const emoteDisplaySpinning = () => {
  emoteDisplay();

  setTimeout(() => {
    let animator = 0;
    const animateEmote = () => {
      emotes.innerHTML = `<img src="assets/emotes/emote_Spin${animator}.png" alt="">`;
      animator++;
      if (animator == 4) animator = 0;
      // console.log('animator '+animator);
    };
    const animteEmote_interval = setInterval(animateEmote, 200);
    // ANIMATION STOPS AFTER 200ms
    setTimeout(() => {
      clearInterval(animteEmote_interval);
    }, globalDelay - 500);
  }, 200);
};

// DISPLAY HUD
const showScore = () => {
  // hud_numberOfTries animates automaticall in line 36
  let scoreDisplay = wins;
  if (wins === 0) {
    scoreDisplay = "O";
  }
  hud_score.innerHTML = `
        SCORE ${scoreDisplay}
    `;
};
showScore();

// DISPLAY THE SIX GUESS BUTTONS
const guessButtonsDisplay = () => {
  guessButtonsContainer.innerHTML = "";
  for (let i = 1; i <= 6; i++) {
    guessButtonsContainer.innerHTML += `
        <div>
            <input type="radio" name="guess_nums" value="${i}" onclick="guessButtonValue(this)" class="guess_radio" id="guessButton${i}">
            <label class="guess_Button" for="guessButton${i}">${i}</label>
        </div>
        `;
  }
};
guessButtonsDisplay();

const keyGuideDisplay = () => {
  let animator = 0;
  setInterval(() => {
    keyGuideElement.innerHTML = `
            <img src="assets/keySpace${animator}.png" alt="">
        `;
    animator++;
    if (animator == 2) animator = 0;
  }, 300);
};
keyGuideDisplay();

// const touchGuideDisplay = () => {
//   let animator = 0;
//   setInterval(() => {
//     touchGuideElement.innerHTML = `
//             <img src="assets/touch${animator}.png" alt="">
//         `;
//     animator++;
//     if (animator == 2) animator = 0;
//   }, 300);
// };
// touchGuideDisplay();

// DISPLAY GAME RESTART DIALOGUE
const gameResultsDisplay = (e) => {
  setTimeout(() => {
    gameResultsElement.style.display = "flex";

    if (e) {
      gameRestartElement.innerHTML = `
              <h1>YOU WIN!</h1>
              <h3>Claim your prize from the operator</h3>
              <div class="gameSummary">
                <div class="gameResultPlayerGuesses">
                  <p>Your guesses</p>
                  ${guessLog
                    .map((num, i) => {
                      const isWin = winNumLog[i] === num;
                      return `
                      <span class="${isWin ? "win" : "lose"}">
                        ${num}
                      </span>
                    `;
                    })
                    .join(" - ")}
                </div>
                <div class="gameResultWinningNumbers">
                  <p>Winning Numbers</p>
                  <span>${winNumLog.join(" - ")}</span>
                </div>
              </div>
              <div class="gameRestartButtons">
                  <button id="restartYes" onclick="gameRestart()">Play again</button>
              </div>
              `;
    } else {
      const guessIsPlural = qualifyingScore > 1 ? "es" : "";
      gameRestartElement.innerHTML = `
              <h1>YOU LOSE!</h1>
              <h3>you need at least ${qualifyingScore} right guess${guessIsPlural} to win</h3>
              <div class="gameSummary">
                <div class="gameResultPlayerGuesses">
                  <p>Your guesses</p>
                  ${guessLog
                    .map((num, i) => {
                      const isWin = winNumLog[i] === num;
                      return `
                      <span class="${isWin ? "win" : "lose"}">
                        ${num}
                      </span>
                    `;
                    })
                    .join(" - ")}
                </div>
                <div class="gameResultWinningNumbers">
                  <p>Winning Sides</p>
                  <span>${winNumLog.join(" - ")}</span>
                </div>
              </div>
              <div class="gameRestartButtons">
                <button id="restartYes" onclick="gameRestart()">Play again</button>
              </div>
              `;
    }
  }, gameEndingDelay);
};

// ################ DICE PROGRAM #################

// RANDOMIZES THE WINNING NUMBER
const randomizer = () => {
  //   if (DIFFICULTY === "easy") {
  //     winNum = Math.random() < 0.9 ? guessNum : Math.floor(Math.random() * 6) + 1;
  //   } else if (DIFFICULTY === "medium") {
  //     winNum = Math.random() < 0.5 ? guessNum : Math.floor(Math.random() * 6) + 1;
  //   } else if (DIFFICULTY === "hard") {
  //     winNum = Math.random() < 0.1 ? guessNum : Math.floor(Math.random() * 6) + 1;
  //   } else if (DIFFICULTY === "test") {
  //     winNum = guessNum;
  //     console.log(`TEST: ${winNum}, ${guessNum}`);
  //   }

  winNum = Math.floor(Math.random() * 6) + 1;
  console.log("===========================");
  console.log("Winning number is: ", winNum);

  //   winNum = 1;
  // console.log(winNum);
  // console.log(diceSide);
};
randomizer();

// ASSIGNS ${guessNum} FROM USER CHOICE OF NUMBER
const guessButtonValue = (e) => {
  guessNum = Number(e.value);
};

// ROLLS THE DICE AND DECIDES WHETHER THE USER WINS OR NOT
const diceRoll = () => {
  if (inputValidation()) {
    incrementTimesPlayed();

    // console.log(`${guessNum} INPUT`);
    // console.log(`${tries - 1} TRIES`);
    // ADDS SCORE WHEN USER GUESSES CORRECTLY
    if (guessNum == winNum) {
      wins++;
      console.log(`${wins} WINS`);
    } else {
      console.log(`${wins} WINS`);
    }

    // DECREMENTS NUMBER OF TRIES EVERY USER TRY
    tries--;

    // PUSHES USER GUESSES TO AN ARRAY AND DISPLAYS IT
    guessLog.push(guessNum);
    // guessLogOutput.innerHTML = guessLog.join(" - ");

    // STORES A NUMBER FROM LAST TURN NUMBERS. BECAUSE THE WINNUM IS PREDEFINED BEFORE THE GAME EVEN STARTED
    diceSide = winNum;
    guessSide = guessNum;
    rollingDiceAnimation(diceSide, guessSide, false);

    // RANDOMIZES EVERYTIME I CLICK THE DICE
    randomizer();

    // if (wins === qualifyingScore) {
    //   setTimeout(() => {
    //     gameResultsDisplay(true);
    //   }, globalDelay);
    // } else if (tries < qualifyingScore) {
    //   setTimeout(() => {
    //     gameResultsDisplay(false);
    //   }, globalDelay);
    // }

    // IF USER TRIES REACHES 0, THE GAME ENDS
    if (tries === 0) {
      // IF USER SCORES AT LEAST 3, OUTPUTS 'YOU WIN!', OTHERWISE 'YOU LOSE!'
      setTimeout(() => {
        if (wins >= qualifyingScore) {
          // SHOWS GAME RESTART POPUP WHEN GAME ENDS
          gameResultsDisplay(true);
          emoteDisplayWinOrLose(true);
        } else {
          // SHOWS GAME RESTART POPUP WHEN GAME ENDS
          gameResultsDisplay(false);
          emoteDisplayWinOrLose(false);
        }
      }, globalDelay);
    }
  }
};

const rollingDiceAnimation = (diceSide, guessSide, isRestart) => {
  showHud(false);

  keyID = undefined;
  clearTimeout(emoteWinLoseID);

  const degMax = 1080;
  const degMin = 500;
  const rX = Math.random() * (degMax - degMin) + degMin;
  const rY = Math.random() * (degMax - degMin) + degMin;
  const rZ = Math.random() * (degMax - degMin) + degMin;

  // console.log(`rX: ${rX}, rY: ${rY}`);

  let keyFrames = [
    { transform: dice.style.transform },
    { transform: `rotateX(${rX}deg) rotateY(${rY}deg) rotateZ(${rZ}deg)` },
  ];
  switch (diceSide) {
    case 1:
      keyFrames.push({ transform: "rotateX(0deg) rotateY(0deg)" });
      break;
    case 2:
      keyFrames.push({ transform: "rotateX(-90deg) rotateY(0deg)" });
      break;
    case 3:
      keyFrames.push({ transform: "rotateX(0deg) rotateY(90deg)" });
      break;
    case 4:
      keyFrames.push({ transform: "rotateX(0deg) rotateY(-90deg)" });
      break;
    case 5:
      keyFrames.push({ transform: "rotateX(90deg) rotateY(0deg)" });
      break;
    case 6:
      keyFrames.push({ transform: "rotateX(180deg) rotateY(0deg)" });
      break;
    default:
      keyFrames.push({ transform: "rotateX(-45deg) rotateY(-45deg)" });
      break;
  }
  dice.animate(keyFrames, {
    duration: globalDelay - 50,
    easing: "ease-out",
    fill: "forwards",
  });

  let containerKeyframes = [
    { transform: `scale(1)` },
    { transform: `scale(.7)` },
    { transform: `scale(1)` },
  ];
  diceContainer.animate(containerKeyframes, {
    duration: globalDelay - 50,
    easing: "cubic-bezier(0.000, 1.000, 1.000, 0.000)",
    fill: "forwards",
  });

  let bodyKeyframes = [
    { transform: `scale(1)` },
    { transform: `scale(1.05)` },
    { transform: `scale(1)` },
  ];
  document.body.animate(bodyKeyframes, {
    duration: 3800,
    easing: "cubic-bezier(0.000, 1.000, 1.000, 0.000)",
    fill: "forwards",
  });

  let hudKeyframes = [
    { transform: `scale(1)`, filter: "blur(0px)" },
    { transform: `scale(1.2)`, filter: "blur(7px)" },
    { transform: `scale(1)`, filter: "blur(0px)" },
  ];
  hudContainerElement.animate(hudKeyframes, {
    duration: globalDelay,
    easing: "cubic-bezier(0.000, 1.000, 1.000, 0.000)",
    fill: "forwards",
  });
  document.querySelector(".title").animate(hudKeyframes, {
    duration: globalDelay,
    easing: "cubic-bezier(0.000, 1.000, 1.000, 0.000)",
    fill: "forwards",
  });

  // dice.style.pointerEvents = "none";
  // guessButtonsContainer.style.display = "none";

  // REMOVES THE USER GUESS CHOICE WHEN CHOICE HAS BEEN SUBMITTED
  guessNum = undefined;
  guessButtonsDisplay();

  // guideControlsElement.style.display = "none";

  setTimeout(() => {
    if (!isRestart) {
      if (diceSide === guessSide) {
        rightGuessDisplay();
        correctOrNot.innerHTML = "You guessed right!";
        emoteDisplayWinOrLose(true);
      } else {
        wrongGuessScreenDisplay();
        correctOrNot.innerHTML = "You guessed wrong!";
        emoteDisplayWinOrLose(false);
      }
    } else {
      correctOrNot.innerHTML = "Ready to play again?";
      emoteDisplayWinOrLose(true);
    }

    keyID = 32;

    if (diceSide <= 6 && diceSide >= 1) {
      winNumLog.push(diceSide);
      // winNumLogOutput.innerHTML = winNumLog.join(" - ");
    }

    if (tries !== 0) showHud(true);

    if (wins === qualifyingScore) {
      showHud(false);
      gameResultsDisplay(true);
      emoteDisplayWinOrLose(true);
    } else if (wins < qualifyingScore - tries) {
      showHud(false);
      gameResultsDisplay(false);
      emoteDisplayWinOrLose(false);
    }

    showScore();
    displayCheckboard(diceSide === guessSide);
  }, globalDelay);
};

// VALIDATES IF THE USER SELECTS A NUMBER FROM THE BUTTONS
const inputValidation = () => {
  if (guessNum == null) {
    correctOrNot.innerHTML = "Please select any number from below.";
    emoteDisplayInvalid();
    emoteRandomizer = Math.floor(Math.random() * 4);
    return false;
  } else {
    correctOrNot.innerHTML = "";
    emoteDisplaySpinning();
    emoteRandomizer = Math.floor(Math.random() * 4);
    return true;
  }
};

const gameRestart = () => {
  // RESETS THE VALUES
  guessNum = undefined;
  guessLog = [];
  diceSide = 0;
  wins = 0;
  winNumLog = [];

  // setup();

  // REDISPLAYS THE DICE
  //   dice.innerHTML = "";
  // diceDisplay();

  // REMOVES SOME ELEMENTS AND ANIMATES DICE
  correctOrNot.innerHTML = "";
  // rollingDiceAnimation(0, undefined, true);

  // UPDATES SCORE HUD ELEMENT
  showScore();

  // RESETS GUESS LOGS
  guessLogOutput.innerHTML = "";
  // guessButtonsDisplay();

  // MAKES THE DICE CLICKABLE
  // dice.style.pointerEvents = "all";

  gameResultsElement.style.display = "none";

  checkboardElement.innerHTML = "";

  gameModeSelect();
};

const incrementTimesPlayed = () => {
  timesPlayed++;

  const morphMax = 2;
  const morphMin = 1;
  itsMorhpingTime =
    Math.floor(Math.random() * (morphMax + 1 - morphMin)) + morphMin;
  console.log("itsMorhpingTime: ", itsMorhpingTime);

  const randomNum = Math.random();

  while (winNum === guessNum) {
    randomizer();
  }
  console.log("Rerandomized winNum: ", winNum);

  if (timesPlayed >= itsMorhpingTime) {
    timesPlayed = 0;
    console.log(
      "Random Number: ",
      randomNum,
      " ; Difficulty: ",
      difficultyPercentage,
      randomNum < difficultyPercentage
    );
    winNum = randomNum < difficultyPercentage ? guessNum : winNum;
    // winNum = guessNum;
  }

  console.log(
    "TimesPlayed: ",
    timesPlayed,
    " ; ItsMorphingTime: ",
    itsMorhpingTime
  );
};

let keyID = 32;
const increaseKeyId_Primary = 190;
const decreaseKeyId_Primary = 188;
const increaseKeyId_Scondary = 67;
const decreaseKeyId_Secondary = 88;
// OPTION: X, C, V, B, N for difficulty percentage presets

document.body.onkeyup = (e) => {
  if (tries != 0) {
    if (e.keyCode == keyID) {
      diceRoll();
    }
  }
};
document.body.onkeydown = (e) => {
  if (
    e.keyCode == increaseKeyId_Primary ||
    e.keyCode == increaseKeyId_Scondary ||
    e.keyCode == decreaseKeyId_Primary ||
    e.keyCode == decreaseKeyId_Secondary
  ) {
    mutateDifficulty(e.keyCode);

    gameDebugElement.innerHTML = `${difficultyPercentage}`;
    gameDebugElement.animate({ opacity: [1, 0] }, 500);
  }
};

const mutateDifficulty = (keyCode) => {
  if (difficultyPercentage <= 0.9 && difficultyPercentage >= 0.1) {
    if (
      (keyCode === increaseKeyId_Primary ||
        keyCode === increaseKeyId_Scondary) &&
      difficultyPercentage < 0.9
    ) {
      difficultyPercentage = Math.round((difficultyPercentage + 0.1) * 10) / 10;
      console.log(difficultyPercentage);
    } else if (
      (keyCode === decreaseKeyId_Primary ||
        keyCode === decreaseKeyId_Secondary) &&
      difficultyPercentage > 0.1
    ) {
      difficultyPercentage = Math.round((difficultyPercentage - 0.1) * 10) / 10;
      console.log(difficultyPercentage);
    }
  }
  localStorage.setItem("skibidi", difficultyPercentage);
};

const rightGuessDisplay = () => {
  let isAdd = true;
  const interval = setInterval(() => {
    if (isAdd) {
      document.body.classList.add("right_guess");
      isAdd = !isAdd;
    } else {
      document.body.classList.remove("right_guess");
      isAdd = !isAdd;
    }
  }, 100);
  setTimeout(() => {
    document.body.classList.remove("right_guess");
    clearInterval(interval);
  }, 1000);
};
const wrongGuessScreenDisplay = () => {
  document.body.classList.add("wrong_guess");
  const shakeValues = {
    x: 10,
    y: 0,
  };
  const keyFrames = [
    {
      transform: "translate(0, 0)",
    },
    {
      transform: `translate(${shakeValues.x}px, ${shakeValues.y}px)`,
    },
    {
      transform: `translate(-${shakeValues.x}px, ${shakeValues.y}px)`,
    },
    {
      transform: `translate(${shakeValues.x}px, ${shakeValues.y}px)`,
    },
    {
      transform: `translate(-${shakeValues.x}px, ${shakeValues.y}px)`,
    },
    {
      transform: "translate(0, 0)",
    },
  ];

  document.body.animate(keyFrames, {
    duration: 500,
  });

  setTimeout(() => {
    document.body.classList.remove("wrong_guess");
  }, 1000);
};

const displayCheckboard = (isWin) => {
  if (isWin)
    checkboardElement.innerHTML += `<tr class="win"><td>${diceSide}</td><td>${guessSide}</td><td>✓</td></tr>`;
  else
    checkboardElement.innerHTML += `<tr><td>${diceSide}</td><td>${guessSide}</td><td>✗</td></tr>`;
};

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
