const express = require('express');
const Router = express.Router();
const Person  = require('./../models/person');

// for person details operations...................................................
// post route for save  person data to the data base
Router.post('/' , async (req, res) =>{

    try{
      const data = req.body // assuming the request body contain the person data
      // create a new person document using the mongoose model
      const newPerson  = new Person(data);
      // save the new person to the database
      const savedPersonResponse = await newPerson.save()
      // message
      console.log('data saved');
      res.status(200).json(savedPersonResponse);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server Error'});
    }
});

// get method for getting all the data of persons
Router.get('/' , async (req, res) =>{
    
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