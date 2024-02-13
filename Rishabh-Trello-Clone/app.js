let boardsArray = [];
let boardsArrayFromLocalStorage = localStorage.getItem("boardsData");

if (boardsArrayFromLocalStorage) {
  boardsArray = JSON.parse(boardsArrayFromLocalStorage);
}

// let dropableCardContainer;
const addBoardForm = document.querySelector(".add-board-form-container");
const addBoardBtn = document.querySelector(".add-board-btn");

const boardsDiv = document.querySelector(".boards");
const addFormContainer = document.querySelector(
  ".add-board-input-form-container"
);

// add board form display
addBoardBtn.addEventListener("click", () => {
  addBoardForm.style.display = "block";
});

// remove add board form
const removeAddBoardForm = () => {
  addBoardForm.style.display = "none";
};

// add board
const addBoard = (e) => {
  const boardName = e.parentNode.previousElementSibling.childNodes[1].value;
  if (!boardName) {
    alert("Please enter board name");
    return;
  }

  let boardId = localStorage.getItem("boardId");
  if (!boardId) {
    boardId = 101;
  }
  boardId = Number(boardId);
  let boardObj = {
    boardId: boardId,
    boardName: boardName,
    cardsData: [],
  };

  boardsArray.push(boardObj);
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));
  boardId = boardId + 1;
  localStorage.setItem("boardId", boardId);
  boardName.value = "";
  displayData();
  addBoardForm.style.display = "none";
};

// add card
const addCardForm = (e, boardId) => {
  const taskCardContainet = e.parentNode.previousElementSibling;
  const addBoardFormDiv = document.createElement("div");
  addBoardFormDiv.setAttribute("class", "add-card-form-container");
  addBoardFormDiv.innerHTML = `<div class="add-board-input-container">
    <input type="text" name="" id="" placeholder="Enter Card Title">
</div>
<div class="add-board-form-btn-container">
    <button class="add-board-name-btn" onclick="addTaskCard(this, ${boardId})">Add</button>
    <button class="remove-board-form-btn" onclick="removeAddCardForm(this)">X</button>
</div>`;

  taskCardContainet.appendChild(addBoardFormDiv);
  e.style.display = "none";
};

// remove add task card contents
const removeAddCardForm = (e) => {
  e.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].style.display =
    "block";
  // addBoardForm.style.display = "block";
  e.parentNode.parentNode.remove();
};

// add task card
const addTaskCard = (e, boardId) => {
  const cardTitle = e.parentNode.previousElementSibling.childNodes[1].value;
  if (!cardTitle) {
    alert("please enter card Title");
    return;
  }

  let cardId = localStorage.getItem("cardId");

  if (!cardId) {
    cardId = 1001;
  }

  const myBoard = boardsArray.find((board) => board.boardId === boardId);
  const index = boardsArray.findIndex(
    (board) => board.boardId === myBoard.boardId
  );
  let cardDataArray = boardsArray[index].cardsData;

  cardId = Number(cardId);
  let cardObj = {
    cardId: cardId,
    cardTitle: cardTitle,
  };

  cardDataArray.push(cardObj);
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));
  cardId = cardId + 1;
  localStorage.setItem("cardId", cardId);

  displayData();

  e.parentNode.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].style.display =
    "block";
  e.parentNode.parentNode.remove();
};

// remove card
const removeCard = (cardId) => {
  let index = findIndexWithCardId(boardsArray, cardId);
  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);
  cardsArray.splice(cardsArrayIndex, 1);

  localStorage.setItem("boardsData", JSON.stringify(boardsArray));
  displayData();
};

// remove board
const removeBoard = (boardId) => {
  const index = findIndexByBoardId(boardId);
  boardsArray.splice(index, 1);
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));
  displayData();
};

// find array index using boardId
function findIndexByBoardId(boardId) {
  for (let i = 0; i < boardsArray.length; i++) {
    if (boardsArray[i].boardId == boardId) {
      return i; // return the index of the board object
    }
  }
  return -1; // return -1 if boardId is not found
}

