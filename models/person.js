const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs'); // Import bcryptjs

// define the person sechema 
const PersonSchema =new mongoose.Schema({
    name : {
        type: String,
        required : true
    },
    age:{
        type : Number
    },
    work :{
        type : String,
        enum : ['chef' , 'waiter' , 'manager'],
        required : true
    },
    mobile :{
        type : String,
        required: true,
        unique : true
    },
    address : {
        type : String,
    },
    salary :{
        type : Number,
        required: true
    },
    username:{
        required : true,
        type : String
    },
    password:{
        required : true,
        type: String
    }
}); 




// bcrypt 
PersonSchema.pre('save' , async function(next){
       const person = this;
       
       // hash the password only if it has been  modified 
       if(!person.isModified('password')) return next();
       
       try{
          // hash password generation
                const salt = await  bcrypt.genSalt(10); //complexity of salt is depend upon the vlaue of genSalt.
                
                // hash password
                const hashedPassword = await  bcrypt.hash(person.password , salt);
                
                person.password = hashedPassword;
                
                next();
            }
            catch(err){
                return next(err);   
            }
        });
        
        // comparing the password
        
PersonSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bcrypt to campare the  provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
};


// create person model
const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;
