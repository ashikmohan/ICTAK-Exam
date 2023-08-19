const mongoose = require('mongoose');




mongoose.connect("mongodb+srv://AshikMohan:Ashik12345@cluster0.ngaoxfw.mongodb.net/task")
.then(()=>{
    console.log(`Connection to Database established`);
})
.catch((error)=>{
    console.log(`Error in connecting to database ${error.message}`);
})