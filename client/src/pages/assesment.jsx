import React, { useState, useEffect } from 'react';
import { Container, Paper, Grid, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export default function Assessment() {
    const [username, setUsername] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    const handleAnswerChange = (event, questionNumber) => {
        const { value } = event.target;
        setAnswers({ ...answers, [questionNumber]: value });
    };

    useEffect(() => {
        const token = Cookies.get('jwtToken');
        if (token) {
            // Split the token by '.' and check if it has three parts
            const parts = token.split('.');
            if (parts.length === 3) {
                try {
                    const decoded = jwtDecode(token);
                    if (decoded) {
                        setUsername(decoded.name);
                    }
                } catch (error) {
                    console.error("Error decoding token:", error.message);
                    // Handle decoding errors (e.g., show an error message or log out the user)
                }
            } else {
                console.error("Invalid token format:", token);
                // Handle invalid token format (e.g., show an error message or log out the user)
            }
        }

        const fetchQuestions = async () => {
            try {
                const response = await fetch('http://localhost:8000/get-questions');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuestions(data.questions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
            }
        };

        fetchQuestions();
    }, []);

    const handleSubmit = async () => {
        console.log('Submitting answers:', answers);
        console.log('Saved');
    };

    return (
        <div>
            <div className="front-page-hero-section">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '5vh' }}>
                    <Container component={Paper} elevation={3} style={{ padding: '20px', width: '400px' }}>
                        <Typography variant='h6' style={{ color: 'black', alignSelf: 'center', marginLeft: 8, marginBottom: '10px' }}>
                            Hello {username} <br /> Answer the following questions on a scale of 1 (very low) to 5 (very high)
                        </Typography>

                        <Grid container spacing={3} direction="column">
                            {questions.slice(0, 5).map((question, index) => (
                                <Grid item key={index}>
                                    <Typography variant='body1' style={{ marginBottom: '10px' }}>{question.questionText}</Typography>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            row
                                            value={answers[index + 1] || ''}
                                            onChange={(e) => handleAnswerChange(e, index + 1)}
                                        >
                                            {[1, 2, 3, 4, 5].map((value) => (
                                                <FormControlLabel
                                                    key={value}
                                                    value={value.toString()}
                                                    control={<Radio />}
                                                    label={value.toString()}
                                                />
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                            ))}

                            <Grid item>
                                <Button variant="contained" onClick={handleSubmit} color="primary"> Submit Answers </Button>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </div>
    );
}