// display data function   boardsDiv
const displayData = () => {
  // localStorage.clear();
  boardsDiv.innerHTML = "";
  const result = localStorage.getItem("boardsData");
  const allBoards = JSON.parse(result);
  let taskCardContainerId = 1;

  allBoards.forEach((board) => {
    const createBoard = document.createElement("div");
    createBoard.setAttribute("class", "board");
    createBoard.innerHTML = `<div class="board-title-container">
        <p>${board.boardName}</p>
        <input type="hidden" name="myHiddenField" value="${board.boardId}">
        <p onclick="removeBoard(${board.boardId})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg></p>
       </div>
       <div class="cards-conatiner">
        <div class="cards">
            
            <div class="task-card-container" id="taskCardContainer-${taskCardContainerId}">
                
            </div>
   
            <div class="add-card-btn-cotainer">
                <button class="add-card-btn" onclick="addCardForm(this, ${board.boardId})">Add Card</button>
            </div>
        </div>
       </div> `;
    boardsDiv.appendChild(createBoard);

    const taskCardContainerDiv = document.querySelector(
      "#taskCardContainer-" + taskCardContainerId
    );

    board.cardsData.forEach((card) => {
      const createCard = document.createElement("div");
      createCard.setAttribute("class", "card");
      createCard.innerHTML = `
        <div class="card-title-container">
        <p class="card-title" style="background-color: ${card.color};">${
        card.lable ? card.lable : ""
      }</p>
        <input type="hidden" name="myHiddenField" value="${card.cardId}">
        <span class="remove-card-btn" onclick="removeCard(${card.cardId})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
        </span>
    </div>
    
    <div class="task-container">
        <p class="task">${card.cardTitle}</p>
    </div>

    <div class="more-btn-container" onclick="displayModal(${card.cardId})">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="17" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="17" y1="18" x2="3" y2="18"></line></svg>
    </div>`;

      taskCardContainerDiv.appendChild(createCard);
    });

    taskCardContainerId++;
  });

  // add drag event on card  task-card-container
  const dropableCardContainer = document.querySelectorAll(
    ".task-card-container"
  );
  const dragableCards = document.querySelectorAll(".card");

  dragableCards.forEach((dragableCard) => {
    dragableCard.addEventListener("dragstart", () => {
      console.log("drag start");
      dragableCard.classList.add("dragging");
    });
  });

  dropableCardContainer.forEach((dropableCard) => {
    dropableCard.addEventListener("dragover", (e) => {
      console.log("drag over");
      e.preventDefault();
    });

    dropableCard.addEventListener("drop", (e) => {
      console.log("drop");
      const draggingCard = document.querySelector(".dragging");
      dropableCard.appendChild(draggingCard);

      const cardId =
        document.querySelector(".dragging").childNodes[1].childNodes[3].value;
      let index = findIndexWithCardId(boardsArray, cardId);
      let cardsArray = boardsArray[index].cardsData;
      let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);
      let cardObj = cardsArray[cardsArrayIndex];

      cardsArray.splice(cardsArrayIndex, 1);
      const boardId =
        dropableCard.parentNode.parentNode.parentNode.childNodes[0]
          .childNodes[3].value;
      const boardIndex = findIndexByBoardId(boardId);
      boardsArray[boardIndex].cardsData.push(cardObj);

      localStorage.setItem("boardsData", JSON.stringify(boardsArray));
      displayData();
      draggingCard.classList.remove("dragging");
    });
  });
};

// display modal
const displayModal = (cardId) => {
  let index = findIndexWithCardId(boardsArray, cardId);
  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);

  const description = cardsArray[cardsArrayIndex].description;
  const date = cardsArray[cardsArrayIndex].date;
  const lable = cardsArray[cardsArrayIndex].lable;

  document.querySelector(".modal-conatiner").style.display = "block";
  let cardTitle = document.querySelector(".card-title ");
  let cardDescription = document.querySelector(".card-description");
  let cardDate = document.querySelector(".card-date");
  let cardLable = document.querySelector(".card-lable");

  document.querySelector(".des-card-id").value =
    cardsArray[cardsArrayIndex].cardId;

  cardTitle.innerText = cardsArray[cardsArrayIndex].cardTitle;
  cardDescription.innerText = description ? description : "Add Description";
  cardDate.value = date ? date : null;
  cardLable.innerText = lable ? lable : "Add Lable";

  //  update card title
  cardTitle.addEventListener("click", (e) => {
    let cardTitleCon = document.getElementById("card-tittle-con");
    cardTitleCon.style.display = "block";
    e.target.style.display = "none";
  });

  // upadte card description
  cardDescription.addEventListener("click", (e) => {
    let carddesCon = document.getElementById("card-des-con");
    carddesCon.style.display = "block";
    e.target.style.display = "none";
  });

  // update card date
  cardLable.addEventListener("click", (e) => {
    let cardLableCon = document.getElementById("card-lab-con");
    cardLableCon.style.display = "block";
    e.target.style.display = "none";
  });
};

