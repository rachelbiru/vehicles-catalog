const mongoose = require("mongoose")

mongoose.connect( process.env.MONGODB_URI, 'mongodb://localhost:27017/vehicles-catalog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
   .then(db => console.log('Database is connected'))    


   
