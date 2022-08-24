import { blueCardsData } from "../data/mythicCards/blue/index.js";
console.log("blueCardsData", blueCardsData);
import { brownCardsData } from "../data/mythicCards/brown/index.js";
console.log("brownCardsData", brownCardsData);
import { greenCardsData } from "../data/mythicCards/green/index.js";
console.log("greenCardsData", greenCardsData);
import { ancientsData } from "../data/ancients.js";
console.log("ancientsData", ancientsData);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const Azathoth = document.querySelector(".ancient-azathoth");
console.log("Azathoth", Azathoth);

const objFromAncient = ancientsData[0];
Azathoth.style.backgroundImage = ancientsData[0].cardFace;

function getQuantityCardСolumn(arr, columnNumber) {
  return arr.reduce((acc, currentValue) => acc + currentValue[columnNumber], 0);
}

const quantityGreenCard = getQuantityCardСolumn(objFromAncient.stages, 0);
const quantityBrownCard = getQuantityCardСolumn(objFromAncient.stages, 1);
const quantityBlueCard = getQuantityCardСolumn(objFromAncient.stages, 2);
console.log(
  "getQuantityCardСolumn",
  quantityGreenCard,
  quantityBrownCard,
  quantityBlueCard
);

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

const DeckStage1 = [...getStageDeck(objFromAncient.stages[0])];
const DeckStage2 = [...getStageDeck(objFromAncient.stages[1])];
const DeckStage3 = [...getStageDeck(objFromAncient.stages[2])];
const finalDeck = [...DeckStage1, ...DeckStage2, ...DeckStage3].reverse();

console.log("finalDecks", finalDeck, DeckStage1, DeckStage2, DeckStage3);

const dotsStage1 = document.querySelectorAll(".dot-stage1");
const dotsStage2 = document.querySelectorAll(".dot-stage2");
const dotsStage3 = document.querySelectorAll(".dot-stage3");

function insertNumberInDot(arrStagesLine, dotsStage) {
  for (let i = 0; i < 3; i++) {
    dotsStage[i].textContent = arrStagesLine[i];
  }
}
insertNumberInDot(objFromAncient.stages[0], dotsStage1);
insertNumberInDot(objFromAncient.stages[1], dotsStage2);
insertNumberInDot(objFromAncient.stages[2], dotsStage3);

const cardBack = document.querySelector(".deck");
const lastCard = document.querySelector(".last-card");

cardBack.addEventListener("click", nextCard);

function nextCard() {
  const objCard = finalDeck.pop();
  if (finalDeck.length === 0) {
    lastCard.style.backgroundImage = "";
    return;
  }
  lastCard.style.backgroundImage = objCard.cardFace;
  console.log(objCard.color);

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












// playListContainer.addEventListener("click", (e) => {
//   playNum=e.target.dataset.track;
//   console.log('e.target',e.target);
//   playPauseAudio();
// });

// dotsStage1[0].textContent=+dotsStage1[0].textContent+10;

// console.log('content', objCard.color,finalDeck);

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

// document.addEventListener("click", (e) => {
//   console.log(e);
// });

//   function getBodyBG() {
//     const img = new Image();
//     img.src = setBg();
//     img.onload = () => {
//       document.body.style.backgroundImage = `url(${setBg()})`;
//     };
//   }
//   getBodyBG();
// //Максимум и минимум включаются
// function getRandom(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
