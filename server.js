const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const someObject = require('./vehicle.json');
const path = require('path');


app.get('/vehicles', async (req, res) => {
    res.status(200).json(someObject)
})

//deployment
if (process.env.NODE_ENV === "production") {
    const root = path.join(__dirname, "my-app","build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root });
    });
};


app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
