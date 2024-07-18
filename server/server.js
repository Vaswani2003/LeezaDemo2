const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Question = require('./model/questions'); 
const bcrypt = require('bcryptjs');
const User = require('./model/users');


const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/questions', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));


app.get('/get-questions', async (req, res) => {
    try {
        console.log('Fetching questions');
        const questions = await Question.find({});
        console.log(questions);
        res.json({ questions });
        console.log('Questions sent');
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching questions.' });
    }
});


app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists', success: false });
        }

        const newUser = new User({ username:name, email:email, password:password });

        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', success: true });
    }
    catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});

app.post('/login', async (req, res) => {
    console.log('Received request');
    const { email, password } = req.body;

    try {
        // Check if the user exists
        let users = await User.find({});
        console.log(users);
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials', success: false });
        }

        // User found and authenticated
        res.status(200).json({ message: 'User logged in successfully', success: true });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});