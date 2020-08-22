const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
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

var server = app.listen(process.env.PORT || 5000, function () {
    var port = server.address().port;
    console.log("Express is working on port " + port);
  });

// app.listen(PORT, () => {
//     console.log(`app running on port ${PORT}`)
// });
