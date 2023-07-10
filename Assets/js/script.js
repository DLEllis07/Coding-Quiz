
//set an array of objects for questions/options with the answer key

var questions = [
    {
        question: "Commonly used data types do NOT include?",
        correctAnswerIndex: "2: Alerts",
        answers: ["1.Boolean", "2. Alerts", "3. Numbers", "4. Numbers"]
    },
    {
        question: "The condition in an if/else statement is enclosed with?",
        correctAnswerIndex: "4: Curly Brackets",
        answers: ["1.Parentheses", "2.Square Brackets", "3.Quotes","4.Curly Brackets"]
    },
    {
        question: "Arrays in a javascript can be used to store?",
        correctAnswerIndex: "1. All of the above",
        answers: ["1.All of the above", "2.Other arrays", "3.Booleans", "4.Numbers and Strings"]
    },
    {
        question: "String values must be enclosed within___when being assigned to variables?",
        correctAnswerIndex: "3. Quotes",
        answers: ["1.Commas", "2. Parenthesis", "3.Quotes", "4.Curly Brackets"],
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is?",
        correctAnswerIndex: "2.console log",
        answers: ["1. terminal/bash", "2.console log", "3.Javascript", "4.for loops"]
    }   
]
//last page after the end of the quiz

lastpageArr = [
    {
        allFinished: "All Finished",
        score: "You're score is?",
        initials: "Enter your initals",

    }
]

var startButtonEl = document.getElementById("start-button");
var timerEl = document.getElementById("timer");
var time = 60;
var questionsEl = document.getElementById("question");
var startGameTextEl = document.getElementById("start-game-text");
var answerChoicesEl = document.querySelector(".answer-choices");
var questionTextEl = document.getElementById("question-text");
var questionIndex = 0
var endGameTextEl = document.querySelector(".end-game");
var finalScoreEl = document.getElementById("final-score");
var stopTimer = false;
var submitScoreEl = document.getElementById("submit-score");
var highScorePage = document.getElementById("high-score-page");
var scoresEl = document.getElementById("scores");




//timer starts when start button clicked 
function startGame() {
    timerEl.textContent=time;
    setInterval(countdown, 1000);
    startGameTextEl.setAttribute("class", "hide");
    startButtonEl.setAttribute("class", "hide");
    startQuestions();
}

function countdown() {
    timerEl.textContent=time;
    if (stopTimer) {
        return;
    }
    if (time>0) {
        time--
    };
    if (time === 0) {
        endGame();
    };
    
}

startButtonEl.addEventListener("click", startGame);

//start game
function startQuestions() {
    questionTextEl.textContent=questions[questionIndex].question;
    var choices = questions[questionIndex].answers;
    while (answerChoicesEl.lastChild) {
        answerChoicesEl.removeChild(answerChoicesEl.lastChild)
    }
    choices.forEach((choice)=>{
        var answerButtonEl = document.createElement("button");
        answerButtonEl.textContent=choice;
        answerChoicesEl.appendChild(answerButtonEl);
        answerButtonEl.addEventListener("click", answerQuestion)
    });
}

//handle answer input
function answerQuestion(event) {
    // console.log(event.target.textContent);
    var correctAnswer = (event.target.textContent === questions[questionIndex].answers[questions[questionIndex].correctAnswerIndex])
    if (!correctAnswer) {
        time = time - 10;
    }
    questionIndex++;
    if (questionIndex < questions.length) startQuestions();
    else endGame();
}

//end game 
function endGame() {
    stopTimer = true;
    console.log(stopTimer);
    questionTextEl.setAttribute("class", "hide");
    answerChoicesEl.setAttribute("class", "hide");
    endGameTextEl.classList.remove("hide"); 
    finalScoreEl.textContent=time; 
}

// store high score to local storage w initials 
submitScoreEl.addEventListener("click", highScores);
function highScores() {
    console.log("clicked!");
    endGameTextEl.classList.add("hide");
    highScorePage.classList.remove("hide");
    var scoreEl = document.createElement("div")
    
    if (time > (localStorage.getItem("high-score"))) {
        localStorage.setItem("high-score", time);
        localStorage.setItem("name", initials.value)
        scoreEl.textContent=initials.value + " : " + time;
        scoresEl.appendChild(scoreEl);
    }
    else {
        scoreEl.textContent=initials.value + " : " + localStorage.getItem("high-score");
        scoresEl.appendChild(scoreEl);
    }

}
