import { blueCardsData } from "../data/mythicCards/blue/index.js";
// console.log("blueCardsData", blueCardsData);
import { brownCardsData } from "../data/mythicCards/brown/index.js";
// console.log("brownCardsData", brownCardsData);
import { greenCardsData } from "../data/mythicCards/green/index.js";
// console.log("greenCardsData", greenCardsData);
import { ancientsData } from "../data/ancients.js";
// console.log("ancientsData", ancientsData);

let greenCardsDiff;
let brownCardsDiff;
let blueCardsDiff;

let quantityGreenCard;
let quantityBrownCard;
let quantityBlueCard;

const dotsStage1 = document.querySelectorAll(".dot-stage1");
const dotsStage2 = document.querySelectorAll(".dot-stage2");
const dotsStage3 = document.querySelectorAll(".dot-stage3");

const lastCard = document.querySelector(".last-card");
const cardBack = document.querySelector(".deck");
cardBack.addEventListener("click", nextCard);

let ancientNumber;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const Azathoth = document.querySelector(".ancient-azathoth");
Azathoth.style.backgroundImage = ancientsData[0].cardFace;

const Cthulhu = document.querySelector(".ancient-cthulhu");
Cthulhu.style.backgroundImage = ancientsData[1].cardFace;

const IogSothoth = document.querySelector(".ancient-iogSothoth");
IogSothoth.style.backgroundImage = ancientsData[2].cardFace;

const ShubNiggurath = document.querySelector(".ancient-shubNiggurath");
ShubNiggurath.style.backgroundImage = ancientsData[3].cardFace;

const ancientsContainer = document.querySelector(".ancients-container");
const ancientCard = ancientsContainer.querySelectorAll(".ancient-card");

let objFromAncient;
ancientsContainer.addEventListener("click", (e) => {
  deleteAncientActive();
  deleteDiffActive();
  ancientNumber = e.target.dataset.number;
  e.target.classList.add("active");
  // console.log("e.target", e.target);
  console.log("ancientNumber", ancientNumber);

  objFromAncient = ancientsData[+ancientNumber];
  console.log("objFromAncient", objFromAncient);

  quantityGreenCard = getQuantityCardСolumn(objFromAncient.stages, 0);
  quantityBrownCard = getQuantityCardСolumn(objFromAncient.stages, 1);
  quantityBlueCard = getQuantityCardСolumn(objFromAncient.stages, 2);
  console.log("quantityGreenCard!!!!", quantityGreenCard);
});

const difficultyContainer = document.querySelector(".difficulty-container");
const difficultyCard = difficultyContainer.querySelectorAll(".difficulty");
let difficultyNumber;
difficultyContainer.addEventListener("click", (e) => {
  deleteDiffActive();
  difficultyNumber = +e.target.dataset.level;
  e.target.classList.add("active");
  console.log("e.target", e.target);
  console.log("difficultyNumber", difficultyNumber);

  greenCardsDiff = choiceDifficultyOfDeck(
    difficultyNumber,
    greenCardsData,
    quantityGreenCard
  );
  console.log("greenCardsDiff", greenCardsDiff, difficultyNumber);
  brownCardsDiff = choiceDifficultyOfDeck(
    difficultyNumber,
    brownCardsData,
    quantityBrownCard
  );
  blueCardsDiff = choiceDifficultyOfDeck(
    difficultyNumber,
    blueCardsData,
    quantityBlueCard
  );
  changeDifficulty();
});

function deleteDiffActive() {
  for (let i = 0; i < difficultyCard.length; i++) {
    difficultyCard[i].classList.remove("active");
  }
}

function deleteAncientActive() {
  for (let i = 0; i < ancientCard.length; i++) {
    ancientCard[i].classList.remove("active");
  }
}

let greenCardDeck;
let brownCardDeck;
let blueCardDeck;
let finalDeck;

function changeDifficulty() {
  doCardDeck();

  let DeckStage1 = [...getStageDeck(objFromAncient.stages[0])];
  let DeckStage2 = [...getStageDeck(objFromAncient.stages[1])];
  let DeckStage3 = [...getStageDeck(objFromAncient.stages[2])];

  finalDeck = [...DeckStage3, ...DeckStage2, ...DeckStage1];
  console.log("finalDecks", finalDeck, DeckStage1, DeckStage2, DeckStage3);

  insertNumberInDot(objFromAncient.stages[0], dotsStage1);
  insertNumberInDot(objFromAncient.stages[1], dotsStage2);
  insertNumberInDot(objFromAncient.stages[2], dotsStage3);
}

