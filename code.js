// Load the model.
qna.load().then(model => {
    // Find the answers
    model.findAnswers(question, passage).then(answers => {
        console.log('Answers: ', answers);
    });
});