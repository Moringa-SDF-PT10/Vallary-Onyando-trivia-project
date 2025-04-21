const userName = document.getElementById("userName");
const startScreen = document.querySelector(".startScreen")
const playground = document.querySelector(".playground")
const endScreen = document.querySelector(".endScreen")
const questionCount = document.getElementById("questionCount")
const questionTimer = document.getElementById("questionTimer")
const question = document.getElementById("question")
const quizOptions = document.getElementById("quizOptions")
const quizBody = document.querySelector(".quizBody")
const loader = document.querySelector(".loader")
const finalScore = document.querySelector(".finalScore")
const resultUserName = document.getElementById("resultUserName")

let arrayQuestion = [];
let questionIndex = 0;
let score = 0;
let count = 15;
let countdown;

function startQuiz(){
    if(userName.value != ""){
        questionIndex = score = 0;
        startScreen.style.display = "none";
        playground.style.display = "block";
        endScreen.style.display = "none"; 
        nextButton.innerHTML = "Next";
        quizBody.style.display = "none";
        loader.style.display = "block";

        loadQuestion()
    } else {
        userName.style.border = "2px solid red"
    }
}



let QuizURL = "https://opentdb.com/api.php?amount=10&category=21"
function loadQuestion(){
    fetch(QuizURL).then((response) => response.json()).then((data) => {
        arrayQuestion = data.results;
        displayQuestion(arrayQuestion[questionIndex])
    })
}

function displayQuestion(questionData){
    console.log(questionData)
    count = 15;
    clearInterval(countdown);
    question.innerHTML = questionData.question;
    questionCount.innerHTML = questionIndex + 1;
    loadAnswers(questionData);
}

function loadAnswers(questionData){
    quizOptions.innerHTML = "";
    let answers = [...questionData.incorrect_answers, questionData.correct_answer];
    answers = answers.sort(() => (Math.random() - 0.5));

    answers.forEach((answer) => {
        let option = document.createElement("li")
        option.innerHTML = answer;
        option.addEventListener("click", ()=>{
            checkAnswer(option, answers, questionData.correct_answer);
        })

        quizOptions.append(option);
    })

    quizBody.style.display = "block";

    loader.style.display = "none";
    displayTimer();
}

function checkAnswer(answerOptions, answers, correctAnswer){
    // console.log(answerOptions, answers, correctAnswer);
    let correctElement;

    answers.forEach((answer)=>{
        if(answer===correctAnswer){
            correctElement=[...quizOptions.childNodes].find((li)=>li.innerText===htmlDecode(correctAnswer))
        }
    })

    quizOptions.childNodes.forEach((li)=>{
        li.classList.add("disable")
    })
    if(htmlDecode(correctAnswer)===answerOptions.innerText){
        answerOptions.classList.add("correct")
        score++;
    }
    else{
        answerOptions.classList.add("Incorrect")
        correctElement.classList.add("correct")
    }
    // console.log(correctElement);
    clearInterval(countdown);
}

nextButton.addEventListener("click", ()=>{
    questionTimer.innerHTML = "15"
    if(nextButton.innerText=="Next"){
    questionIndex = questionIndex + 1
    displayQuestion(arrayQuestion[questionIndex])}
    else{
        showAnswer()
    }


if(questionIndex == 9){
    nextButton.innerText = "Submit"
}
})

function showAnswer(){
    playground.style.display = "none"
    endScreen.style.display = "block";
    finalScore.innerHTML = score;
    resultUserName.innerHTML = userName.value;
    questionCount.innerHTML = 1;
    clearInterval(countdown)
    count = 10;
}

function htmlDecode(html){
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

const displayTimer=()=> {
    countdown = setInterval(()=>{
        count--;
        questionTimer.innerHTML = count;

        if(count === 0){
            clearInterval(countdown);

            quizOptions.childNodes.forEach((li)=>{
                li.classList.add("disable")
            })
        }
    }, 1000)
}