// get card title
function addCardTitle() {
  let cardTitleInputValue = document.querySelector(".card-title-input").value;
  let cardId = document.querySelector(".des-card-id").value;

  let index = findIndexWithCardId(boardsArray, cardId);

  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);

  cardsArray[cardsArrayIndex].cardTitle = cardTitleInputValue;
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));

  document.getElementById("card-tittle-con").style.display = "none";
  document.querySelector(".card-title").style.display = "block";
  cardTitleInputValue.innerText = "";
  displayData();
  displayModal(cardId);
}

// add card description
function addCardDes() {
  let cardDesInputValue = document.querySelector(".card-des-input").value;
  let cardId = document.querySelector(".des-card-id").value;

  let index = findIndexWithCardId(boardsArray, cardId);

  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);

  cardsArray[cardsArrayIndex].description = cardDesInputValue;
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));

  document.getElementById("card-des-con").style.display = "none";
  document.querySelector(".card-description").style.display = "block";
  cardDesInputValue.innerText = "";
  displayData();
  displayModal(cardId);
}

// add date
function cardDate() {
  let cardDateInputValue = document.querySelector(".card-date").value;
  let cardId = document.querySelector(".des-card-id").value;

  let index = findIndexWithCardId(boardsArray, cardId);

  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);

  cardsArray[cardsArrayIndex].date = cardDateInputValue;
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));
  displayData();
  displayModal(cardId);
}

// add card lable
function addCardLable() {
  let cardLableInputValue = document.querySelector(".card-lable-input").value;
  let cardId = document.querySelector(".des-card-id").value;

  let index = findIndexWithCardId(boardsArray, cardId);

  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);

  cardsArray[cardsArrayIndex].lable = cardLableInputValue;
  cardsArray[cardsArrayIndex].color = "rgb(141, 163, 119)";
  localStorage.setItem("boardsData", JSON.stringify(boardsArray));

  document.getElementById("card-lab-con").style.display = "none";
  document.querySelector(".card-lable").style.display = "block";
  cardLableInputValue.innerText = "";
  displayData();
  displayModal(cardId);
}

// get color
const getColor = document.querySelector(".colors");
getColor.addEventListener("click", (e) => {
  let cardId = document.querySelector(".des-card-id").value;

  let index = findIndexWithCardId(boardsArray, cardId);

  let cardsArray = boardsArray[index].cardsData;
  let cardsArrayIndex = findIndexInCardsData(cardsArray, cardId);

  if (e.target.className == "red") {
    cardsArray[cardsArrayIndex].color = "rgb(168, 25, 61)";
  } else if (e.target.className == "cyan") {
    cardsArray[cardsArrayIndex].color = "rgb(30, 191, 250)";
  } else if (e.target.className == "lightGreen") {
    cardsArray[cardsArrayIndex].color = "rgb(141, 163, 119)";
  } else if (e.target.className == "green") {
    cardsArray[cardsArrayIndex].color = "rgb(79, 204, 37)";
  } else if (e.target.className == "yellow") {
    cardsArray[cardsArrayIndex].color = "rgb(153, 117, 189)";
  } else if (e.target.className == "pink") {
    cardsArray[cardsArrayIndex].color = "rgb(207, 97, 161)";
  } else if (e.target.className == "blue") {
    cardsArray[cardsArrayIndex].color = "rgb(36, 9, 89)";
  }

  localStorage.setItem("boardsData", JSON.stringify(boardsArray));
  displayData();
  displayModal(cardId);
});

// remove card description form
function removeCardDesForm() {
  document.querySelector("#card-tittle-con").style.display = "none";
  document.querySelector(".card-title").style.display = "block";
}

function removeCardDesForm() {
  document.querySelector("#card-des-con").style.display = "none";
  document.querySelector(".card-description").style.display = "block";
}

function removeCardDesForm() {
  document.querySelector("#card-lab-con").style.display = "none";
  document.querySelector(".card-lable").style.display = "block";
}

//  find index using card id
function findIndexWithCardId(array, cardIdToFind) {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].cardsData.length; j++) {
      if (array[i].cardsData[j].cardId == cardIdToFind) {
        return i; // Return the index of the array where cardId is found
      }
    }
  }
  return -1; // Return -1 if cardId is not found
}

// find array index in cards data array
function findIndexInCardsData(cardsArray, cardIdToFind) {
  for (let i = 0; i < cardsArray.length; i++) {
    if (cardsArray[i].cardId == cardIdToFind) {
      return i; // Return the index of the object where cardId is found
    }
  }
  return -1; // Return -1 if cardId is not found
}

function closeModal() {
  document.querySelector(".modal-conatiner").style.display = "none";
}

// documnt on load event
document.addEventListener("DOMContentLoaded", displayData());
