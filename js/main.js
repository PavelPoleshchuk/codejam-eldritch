import { blueCardsData } from "../data/mythicCards/blue/index.js";
// console.log("blueCardsData", blueCardsData);
import { brownCardsData } from "../data/mythicCards/brown/index.js";
// console.log("brownCardsData", brownCardsData);
import { greenCardsData } from "../data/mythicCards/green/index.js";
// console.log("greenCardsData", greenCardsData);
import { ancientsData } from "../data/ancients.js";
// console.log("ancientsData", ancientsData);

const dotsStage1 = document.querySelectorAll(".dot-stage1");
const dotsStage2 = document.querySelectorAll(".dot-stage2");
const dotsStage3 = document.querySelectorAll(".dot-stage3");

const lastCard = document.querySelector(".last-card");
const cardBack = document.querySelector(".deck");
cardBack.addEventListener("click", nextCard);

let ancientNumber = 0;

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

ancientsContainer.addEventListener("click", (e) => {
  deleteAncientActive()
  deleteDiffActive();
  ancientNumber = e.target.dataset.number;
  e.target.classList.add("active");
  console.log("e.target", e.target);
  console.log("ancientNumber", ancientNumber);
});

const difficultyContainer = document.querySelector(".difficulty-container");
const difficultyCard = difficultyContainer.querySelectorAll(".difficulty");
difficultyContainer.addEventListener("click", (e) => {
  deleteDiffActive();
  let difficultyNumber = e.target.dataset.level;
  e.target.classList.add("active");
  console.log("e.target", e.target);
  console.log("difficultyNumber", difficultyNumber);
  changeAncient();
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

let finalDeck;
function changeAncient() {
  let objFromAncient = ancientsData[+ancientNumber];
  console.log("objFromAncient", objFromAncient);

  const quantityGreenCard = getQuantityCardСolumn(objFromAncient.stages, 0);
  const quantityBrownCard = getQuantityCardСolumn(objFromAncient.stages, 1);
  const quantityBlueCard = getQuantityCardСolumn(objFromAncient.stages, 2);
  console.log("quantityGreenCard", quantityGreenCard);

  shuffle(greenCardsData);
  const greenCardDeck = greenCardsData.slice(0, quantityGreenCard);
  console.log("greenCardDeck", greenCardDeck);

  shuffle(brownCardsData);
  const brownCardDeck = brownCardsData.slice(0, quantityBrownCard);
  console.log("brownCardsData", brownCardDeck);

  shuffle(blueCardsData);
  const blueCardDeck = blueCardsData.slice(0, quantityBlueCard);
  console.log("blueCardDeck", blueCardDeck);

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
    console.log("y----", y);
    return y;
  }

  let DeckStage1 = [...getStageDeck(objFromAncient.stages[0])];
  let DeckStage2 = [...getStageDeck(objFromAncient.stages[1])];
  let DeckStage3 = [...getStageDeck(objFromAncient.stages[2])];

  finalDeck = [...DeckStage1, ...DeckStage2, ...DeckStage3].reverse();
  console.log("finalDecks", finalDeck, DeckStage1, DeckStage2, DeckStage3);

  insertNumberInDot(objFromAncient.stages[0], dotsStage1);
  insertNumberInDot(objFromAncient.stages[1], dotsStage2);
  insertNumberInDot(objFromAncient.stages[2], dotsStage3);
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
  console.log("objCard.color", objCard.color);

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

// const blueCardsData = [
//     {
//       id: 'blue1',
//       cardFace: "url(/assets/MythicCards/blue/blue1.png)",
//       difficulty: 'hard',
//       color:'blue'
//     },

//   const ancientsData = [
//     {
//       name: "azathoth",
//       cardFace: "url(/assets/Ancients/Azathoth.png)",
//       stages: [
//         [1, 1, 2],
//         [2, 1, 3],
//         [2, 0, 4],
//       ],
//     },
