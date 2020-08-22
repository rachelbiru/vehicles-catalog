const mongoose = require("mongoose")
require('dotenv').config({path : 'variables.env'})



mongoose.connect( process.env.DB_URL ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(db => console.log('Database is connected'))    

