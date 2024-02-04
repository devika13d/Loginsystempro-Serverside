
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./models/user')


const app = express();


app.use(cors());
app.use(express.json())


console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('connected');
}).catch(err => console.log(err));




const User = require('./models/user');


app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;


    const newUser = new User({ username, password });
    await newUser.save();

    console.log(`User registered successfully: ${username}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body
  try {
    const user = await Users.findOne({ username ,password})
    if (user) {
      res.status(200).json("Sucessfull")
    } else {
      res.status(404).json('User doesnt exist')
    }

  } catch (error) {
    console.log(error);
    res.status(400).json(error)
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
