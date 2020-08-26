const { Router } = require("express");
const router = Router();

const jwt = require('jsonwebtoken');
const config = require('../config');
const fetch = require('node-fetch')
const verifyToken = require("./verifyToken");
const generateJWT = require('../utils/auth')
const User = require("../models/User");



router.post('/register', async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = new User({
        name,
        email,
        password
    });

    User.findOne({
        email: req.body.email
    })
        .then(async (userData) => {

            if (!userData) {
                user.password = await user.encryptPassword(user.password);
                await user.save();

                const token = await generateJWT(user)
                res.json({ auth: true, token })

            } else {
                res.status(404).json({ error: 'User already exist' })
            }
        })
        .catch(err => {
            res.status(500).send('error:' + err)
        })
})



router.get('/me', verifyToken, async (req, res, next) => {
    const user = await User.findById(req.userId, { password: 0 })
    token = req.get('x-access-token')
    if (!user) {
        return res.status(404).send('No user found')
    }
    res.json(user)
})




router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email: email })
    if (!user) {
        return res.status(404).send('The email no exists')
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
        res.status(401).json({ auth: false, token: null })
    }

    const token = await generateJWT(user)

    res.json({ auth: true, token })
})


router.post('/login-with-facebook', async (req, res) => {
    const { accessToken, userID } = req.body
    console.log(req.body)

    const respo = await fetch(`https://graph.facebook.com/v2.3/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    const json = await respo.json()

    if (json.id === userID) {

        // a valid user
        // check here if user exists in DB, than login , else register and than login
        const responseData = await User.findOne({ facebookId: userID })
        
        if (responseData) {
         // user is register. create a session
         res.json({status: 'ok', data: 'You are logged in'})
        } else {
            const person = new User ({
                name: json.name,
                facebookId: userID,
                accessToken: accessToken,
            })

            await person.save()
            res.json({status: 'ok', data: 'You are registered and logged in'})
        }
    } else {
        // impersonate someone 
        // just send a warning 
        res.json({status: 'error', data: "Don't try f with us"})
    }

})

module.exports = router;
