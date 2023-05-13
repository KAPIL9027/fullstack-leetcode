const express = require('express')
const jwt = require('jsonwebtoken')
const {authorization} = require('./authorization');
require("dotenv").config()
const app = express();


const USERS = [{
  username:"Roger",
  email: "rg23@gmail.com",
  password:"1234",
  isAdmin: true
},
{
  username:"Sunny",
  email: "sg23@gmail.com",
  password:"1234",
  isAdmin: false
},
{
  username:"Sachin",
  email: "st23@gmail.com",
  password:"1234",
  isAdmin: false
},
{
  username:"Ranveer",
  email: "rs23@gmail.com",
  password:"1234",
  isAdmin: false
},
];


const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [
  {
    problem: "Two states",
    result: "accepted",
    email: "rg23@gmail.com"
  },
  {
    problem: "Two states",
    result: "rejected",
    email: "rg23@gmail.com"
  },
  {
    problem: "Two sum",
    result: "accepted",
    email: "sg23@gmail.com"
  },
  {
    problem: "Next Greater Element",
    result: "accepted",
    email: "rs23@gmail.com"
  }
]

// find user with the email
const checkEmail = (email)=>{
 for(let i = 0;i < USERS.length;i++)
 {
    if(USERS[i].email === email)
    {
      return true;
    }
 }
 return false;
}

// check if user email and password exists
const checkCredentials = (email,password) =>{
 for(let i = 0;i < USERS.length;i++)
 {
      if(USERS[i].email === email && USERS[i].password === password)
      return USERS[i];
 }
  return null;
}

// for parsing the form data that we might get from the frontend (login, signup)
app.use(express.urlencoded({extended: true}));
app.use(express.json({extended: true}));



app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const user = req.body;


  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  if(!checkEmail(user.email))
  {
    USERS.push(user);
  }
  else
  {
    res.json({message:`Hi, ${user.username}. you are already registered!!!`}).status(401);
  }

})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
     const user = req.body;
  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same

    const matchingUser = checkCredentials(user.email,user.password);
     if(matchingUser)
     {
      USER = matchingUser;
      const authToken = jwt.sign(user,process.env.JWT_SECRET);

      res.json({authToken}).status(200);
     }
     else
     {
     
      res.json({message: "Wrong credentials"}).status(401);
     }

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
})

app.get('/questions', authorization,function(req, res) {

  //return the user all the questions in the QUESTIONS array
  
  res.json({questions: QUESTIONS}).status(200);
})

app.get("/submissions", authorization,function(req, res) {
   // return the users submissions for this problem
   const problem = req.query.problem;
   const submissions = SUBMISSION.filter((submission)=> {
     return submission.problem === problem && submission.email === res.locals.user.email;
   })
  res.json({userSubmissions: submissions}).status(200);
});


app.post("/submissions", authorization,function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
    const problemSubmission = req.body;
    problemSubmission["result"] = Math.random() < 0.5 ? "accepted" : "rejected"
     problemSubmission["email"] = res.locals.user.email;
    SUBMISSION.push(problemSubmission);
    console.log(SUBMISSION);
    res.json({message: "Submitted!!!"}).status(401);
});



app.listen('3001',()=>{
  console.log('Server started and listening on port 3001');
})