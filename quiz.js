const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
let shuffledQuestions, currentQuestionIndex
const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")


startButton.addEventListener("click", startGame)

function startGame() {
	startButton.classList.add("hide");
	shuffledQuestions = questions.sort(() => Math.random() - .5);
	currentQuestionIndex = 0;
	questionContainerElement.classList.remove("hide");
	setNextQuestion()
}

function setNextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question){
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
    	const button = document.createElement("button");
    	button.innerText = answer.text;
    	button.classList.add("btn");
    	if (answer.correct) {
    		button.dataset.correct = answer.correct
    	}
    	button.addEventListener("click", selectAnswer)
    	answerButtons.appendChild(button);
    })
}

function resetState() {
	nextButton.classList.add("hide");
	while (answerButtons.firstChild) {
		answerButtons.removeChild;
		(answerButtons.firstChild);
	}
}

function selectAnswer(e) {

}

const questions = [
{
	question: "Which is the smallest planet in our solar system?",
	answers: [
	       {text:"jupiter", correct:true},
	       {text:"mercury", correct:false}
	]
}
]