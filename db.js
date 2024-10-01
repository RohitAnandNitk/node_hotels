const mongoose = require('mongoose');

// define the mongodb connection url
const mongoURL = 'mongodb://localhost:27017/hotels'

//setup mongodb connection
mongoose.connect(mongoURL , { // required parammeters
    useNewUrlParser : true,
    useUnifiedTopology : true,
});

// Get the default connection 
// Mongooes maintain a default connection object repersenting the MongoDB connection
const db  = mongoose.connection;



// define event listener for databases connection 
db.on('connected' , () =>{
    console.log('connected to MongoDB server');
});
db.on('error' , (err) =>{
    console.log('MongoDB connection error ', err);
});

db.on('disconnected' , () =>{
    console.log('MongoDB disconnected');
});


//Export the database connection
module.exports = db;
