const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');
const open = document.getElementById('open');
const container = document.querySelector('.container');

let score=0;
let time =20;
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';
let randomWord='';

async function getRandomWord() {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=100');
    const data = await res.json();
  
    return data[Math.floor(Math.random() * data.length)];
  }
  function clickBtn () {
    container.style.display="block";
  open.style.display="none";
  text.focus();
  }
        function addWordToDOM(){
            word.innerHTML = randomWord;
      }
      (async () => {
        randomWord =  await getRandomWord();
        addWordToDOM();
      })();
const timeInterval = setInterval(updateTime,1000);

function updateScore() {
    score++;
    scoreEl.innerHTML=score;
}

function updateTime() {
    time--;
    timeEl.innerHTML=`${time}s`;
    if(time=== 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}
function gameOver() {
endgameEl.innerHTML=`
<h1>Time ran out</h1>
<p>Your final score is ${score}</p>
<button onclick="location.reload()">Reload</button>
`;
endgameEl.style.display='flex';
}
text.addEventListener('input', e=>{

const term =e.target.value;

if (term===randomWord)  {
    (async () => {
        randomWord =  await getRandomWord();
        addWordToDOM();
      })();
e.target.value='';
updateScore();
if (difficulty === 'hard') {
    time += 5;
  } else if (difficulty === 'medium') {
    time += 10;
  } else {
    time += 15;
  }
  updateTime();
}
});
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));
open.addEventListener('click',clickBtn);
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
  });