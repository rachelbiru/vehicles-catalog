const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const someObject = require('./vehicle.json');
const verifyToken = require("../src/controller/verifyToken");

// var server = app.listen(process.env.PORT || 5000, function () {
//     var port = server.address().port;
//     console.log("Express is working on port " + port);
//   });


const path = require('path');
app.use(express.json());

require('./database');


app.get('/vehicles', async (req, res) => {
    token = req.get('x-access-token')
  await res.status(200).json(someObject)
})

const Users = require("./controller/authController");
app.use('/users', Users)


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
