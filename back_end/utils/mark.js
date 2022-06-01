function markMultipleChoice(rightAnswer, submitAnswer) {
    if (rightAnswer === submitAnswer) {
        return 1;
    }
    return 0;
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

function markMultipleChoiceAnswers(rightAnswer, submitAnswer) {
    let mark = 0;

    for (const answer of submitAnswer) {
        let check = rightAnswer.some(a => a.toLowerCase().trim() === answer.toLowerCase().trim());
        if (check) {
            mark += 1 / rightAnswer.length;
        }
    }
    return mark;
}

module.exports = {markFillBlank1, markFillBlank2, markMultipleChoice, markMultipleChoiceAnswers};