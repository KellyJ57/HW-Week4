var QuestionIndex = 0;
var time = questions.length * 15;
var timerId;

var questions = document.getElementById("questions");
var time = document.getElementById("timer");
var choices = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

function startQuiz() {

	var startScreenEl = document.getElementById("start-screen");
	startScreenEl.setAttribute("class", "hide");


	questions.removeAttribute("class");


	timerId = setInterval(clockTick, 1000);


	time.textContent = time;

}

function getQuestion() {

	var currentQuestion = questions[QuestionIndex];


	var title = document.getElementById("question-title");
	title.textContent = currentQuestion.title;


	choicesEl.innerHTML = "";


	currentQuestion.choices.forEach(function (choice, i) {

		var choiceNode = document.createElement("button");
		choiceNode.setAttribute("class", "choice");
		choiceNode.setAttribute("value", choice);

		choiceNode.textContent = i + 1 + ". " + chosice;


		choiceNode.onclick = questionClick;

		choicesEl.appendChild(choiceNode);
	});
}

function questionClick() {
	
	if (this.value !== questions[currentQuestionIndex].answer) {
		
		time -= 15;

		if (time < 0) {
			time = 0;
		}

		
		timerEl.textContent = time;

		
		sfxWrong.play();

		feedbackEl.textContent = "Wrong!";
	} else {
		
		sfxRight.play();

		feedbackEl.textContent = "Correct!";
	}

	
	feedbackEl.setAttribute("class", "feedback");
	setTimeout(function () {
		feedbackEl.setAttribute("class", "feedback hide");
	}, 500);

	
	currentQuestionIndex++;


	if (currentQuestionIndex === questions.length) {
		quizEnd();
	} else {
		getQuestion();
	}
}

function quizEnd() {
	
	clearInterval(timerId);

	
	var endScreenEl = document.getElementById("end-screen");
	endScreenEl.removeAttribute("class");

	
	var finalScoreEl = document.getElementById("final-score");
	finalScoreEl.textContent = time;

	
	questionsEl.setAttribute("class", "hide");
}

function clockTick() {

	time--;
	timerEl.textContent = time;

	
	if (time <= 0) {
		quizEnd();
	}
}

function saveHighscore() {
	
	var initials = initialsEl.value.trim();

	
	if (initials !== "") {
		
		var highscores =
			JSON.parse(window.localStorage.getItem("highscores")) || [];

		
		var newScore = {
			score: time,
			initials: initials
		};

		
		highscores.push(newScore);
		window.localStorage.setItem("highscores", JSON.stringify(highscores));

		
		window.location.href = "highscores.html";
	}
}

function checkForEnter(event) {
	
	if (event.key === "Enter") {
		saveHighscore();
	}
}


submitBtn.onclick = saveHighscore;


startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;