/*
 * ISSUE: randomize board on start, poop and when won. (only active cards)
 *
 */
const birdcage = document.getElementById("birdcage");

const cardspaces = birdcage.getElementsByClassName("cardspace");

const backsOfCards = birdcage.getElementsByClassName("back");

const symbols = new Array("🍄", "🍑", "🍌", "🥑", "💩");

let activeSymbols = symbols;

const choosenCards = new Array();

let randomList = new Array(
  "🍄",
  "🍑",
  "🍌",
  "🥑",
  "💩",
  "🍄",
  "🍑",
  "🍌",
  "🥑"
);

randomizeBoard();

for (const cardspace of cardspaces) {
  cardspace.addEventListener("click", switchCard);
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function switchCard(event) {
  choosenCards.push(event.currentTarget.id);

  if (choosenCards.length === 2) {
    console.log("You choose 2, reset");
    checkSame();
  }

  switchVisibility(event.currentTarget, ".back");
  switchVisibility(event.currentTarget, ".front");
}

function switchVisibility(cardspace, elementClass) {
  const element = cardspace.querySelector(elementClass);
  element.classList.toggle("visible");
}

function getEmoji(choosenCards) {
  const cardspace1 = document.getElementById(choosenCards);
  const backcard1 = cardspace1.querySelector(".back");
  const emoji1 = backcard1.innerHTML.replaceAll(/\s/g, "");
  return emoji1;
}

function handleMatch(emoji1, cardspace1, cardspace2) {
  cardspace1.removeEventListener("click", switchCard);
  cardspace2.removeEventListener("click", switchCard);
  const symbolIndex = activeSymbols.findIndex((symbol) => {
    return symbol === emoji1;
  });
  console.log(activeSymbols);
  activeSymbols.splice(symbolIndex, 1);
  if (activeSymbols.length === 1) {
    resetBoard();
  }
}

function handleMismatch(cardspace1, cardspace2) {
  setTimeout(function () {
    switchVisibility(cardspace1, ".back");
    switchVisibility(cardspace1, ".front");
    switchVisibility(cardspace2, ".back");
    switchVisibility(cardspace2, ".front");
  }, 1000);
}

function checkSame() {
  const choosenCard1 = choosenCards.pop();
  const cardspace1 = document.getElementById(choosenCard1);
  const emoji1 = getEmoji(choosenCard1);
  const choosenCard2 = choosenCards.pop();
  const cardspace2 = document.getElementById(choosenCard2);
  const emoji2 = getEmoji(choosenCard2);

  if (emoji1 === emoji2) {
    if (cardspace1 !== cardspace2) {
      console.log(emoji1, "is the same as ", emoji2);
      handleMatch(emoji1, cardspace1, cardspace2);
    }
  } else {
    handleMismatch(cardspace1, cardspace2);
    console.log(emoji1, "is NOT the same as ", emoji2);
  }
}

function resetBoard() {
  setTimeout(function () {
    for (const cardspace of cardspaces) {
      cardspace.addEventListener("click", switchCard);
      const backCard = cardspace.querySelector(".back");
      if (backCard.innerHTML.replaceAll(/\s/g, "") !== "💩") {
        switchVisibility(cardspace, ".back");
        switchVisibility(cardspace, ".front");
      }
    }
    randomizeBoard();
  }, 2000);
}

function randomizeBoard() {
  activeSymbols = new Array("🍄", "🍑", "🍌", "🥑", "💩");

  shuffleArray(randomList);
  let iterator = 0;
  for (const backOfCard of backsOfCards) {
    const emoji = randomList[iterator++];
    backOfCard.innerHTML = emoji;
  }
}
