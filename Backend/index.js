const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors');
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
  number: "1",
  title: "Bitwise AND of Numbers Range",
  difficulty: "Medium",
  acceptance: "42%",
  description: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.",
  examples: [
      {
        input: "left = 5, right = 7",
        output: " 4"
      },
      {
          input: "left = 0, right = 0",
          output: " 4"
      }
  ]
},
{
      number: "2",
      title: "Happy Number",
      difficulty: "Easy",
      acceptance: "54.9%",
      description: `Write an algorithm to determine if a number n is happy.

      A happy number is a number defined by the following process:
      
      Starting with any positive integer, replace the number by the sum of the squares of its digits.
      Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
      Those numbers for which this process ends in 1 are happy.
      Return true if n is a happy number, and false if not.`,
      examples: [
          {
            input: " n = 19",
            output: " true"
          },
          {
              input: "n = 2",
              output: "false"
          }
      ]

  },

  {
      number: "3",
      title: "Remove Linked List Elements",
      difficulty: "Hard",
      acceptance: "42%",
      description: "Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.",
      examples: [
          {
            input: "head = [1,2,6,3,4,5,6], val = 6",
            output: "[1,2,3,4,5]"
          },
          {
              input: "head = [], val = 1",
              output: "[]"
          }
      ]
      
  },
  {
      number: "4",
      title: "Next Greater Element",
      difficulty: "Medium",
      acceptance: "30%",
      description: `The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

      You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.
      
      For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.
      
      Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.`,
      examples: [
          {
            input: "nums1 = [4,1,2], nums2 = [1,3,4,2]",
            output: "[-1,3,-1]"
          },
          {
              input: "nums1 = [2,4], nums2 = [1,2,3,4]",
              output: "[3,-1]"
          }
      ]
  },
  {
      number: "5",
      title: "Detect a cycle in the linkedlist",
      difficulty: "Medium",
      acceptance: "60%",
      description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

      There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
      
      Return true if there is a cycle in the linked list. Otherwise, return false.`,
      examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true"
          },
          {
              input: "head = [1,2], pos = 0",
              output: "true"
          }
      ]
  },
  {
      number: "6",
      title: "Create a clone of a graph",
      difficulty: "Hard",
      acceptance: "30%",
      description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

      There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
      
      Return true if there is a cycle in the linked list. Otherwise, return false.`,
      examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true"
          },
          {
              input: "head = [1,2], pos = 0",
              output: "true"
          }
      ]
  },
  {
      number: "7",
      title: "2 Sum",
      difficulty: "Easy",
      acceptance: "80%",
      description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

      There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
      
      Return true if there is a cycle in the linked list. Otherwise, return false.`,
      examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true"
          },
          {
              input: "head = [1,2], pos = 0",
              output: "true"
          }
      ]
  },
  {
      number: "8",
      title: "Longest Increasing Subsequence",
      difficulty: "Medium",
      acceptance: "50%",
      description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

      There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
      
      Return true if there is a cycle in the linked list. Otherwise, return false.`,
      examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true"
          },
          {
              input: "head = [1,2], pos = 0",
              output: "true"
          }
      ]
  },
  {
      number: "9",
      title: "Inverse Element",
      difficulty: "Hard",
      acceptance: "42%",
      description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

      There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
      
      Return true if there is a cycle in the linked list. Otherwise, return false.`,
      examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true"
          },
          {
              input: "head = [1,2], pos = 0",
              output: "true"
          }
      ]
  },
  {
      number: "10",
      title: "Maximum of Minimum of every window size",
      difficulty: "Hard",
      acceptance: "20%",
      description: `Given head, the head of a linked list, determine if the linked list has a cycle in it.

      There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
      
      Return true if there is a cycle in the linked list. Otherwise, return false.`,
      examples: [
          {
            input: "head = [3,2,0,-4], pos = 1",
            output: "true"
          },
          {
              input: "head = [1,2], pos = 0",
              output: "true"
          }
      ]
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
app.use(cors());


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
     console.log(user);
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