const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0'

const bodyParser = require('body-parser')
const path = require('path');
require('./database');


const someObject = require('./vehicle.json');
const Users = require("./controller/authController");
const verifyToken = require("../src/controller/verifyToken");


app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/users', Users)



app.get('/vehicles', async (req, res) => {
    token = req.get('x-access-token')
  await res.status(200).json(someObject)
})



//deployment
if (process.env.NODE_ENV === "production") {
    const root = path.join(__dirname, '..', '..', "my-app","build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root });
    });
};


app.listen(PORT, host,  () => {
    console.log(`app running on port ${PORT}`)
});
