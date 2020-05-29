var startBtn = document.querySelector("#start-btn");
var landingEl = document.querySelector("#landing");
var questionEl = document.querySelector("#questions");
var questionTextEl = document.querySelector(".question-text");
var choicesEl = document.querySelector("#choices");
var timerEl = document.querySelector("#timer");
var replayBtn = document.querySelector("#replay-btn");
var endingEl = document.querySelector("#ending");
var scoreEl = document.querySelector("#score");





//Sets of questions with choices and answers
var question = [
    {
        text: "What does HTML stand for?",
        choices: [
            "Hypertext Markup Language",
            "Hot Tasty Meat Loaf",
            "Help To Make Logic",
            "High Tech Machine Language"],
        answer: 0
    },
    {
        text: "This allows webpages to to be dynamic and adds logic to coding.",
        choices: [
            "Operation",
            "HTML",
            "Nodes",
            "JavaScript"],
        answer: 3
    },
    {
        text: "If HTML is the basic code, _______ adds formatting.",
        choices: [
            "Dressing",
            "CBS",
            "CSS",
            "CSI"],
        answer: 2
    },
    {
        text: "If <ul> is an unordered list, what is <li>?",
        choices: [
            "Label Individual",
            "Liquor Industry",
            "Lateral Instance",
            "List Item"],
        answer: 3
    },
    {
        text: "Use the ________ to check for debugging, values not printed to the screen (if logged), and other developing tools",
        choices: [
            "Looker",
            "Checker",
            "Console",
            "Developer"],
        answer: 2
    },
    {
        text: "An image tag must contain a source reference (src) and a(n) _____ attribute as well.",
        choices: [
            "wing",
            "alt",
            "picture",
            "display"],
        answer: 1
    },
    {
        text: "To change the color of the font for a piece of text, ___________ is the attribute to change.",
        choices: [
            "color",
            "text-color",
            "font",
            "font-color"],
        answer: 0
    },
    {
        text: "This helps design websites faster and easier, and helps to design responsive pages.",
        choices: [
            "Bootcamp",
            "Bootstrap",
            "Bootleg",
            "Boot Scootin Boogie"],
        answer: 1
    },
    {
        text: "What does DOM stand for?",
        choices: [
            "Domain Option Method",
            "Document Object Model",
            "Dynamic Object Movent",
            "Don't Over Medicate"],
        answer: 1
    },
    {
        text: "This variable is a list of items and are denoted by brackets [] .",
        choices: [
            "Model",
            "Brace",
            "Special",
            "Array"],
        answer: 3
    },
];

//Variables needed
var cursor = 0;
var score = 0;
var interval;
var timeLeft = 60
var yourScore = 0;
var cursorVal = "";
var highScore = 0
var currentHighScore = 0
var choice = " ";
localStorage.setItem("highScore", 0);
localStorage.setItem("initials", "No one yet");

console.log("This is time left " + timeLeft);
console.log("this is the cursor" + cursor);

choicesEl.addEventListener("click", function (event) {
    var element = event.target;
    if (element.getAttribute("class") === "item") {
        //console.log(element.getAttribute("data-id"));
        var id = parseInt(element.getAttribute("data-id"));
        //Is the choice the correct answer?
        if (question[cursor].answer === id) {
            score++;
        } else {
            //Penalize 5 seconds for a wrong answer
            timeLeft -= 5;
        }
        cursor++;
        cursorVal = cursor
        renderQuestionData();
    }
});

cursor = 0;
function renderQuestionData() {
    choicesEl.innerHTML = "";
    if (cursor < 10) {
        questionTextEl.textContent = cursor + 1 + ". " + question[cursor].text;
    };

    for (var i = 0; i <= 3 && cursor < 10; i++) {
        choice = question[cursor].choices[i];
        var choiceItem = document.createElement("div");
        choiceItem.setAttribute("class", "item");
        choiceItem.setAttribute("data-id", [i]);
        choiceItem.textContent = choice;
        choicesEl.appendChild(choiceItem);
    };

}
//Timer
function initializeTimer() {

    timeLeft = parseInt(timerEl.getAttribute("data-time"));
    interval = setInterval(function () {
        timeLeft--;

        if (timeLeft > 0) {
            timerEl.textContent = timeLeft;
            if (cursor === 10) {
                questionTextEl.innerHTML = "";
                timerEl.innerHTML = "";
                yourScore = timeLeft + score;
                choice = " ";
                console.log("THIS THIS CHOICE" + choice);
                timeLeft = 0;
            };
            //Game Over
        } else {
            // console.log("ENDGAME");
            landingEl.style.display = "none";
            questionEl.style.display = "none";
            endingEl.style.display = "flex";
            clearInterval(interval);

            var currentHighScore = localStorage.getItem("highScore");
            if (yourScore > currentHighScore) {
                localStorage.setItem("highScore", yourScore);
                alert("You have the new High Score!");
                var initials = prompt("Enter your initials");
                localStorage.setItem("initials", initials);  
            //Show your score with new hig score
                scoreEl.textContent = "Your score is " + yourScore + ". The current High Score is " + localStorage.getItem("highScore") + " by " + localStorage.getItem("initials") + "!";
                
            } else {
            //Show your score 
                scoreEl.textContent = "Your score is " + yourScore;
            };


        }

    }, 1000);
}
replayBtn.addEventListener("click", function (event) {
    //Restart Quiz
    landingEl.style.display = "flex";
    endingEl.style.display = "none";
    cursor = 0;
    score = 0;
    yourScore = 0;
    timeLeft = 60;
    cursorVal = " ";

});

startBtn.addEventListener("click", function (event) {
    //Clear Start button
    landingEl.style.display = "none";
    //Display questions and choices
    questionEl.style.display = "flex";
    renderQuestionData();
    initializeTimer();
    //console.log("This is time left " + timeLeft);
    //console.log("this is the cursor" + cursor);
});
