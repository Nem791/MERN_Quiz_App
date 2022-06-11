function markMultipleChoice(rightAnswer, submitAnswer, options) {
    let indexAnswer = options.findIndex(a => a.toLowerCase().trim() === rightAnswer.toLowerCase().trim());
    if (rightAnswer === submitAnswer) {
        return {mark1: 1, indexAnswers1: [indexAnswer]};
    }
    return {mark1: 0, indexAnswers1: [indexAnswer]};
}

function markFillBlank1(rightAnswer, submitAnswer) {
    let check = rightAnswer.some(a => a.toLowerCase().trim() === submitAnswer);
    if (check) {
        return 1;
    }
    return 0;
}

function markFillBlank2(rightAnswer, submitAnswer, question) {
    let mark = 0;

    for (let index = 0; index < submitAnswer.length; index++) {
        const element = submitAnswer[index].toLowerCase().trim();
        const match = question[rightAnswer[index]];
        if (element === match) {
            mark += 1 / rightAnswer.length;
        }
    }
    return mark;
}

// rightAnswer = answer.quiz.answer; // ["LAN_1","LAN_2", "LAN_3"]
// submitAnswer = answer.user_answers; // ["LAN_1","LAN_2"]
function markMultipleChoiceAnswers(rightAnswer, submitAnswer, options) {
    let mark = 0;
    let indexAnswers = [];

    for (const answer of submitAnswer) {
        let check = rightAnswer.some(a => a.toLowerCase().trim() === answer.toLowerCase().trim());
        if (check) {
            mark += 1 / rightAnswer.length;
        }
    }

    for (const iterator of rightAnswer) {
        let indexAnswer = options.findIndex(a => a.toLowerCase().trim() === iterator.toLowerCase().trim());
        indexAnswers.push(indexAnswer);
    }
    return {mark, indexAnswers};
}

module.exports = { markFillBlank1, markFillBlank2, markMultipleChoice, markMultipleChoiceAnswers };