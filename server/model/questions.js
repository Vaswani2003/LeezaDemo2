const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true
    },
    options: [{
        optionText: String,
        score: Number
    }]
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;
