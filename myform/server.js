const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Form = require('./models/Form');

app.use(bodyParser.json());


app.post('/api/forms', (req, res) => {
  const { name, questions } = req.body;
  const newForm = new Form({ name, questions });

  newForm.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to save form' });
    } else {
      res.json({ message: 'Form saved successfully' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
