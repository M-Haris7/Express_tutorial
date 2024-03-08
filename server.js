const express = require('express');
const app = express(); // a blue print of express is stored in app
const db = require('./db'); // importing the db.js file
const User = require('./models/users'); // importing the user model

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // to parse the incoming request body


app.get('/', (req, res) => {
  res.send('Hello World');
}); // get request to the root of the server


// post request to create a new user
app.post('/users', async (req, res) => {
  try {
    const data = req.body; // data from the request body

  // create a new user
  const newUser = new User(data);

  //save the user to the database
  const response = await newUser.save();
  console.log('Data saved!');
  res.status(201).json(response);
  } 
  catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal Server Error'});
  }
});




// app.get('/about', (req, res) => {
//   res.send('About Page');
// });

// app.get('/info', (req, res) => {
//   var info = {
//     name: 'moris',
//     role: 'developer',
//     age: 22
//   }
//   res.send(info);
// })

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});