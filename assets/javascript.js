const startButton = document.getElementById('startButton');
const highscoreButton = document.getElementById('highscore-button')
var timeLeft = 60;
var timerEl = document.getElementById('timer');
const startScreen = document.getElementById('start');

var game = document.getElementById('gameprogress');
var scoreCount = 0



//================= HOME PAGE ======================
highscoreButton.addEventListener('click', showHighScorePage);
startButton.addEventListener('click', startGame);
// ================= GAME START ======================

function startGame() {
    timer();
    displayQuestions();
}

//Function for Timer
function timer() {
    var timeInterval = setInterval(function () {
        //questionIndex === number of questions total
        if (questionIndex === 10) {
            clearInterval(timeInterval);
            timerEl.textContent = '';
            gameOver();
        }

        else {
            if (timeLeft > 1) {
                // Set the `textContent` of `timerEl` to show the remaining seconds
                timerEl.textContent = timeLeft + ' seconds remaining';
                // Decrement `timeLeft` by 1
                timeLeft--;
            } else if (timeLeft === 1) {
                // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
                timerEl.textContent = timeLeft + ' second remaining';
                timeLeft--;
            } else if (timeLeft === 0) {
                // Once `timeLeft` gets to 0, set `timerEl` to an empty string
                timerEl.textContent = '';
                // Use `clearInterval()` to stop the timer
                clearInterval(timeInterval);
                gameOver();
            }
        }
    }, 1000);
}

//Displaying Questions
var questionIndex = 0;
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript? ",
        choices: ['<script>', '<head>', '<footer>', '<body>'],
        answer: '<script>'
    },
    {
        question: "How do you write 'hello world' in an alert box?",
        choices: ['messageBox("hello world")', 'message("hello world")', 'alert("hello world")', 'alertBox("hello world")'],
        answer: 'alert("hello world")'
    },
    {
        question: "What is the correct syntax for a FOR loop?",
        choices: ['for (i<=5; i++)', 'for (i=0; i <= 5; i++)', 'for (i = 0; i <= 5)', 'for i = 1 to 5'],
        answer: 'for (i=0; i <= 5; i++)'
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choices: ['var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', 'var colors = "red", "green", "blue"', 'var colors = ["red", "green", "blue"]', 'var colors = (1:"red", 2:"green", 3:"blue")'],
        answer: 'var colors = ["red", "green", "blue"]'
    },
    {
        question: "How do you find the number with the highest value of x and y?",
        choices: ['Math.ceil(x, y)', 'Math.high(x, y)', 'Math.max(x, y)', 'Math.greatest(x, y)'],
        answer: 'Math.max(x, y)'
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        choices: [':','-','.','='],
        answer: '='
    },
    {
        question: "JavaScript is a _______-side programming language",
        choices: ['Client','Server','Client & Server','None of the above'],
        answer: 'Client & Server'
    },
    {
        question: "Which of the following function creates a new array from calling a function for every array element?",
        choices: ['join()', 'map()', 'push()', 'newArray()'],
        answer: 'Math.max(x, y)'
    },
    {
        question: "Which of the following is a valid JavaScript function?",
        choices: ['var myFunction = function myFunction { };', 'myFunction function () { }', 'function myFunction = { }', 'function myFunction () { }'],
        answer: 'function myFunction () { }'
    },
    {
        question: "What is the correct JavaScript syntax to change the content of a 'p' element with an id 'demo'",
        choices: ['document.querySelector("p").innerHTML"Hello World!";', 'document.getElement("demo").innerHTML = "HelloWorld!"', 'document.getElementById("demo").innerHTML = "Hello World!"', '#demo.innerHTML = "Hello World!"'],
        answer: 'document.getElementById("demo").innerHTML = "Hello World!"'
    }
]

function displayQuestions() {
    // This is clearing out our game element so our old questions do not display
    startScreen.innerHTML = '';
    game.innerHTML = '';
    //Utilize create and append activity
    var h2 = document.createElement('h2');
    h2.textContent = questions[questionIndex].question;
    game.append(h2);

    questions[questionIndex].choices.forEach(choice => {
        var button = document.createElement('button');
        button.textContent = choice;
        game.append(button);
    })

}
// Alerts
const alertBox = document.getElementById('alert-box');
const correctAlert = document.getElementById('correct');
const wrongAlert = document.getElementById('wrong');

function showCorrectAlert() {
    correctAlert.style.display = "block";
    wrongAlert.style.display = "none";
}

function showWrongAlert () {
    wrongAlert.style.display = "block";
    correctAlert.style.display = "none";
}

//Function for what happens when you answer correctly/incorrectly
game.addEventListener('click', function (event) {
    console.log(event.target.textContent);
    if (event.target.textContent === questions[questionIndex].answer) {
        scoreCount+=10;
        console.log(scoreCount)
        console.log('correct');
        showCorrectAlert();
        questionIndex++;
        displayQuestions();
        
    } else {
        console.log('incorrect')
        console.log('score')
        timeLeft -= 10;
        scoreCount-= 5;
        console.log(scoreCount)
        showWrongAlert();
        questionIndex++;
        displayQuestions();
    };
})

// ================= GAME OVER SCREEN ======================
var endScreen = document.getElementById('game-over');
var finalScore = document.getElementById("score");
var submitButton = document.getElementById('submit');


function gameOver() {
    alertBox.style.display ="none";
    game.style.display = "none";
    endScreen.style.display = "inline-block";
    showScore ();
  
}
// Function to show user's current score
function showScore () {
    console.log (scoreCount)
    finalScore.textContent = scoreCount;
    
}


// ================= SAVING HIGH SCORES ======================
submitButton.addEventListener ('click', saveScore);
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const maxHighScores= 5;
//Saves the current score to the local Storage and returns to home screen
function saveScore() {
    var userInitials = document.getElementById('initials').value;
    var score = {
        score: scoreCount,
        initials: userInitials,
    }
    highScores.push(score);
    highScores.sort(({score:a},{score:b}) => b-a);
    highScores.splice(5);
    //highScores.splice(5);

    localStorage.setItem('highScores',JSON.stringify(highScores));

    console.log(highScores);
    window.location.reload();
}


// ================= HIGH SCORE SCREEN ======================
const scoreboard = document.getElementById("scoreboard");

function showHighScorePage () {
    startScreen.innerHTML = '';
    game.innerHTML = '';
    endScreen.innerHTML = '';
    scoreboard.style.display = "flex"

    renderHighscores ();
}

const highScoresList = document.getElementById('highScores')
function renderHighscores () {
    highScores.forEach (score => {
        var li = document.createElement('li');
        li.textContent =score.initials + '                                ' + score.score;
        highScoresList.append(li)
    })}

    console.log(highScores)

// Go Back Button
const goBackButton = document.querySelector("#go-back");
goBackButton.addEventListener("click",function(){
    window.location.reload();
})






//make an input so users can save score
    //add an event listener for when click save, and it should save to local storage
    // Add a highscores view button to display highscores
//Add event listener for clicking Highscores on main page
