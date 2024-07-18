const express = require('express');
const router = express.Router();
const Question = require('../model/questions'); 

router.get('/get-questions', async (req, res) => {
    try {
        console.log('Fetching questions');
        const questions = await Question.find();
        console.log(questions);
        res.json({ questions });
        console.log('Questions sent');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching questions.' });
    }
});


module.exports = router;
