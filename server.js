var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;
var someObject = require('./vehicle.json')


app.get('/vehicle', async (req, res) => {
    res.status(200).json(someObject)
})

//deployment
if (process.env.NODE_ENV === "production") {
    const root = path.join(__dirname, "my-app", "build");
    app.use(express.static(root));
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root });
    });
};



app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
