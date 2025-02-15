document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of India?",
      choices: ["New Delhi", "London", "Tokyo", "Sydney"],
      answer: "New Delhi",
    },
    {
      question: "Which is the biggest planet in the solar system?",
      choices: ["Mars", "Mercury", "Earth", "Jupiter"],
      answer: "Jupiter",
    },
    {
      question: "Who wrote novel - THE GREAT GATSBY?",
      choices: ["Emily Bronte", "F. Scott Fitzgerald", "Chetan Bhagat", "JK Rowling"],
      answer: "F. Scott Fitzgerald",
    },
  ];

  let currQIdx = 0;
  let score = 0;
  let answered = false;

  startBtn.addEventListener("click", startQuiz);
  restartBtn.addEventListener("click", restartQuiz);

  nextBtn.addEventListener("click", () => {
    currQIdx++;
    if (currQIdx < questions.length) showQuestion();
    else showResult();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currQIdx = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currQIdx].question;
    choicesList.innerHTML = ""; 
    answered = false;

    questions[currQIdx].choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => selectAnswer(li,choice));
      choicesList.append(li);
    });
  }

  function selectAnswer(choosenLi, choice) {
    if (answered) return;
    answered = true;
    const correctAnswer = questions[currQIdx].answer;

    if (choice === correctAnswer) {
        choosenLi.style.backgroundColor = "green";
        choosenLi.style.color = "white";
        score++;
    } else {
        choosenLi.style.backgroundColor = "red";
        choosenLi.style.color = "white";
        
        // Highlight the correct answer
        Array.from(choicesList.children).forEach((li) => {
            if (li.textContent === correctAnswer) {
                li.style.backgroundColor = "green";
                li.style.color = "white";
            }
        });
    }
    
    nextBtn.classList.remove("hidden");
}


  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${questions.length}`;
  }

  function restartQuiz() {
    currQIdx = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  }
});