function choiceDifficultyOfDeck(diffNumber, arrDeck, needQtyCard) {
  console.log("diffNumber---------", diffNumber);
  let diff1 = 0;
  let diff2 = 0;
  let diff3 = 0;
  let arr2 = [];
  if (diffNumber === 3) {
    diff1 = "normal";
    diff2 = "easy";
    diff3 = "hard";
  } else if (diffNumber > 3) {
    diff1 = "normal";
    diff2 = "";
    diff3 = "hard";
  } else if (diffNumber < 3) {
    diff1 = "normal";
    diff2 = "easy";
    diff3 = "";
  }

  const arr = arrDeck.filter(
    (item) =>
      item.difficulty === diff1 ||
      item.difficulty === diff2 ||
      item.difficulty === diff3
  );
  if (diffNumber >3 && arr.length < needQtyCard) {
    arr2 = arrDeck.filter((item) => item.difficulty === "easy");
    shuffle(arr2);
    while (arr.length < needQtyCard) {
      arr.push(arr2.pop());
    }
  } else if (diffNumber <3 && arr.length < needQtyCard) {
    arr2 = arrDeck.filter((item) => item.difficulty === "hard");
    shuffle(arr2);
    while (arr.length < needQtyCard) {
      arr.push(arr2.pop());
    }
  }
  return arr;
}

function doCardDeck() {
  shuffle(greenCardsDiff);
  greenCardDeck = greenCardsDiff.slice(0, quantityGreenCard);
  // console.log("greenCardDeck", greenCardDeck);

  shuffle(brownCardsDiff);
  brownCardDeck = brownCardsDiff.slice(0, quantityBrownCard);
  // console.log("brownCardsData", brownCardDeck);

  shuffle(blueCardsDiff);
  blueCardDeck = blueCardsDiff.slice(0, quantityBlueCard);
  // console.log("blueCardDeck", blueCardDeck);
}

function getStageDeck(arrStagesLine) {
  const y = [];
  shuffle(greenCardDeck);
  shuffle(brownCardDeck);
  shuffle(blueCardDeck);
  for (let i = 0; i < arrStagesLine[0]; i++) {
    y.push(greenCardDeck.pop());
  }
  for (let i = 0; i < arrStagesLine[1]; i++) {
    y.push(brownCardDeck.pop());
  }
  for (let i = 0; i < arrStagesLine[2]; i++) {
    y.push(blueCardDeck.pop());
  }
  shuffle(y);
  return y;
}

function insertNumberInDot(arrStagesLine, dotsStage) {
  for (let i = 0; i < 3; i++) {
    dotsStage[i].textContent = arrStagesLine[i];
  }
}

function getQuantityCardСolumn(arr, columnNumber) {
  return arr.reduce((acc, currentValue) => acc + currentValue[columnNumber], 0);
}
//исплльзует внешние переменные finalDeck-финальная колода и lastCard-выбираемая карта,
// dotsStage1,dotsStage2,dotsStage3
function nextCard() {
  if (finalDeck.length === 0) {
    lastCard.style.backgroundImage = "";
    return;
  }
  const objCard = finalDeck.pop();

  lastCard.style.backgroundImage = objCard.cardFace;
  console.log(
    "objCard.id-color-difficulty",
    objCard.id,
    objCard.color,
    objCard.difficulty
  );

  if (objCard.color == "green") {
    if (+dotsStage1[0].textContent) {
      dotsStage1[0].textContent = +dotsStage1[0].textContent - 1;
    } else if (+dotsStage2[0].textContent) {
      dotsStage2[0].textContent = +dotsStage2[0].textContent - 1;
    } else {
      dotsStage3[0].textContent = +dotsStage3[0].textContent - 1;
    }
  }
  if (objCard.color == "brown") {
    if (+dotsStage1[1].textContent) {
      dotsStage1[1].textContent = +dotsStage1[1].textContent - 1;
    } else if (+dotsStage2[1].textContent) {
      dotsStage2[1].textContent = +dotsStage2[1].textContent - 1;
    } else {
      dotsStage3[1].textContent = +dotsStage3[1].textContent - 1;
    }
  }
  if (objCard.color == "blue") {
    if (+dotsStage1[2].textContent) {
      dotsStage1[2].textContent = +dotsStage1[2].textContent - 1;
    } else if (+dotsStage2[2].textContent) {
      dotsStage2[2].textContent = +dotsStage2[2].textContent - 1;
    } else {
      dotsStage3[2].textContent = +dotsStage3[2].textContent - 1;
    }
  } else {
  }
}

