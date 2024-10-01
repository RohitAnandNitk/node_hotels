console.log('node page is sucessfully loaded');


var num1 = 10 , num2 = 14;

const add = ( a,b) =>{
  return a+ b;
}

// to pass variable , functions in other files.
module.exports = {
   num1, num2 , add
}