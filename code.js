const $form = document.querySelector('form');
$form.addEventListener('submit', e => {
    e.preventDefault();

    const passage = e.target.passage.value;
    const question = e.target.question.value;

    findAnswers(question, passage);
});

const findAnswers = async(question, passage) => {
    const model = await qna.load();
    const answers = await model.findAnswers(question, passage);
    console.log(answers);

    // select the answers div
    const $answersDiv = document.getElementById('answers');

    // empty it if there are answers from previous question
    $answersDiv.innerHTML = '';

    // append every answer to answers div
    answers.forEach((answer, idx) => {
        const $p = document.createElement('p');
        $p.append(`${idx + 1}. ${answer.text}, accuracy: ${answer.score.toFixed(2)}%`);
        $answersDiv.append($p);
    });
}