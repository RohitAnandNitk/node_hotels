/*
var fs = require('fs');
var os = require('os');

var user = os.userInfo();
console.log(user);


// if file is not exist then it create a new file as greeting.txt  and write  "hi username" otherwise it just write.
// it takes three parameter 
// filename, message , callback function
fs.appendFile('greeeting.txt' , 'Hi ' + user.username, ()=>{
    console.log("file is created");
})

*/


/*
// importing files
const nodepage = require('./nodePage.js');

// access the vari , funs in nodepages file
console.log( nodepage.add(nodepage.num1, nodepage.num2)); 

// loadsh is used for manipulations on arrays
const _ = require('loadsh');

var data = [1,2,'person' , 1 ,2 ,'date' , 2, 'person' , 'date'];
var filter = _.uniq(data); // give unique element
console.log(filter);
*/

// creating server

const express = require('express');
const app = express();
// for connecitng to the databases
const  db = require('./db');
// body parser  // npm install bodyParser
const bodyParser =  require('body-parser');
app.use(bodyParser.json()); // it store in req.body and we can use it. 
// for 
const Person = require('./models/person');
// for 
const Menu = require('./models/menu');






// import the router file 

// person
const personRoutes = require('./routes/personRoute');
// menu
const menuRoutes = require('./routes/menuRoutes');

// use the routes
app.use('/person' , personRoutes);
app.use('/menu' , menuRoutes);

app.listen(3000 , () => {
    console.log('listening on port 3000');
})





/*
way to write

// arrow function 
// app.get('/chicken', (req, res)  => {
//     const items = {
//         type : 'fried',
//         ischutny : false,
//     }
//   res.send(items);
// })

*/


/*
this will give error so we use try and cache block (Indutry level practice) 
      const data = req.body // assuming the request body contain the person data
      // const newPerson  = new Person();
      // newPerson.name = data.name;
      // newPerson.age = data.age;
      // newPerson.work = data.work;
      // newPerson.email = data.email;
      // newPerson.address = data.address;
      // newPerson.salary = data.salary;
      // to avoid this step we can directly write
      const newPerson  = new Person(data);

      // save the data of newPerson in the database
      newPerson.save((error , savedPerson) =>{
         if(error){
          console.log('Error during person data' , error);
          res.status(500).json({error:'Internal server Error'})
         }
         else{
          console.log('data saved sucessfully');
          res.status(200).json(savedPerson);
         }
      })
    */