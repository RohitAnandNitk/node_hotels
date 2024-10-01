const express = require('express');
const Router = express.Router();
const Menu = require('./../models/menu');

// for menu details operations...............................................
// getting menu details
Router.get('/' , async (req, res) => {
    try{
      const data  = await Menu.find();
      console.log('data fetched');
      res.status(200).json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({error:'Internal server Error'});
  } 
  });
  
  
  // post route for save  person data to the data base
Router.post('/' , async (req, res) =>{
  
    try{
      const data = req.body // assuming the request body contain the person data
      // create a new person document using the mongoose model
      const newMenu  = new Menu(data);
      // save the new person to the database
      const savedMenuResponse = await newMenu.save()
      // message
      console.log('data saved');
      res.status(200).json(savedMenuResponse);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal server Error'});
    }
  });

module.exports  = Router;
