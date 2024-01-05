let questions = {
    "2 + 2 * 2": 6,
    "7 * 7": 49,
}
function getRandomQuestion() {
    let keys = Object.keys(questions);
    return keys.random()
}

function checkAnswer(question, answer) {
    return answer == questions[question]
}