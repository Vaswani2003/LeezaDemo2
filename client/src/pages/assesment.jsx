import React, { useState, useEffect } from 'react';
import './Assessment.css'; 

export default function Assessment() {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [totalScore, setTotalScore] = useState(0);


    useEffect(() => {
        
        const fetchQuestions = async () => {
            try {
              
                const response = await fetch('/api/questions');
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data.questions);
                   
                    setAnswers(new Array(data.questions.length).fill(''));
                } else {
                    console.error('Failed to fetch questions');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSelect = (index, optionScore) => {
        const newAnswers = [...answers];
        newAnswers[index] = optionScore; 
        setAnswers(newAnswers);

        const total = newAnswers.reduce((acc, score) => acc + score, 0);
        setTotalScore(total);
    };

    const handleSubmit = async () => {
        try {
        
            const response = await fetch('/api/submit-assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });

            if (response.ok) {
                console.log('Assessment submitted successfully');
             
            } else {
                console.error('Failed to submit assessment');
              
            }
        } catch (error) {
            console.error('Error submitting assessment:', error);

        }
    };

    return (
        <div className="Assessment-container">
            <h1>Assessment</h1>
            <div className="Questions-list">
                {questions.map((question, index) => (
                    <div key={index} className="Question-item">
                        <p>{question.text}</p>
                        <div className="Options">
                            {question.options.map((option, optionIndex) => (
                                <button
                                    key={optionIndex}
                                    onClick={() => handleAnswerSelect(index, option.score)}
                                    className={answers[index] === option.score ? 'selected' : ''}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="Total-score">
                <p>Total Score: {totalScore}</p>
                <button onClick={handleSubmit}>Submit Assessment</button>
            </div>
        </div>
    );
}
