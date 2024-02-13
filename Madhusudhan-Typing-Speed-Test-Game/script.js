const a = "https://baconipsum.com/api/?type=all-meat&paras=3&format=json";
let display = document.getElementById("text");

const timer = document.getElementById("timer");
const start = document.getElementById("start");
const input = document.getElementById("inputs");
const display_time = document.getElementById("timer");
const result = document.getElementById("result");

var stop;
var words = 1;
start.addEventListener("click", () => {
  display_time.innerText = "1:00";
  getData();
  stop = true;
});
if (stop == true) {
  stopInterval();
  stop = false;
}

input.addEventListener("input", (e) => {});

input.addEventListener("input", (e) => {
  var a = e.target.value;
  if (a.length === 1) {
    startTimer();
  }
  const arrayQuote = display.querySelectorAll("span");
  const arrayValue = input.value.split("");
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else if (character == " ") {
      words++;
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
    }
  });
});
function data() {
  return fetch(a)
    .then((response) => response.json())
    .then((data) => data);
}

async function getData(timer) {
  clearInterval(timer);
  const res = await data();
  const str = res[0];
  display.innerHTML = "";
  const word = str.split("");
  word.forEach((data) => {
    const span = document.createElement("span");
    span.innerText = data;
    display.appendChild(span);
  });
  input.value = "";
}
getData();
function startTimer() {
  let time = 60;
  const timer = setInterval(() => {
    time--;
    display_time.innerText = time;
    if (time == 0) {
      clearInterval(timer);
      alert("Time is up");
      display_time.innerText = "1:00";
      getData();
      stop = false;
      words++;
      result.innerText = words;
      console.log(words);
      words = 0;
    } else if (stop === true) {
      clearInterval(timer);
      display_time.innerText = "1:00";
      getData();
      stop = false;
    }
  }, 1000);
  return timer;
}
function stopInterval(intervalId) {
  clearInterval(intervalId);
}
