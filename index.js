const questions = [
    {
        question: "Which method is used to check if a string contains a specific substring in JavaScript?" ,
        answers: [
            {text: "includes()", correct: true},
            {text: "includes = ()", correct: false},
            {text: "includes('b')", correct: false},
            {text: "Both A and B", correct: false},
        ]
    },
    {
        question: " Which of the following retrieves all <div> elements with class 'container'?" ,
        answers: [
            {text: "document.getElementsByTagName('container');", correct: false},
            {text: "document.querySelectorAll('div.container');", correct: true},
            {text: "document.querySelector('.container');", correct: false},
            {text: "document.getElementsByClassName('container');", correct: false},
        ]
    },
    {
        question: "Which JavaScript property should you modify to change the tooltip text that appears when hovering over an image?" ,
        answers: [
            {text: "image.alt", correct: false},
            {text: "image.title", correct: true},
            {text: "image.tooltip", correct: false},
            {text: "image.src", correct: false},
        ]
    },
    {
        question: "What is the difference between innerText and textContent in a paragraph element?" ,
        answers: [
            {text: "innerText only includes visible text; textContent includes all text", correct: true},
            {text: "textContent only includes visible text; innerText includes all text", correct: false},
            {text: "innerText includes HTML tags, while textContent does not", correct: false},
            {text: "There is no difference", correct: false},
        ]
    },
    {
        question: " What does the onfocus event do when applied to an input field?" ,
        answers: [
            {text: "Clears the value of the input field", correct: false},
            {text: "Highlights the input field", correct: false},
            {text: "Executes a function when the input field gains focus", correct: true},
            {text: "Submits the form", correct: false},
        ]
    },
    {
        question: "Which event triggers continuously as the mouse pointer is moved over an element?" ,
        answers: [
            {text: "onmouseenter", correct: false},
            {text: "onmousemove", correct: true},
            {text: "onmouseover", correct: false},
            {text: "onmouseleave", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


var currentQuestionIndex = 0;
var score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
     score = 0;
     nextButton.innerHTML = "Next";
     showQuestion();
   
}

function showQuestion(){
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none"
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;

    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==='true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
     questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`; 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
   if (currentQuestionIndex < questions.length){
    showQuestion();
   }else{
    showScore();
   }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

