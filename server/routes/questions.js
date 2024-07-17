const express = require('express');
const router = express.Router();
const Question = require('../models/question.model'); 


router.get('/api/questions', async (req, res) => {
    try {
        const questions = await Question.find().exec();
        res.json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
