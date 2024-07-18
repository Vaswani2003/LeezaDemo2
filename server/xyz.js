const mongoose = require('mongoose');
const Questions = require('./model/questions'); // Adjust the path to where your model is defined

mongoose.connect('mongodb://localhost:27017/questions', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

async function printAllContentsOfDB() {
  try {
    const documents = await Questions.find({});
    if (documents.length === 0) {
      console.log('The database is empty.');
    } else {
      console.log('Contents of the database:');
      console.log(documents);
    }
  } catch (err) {
    console.error('Error retrieving documents:', err);
  }
}

printAllContentsOfDB();