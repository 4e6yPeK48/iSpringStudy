let checkBtn = document.getElementById("checkBtn");
let answerField = document.getElementById("answerField")


checkBtn.addEventListener("click", e => {
    if (checkAnswer(PLAYER.currentQuestion, answerField.value)) {
        PLAYER.currentQuestion = null;
        alert("Верно");
    }
})