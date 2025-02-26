const questions = [
    {
        question: "Türkiye'nin başkenti neresidir?",
        answers: [
            { text: "İstanbul", correct: false },
            { text: "Isparta", correct: false },
            { text: "Ankara", correct: true },
            { text: "İzmir", correct: false }
        ]
    },
    {
        question: "5 × 6 işleminin sonucu kaçtır?",
        answers: [
            { text: "25", correct: false },
            { text: "30", correct: true },
            { text: "35", correct: false },
            { text: "40", correct: false }
        ]
    },
    {
        question: "Dünya'nın uydusunun adı nedir?",
        answers: [
            { text: "Mars", correct: false },
            { text: "Jüpiter", correct: false },
            { text: "Ay", correct: true },
            { text: "Venüs", correct: false }
        ]
    },
    {
        question: "Hangi hayvan memeli değildir?",
        answers: [
            { text: "Kedi", correct: false },
            { text: "Köpek", correct: false },
            { text: "Yılan", correct: true },
            { text: "Fil", correct: false }
        ]
    },
    {
        question: "Python hangi alanda daha çok kullanılır?",
        answers: [
            { text: "Web geliştirme", correct: false },
            { text: "Veri bilimi", correct: true },
            { text: "Mobil uygulamalar", correct: false },
            { text: "Oyun geliştirme", correct: false }
        ]
    },
    {
        question: "En büyük gezegen hangisidir?",
        answers: [
            { text: "Dünya", correct: false },
            { text: "Mars", correct: false },
            { text: "Jüpiter", correct: true },
            { text: "Venüs", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Soruları karıştırır ve 4 tanesini seçer
function getRandomQuestions() {
    return questions.sort(() => Math.random() - 0.5).slice(0, 4);
}

// Seçilen 4 soruyu tutan dizi
let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    selectedQuestions = getRandomQuestions();
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `${selectedQuestions.length} soruda ${score} doğru yaptınız!`;
    nextButton.innerHTML = "Tekrar Oyna";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < selectedQuestions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < selectedQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Oyunu başlat
startQuiz();
