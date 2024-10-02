const express = require('express');
const Router = express.Router();
const Person  = require('./../models/person');
const passport = require('./../auth');
// import jwt file
const {jwtAuthMiddleware, generateToken } = require( './../jwt');


// we are add auth here 
const localAuthMiddleware = passport.authenticate('local' , {session : false});
// now when we authentication in any route then we place this "localAuthMiddleware" 

// for person details operations...................................................

// post route for save  person data to the data base

// *********  SIGNUP *****************
Router.post('/signup' , async (req, res) =>{

    try{
      const data = req.body // assuming the request body contain the person data
      // create a new person document using the mongoose model
      const newPerson  = new Person(data);
      // save the new person to the database
      const response = await newPerson.save()
      // message
      console.log('data saved');

      const payload = {
        id: response.id,
        username : response.username
      }
      // console the payload
      console.log(JSON.stringify(payload));
      const token = generateToken(payload);
      console.log("Token is : " , token);

      res.status(200).json({ response: response , token: token });
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server Error'});
    }
});


// ***************** LOGING ******************************
// LOHIIN ROUTE

Router.post('/login' , async (req, res) =>{
     try{
         // Extract username and password from request body
         const  {username, password} = req.body;

         // find the user by username
         const user = await Person.findOne({username : username});

         // if user not exist with that username  or password doesn't match
         if(!user || !(await user.comparePassword(password))){
               return res.status(401).json({error: 'Invalid usernaem or password'});
         }

         // generate the token 
          const payload = {
            id : user.id,
            username : user.username
          }
          const token = generateToken(payload);

          // retutn token as response
          res.json({token});
     }
     catch(err){
          console.log(err);
          res.status(500).json({error:'Internal Server Error'});
     }
}); 

// profile Route
//**************** PROFILE **************** */
Router.get('/profile' , jwtAuthMiddleware , async (req, res) =>{
      
    try{
      const userData =  req.user;
      console.log("User Data : " , userData);

      const userId = userData.id;
      const user = await Person.findById(userId);
      res.status(200).json({user}); 
    }
    catch(err){
      console.log(err);
          res.status(500).json({error:'Internal Server Error'});
    }   
})



// get method for getting all the data of persons
Router.get('/' , localAuthMiddleware , async (req, res) =>{
    
  try{
      const data  = await Person.find();
      console.log('data fetched');
      res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server Error'});
  } 
})

/*
Query parameter
when we want the data like  person / manager

*/
Router.get('/:workType' , async (req, res) => {

    try{
      const workType = req.params.workType; // extract the work type from the URL paremeter
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('found manager');
            res.status(200).json(response);
      }
      else{
       console.log('manager not found');
       res.status(404).json({error: 'Internal server error'});
      }
    }
    catch(err){
     console.log('manager not found');
     res.status(404).json({error: 'Internal server error'});
    }
});

// put method / update...........
Router.put('/:id' , async (req, res) => {
    try{
        const personID = req.params.id; // extracting id from paramter
        const updatedInfo = req.body;   // new info for updataion
 
        const response = await Person.findByIdAndUpdate(personID , updatedInfo, {
            new : true, // return the updated info
            runValidators: true, // run mongooes validatord
        });

        if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(404).json({error: 'Internal server error'});
    }
});

// delete operation............
Router.delete('/:id' , async (req, res) => {
    try{
          const personID = req.params.id;
          const response = await Person.findByIdAndDelete(personID);
          
          if(!response){
            return res.status(404).json({error : 'Person not found'});
        }

        console.log('data deleted');
        res.status(200).json({message : 'Data deleted Sucessfully'});
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: 'Internal server error'});
    }
})

module.exports = Router;