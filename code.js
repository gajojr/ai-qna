const $form = document.querySelector('form');
$form.addEventListener('submit', e => {
    e.preventDefault();

    // empty it if there are answers from previous question
    document.getElementById('answers').innerHTML = '';

    const passage = e.target.passage.value;
    const question = e.target.question.value;

    findAnswers(question, passage);
});

const findAnswers = async(question, passage) => {
    document.querySelector('.loader').style.display = 'block';

    const model = await qna.load();
    const answers = await model.findAnswers(question, passage);
    console.log(answers);

    document.querySelector('.loader').style.display = 'none';

    // select the answers div
    const $answersDiv = document.getElementById('answers');

    if (!answers.length) {
        $answersDiv.innerHTML = 'No answers for this question!';
        return;
    }

    // append every answer to answers div
    answers.forEach((answer, idx) => {
        const $p = document.createElement('p');
        $p.append(`${idx + 1}. ${answer.text}, accuracy: ${answer.score.toFixed(2)}%`);
        $answersDiv.append($p);
    });
}