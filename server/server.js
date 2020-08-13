var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;
var someObject = require('./vehicle.json')


app.get('/vehicle', async (req,res)=>{
 res.status(200).json(someObject)
})


app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
