const express = require('express');
const app     = express();
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const bcrypt  = require('bcrypt-nodejs');

const config  = require('../middleware/token');
const auth    = require('../middleware/auth');
const models  = require('../../models');
const baseFunctions = require('./base');

router.get('/checkstate', auth, (req, res) => {
    const answer = {
        status: true,
        statusCode: 200,
        message: 'Successfully logged in'
    };
    res.send(answer);
});

router.post('', (req, res) => {
    const data = req.body;
    if (!data) {
        let answer = baseFunctions.getAnswer(false, 400,  'Please, enter information');
        res.send(answer);
        return;
    }
    models.user.findOne({where: {email: data.email}})
        .then((foundUser) => {
            let answer;
            if (bcrypt.compareSync(data.password, foundUser.dataValues.password)) {
                const token = jwt.sign({email: foundUser.email}, config.secret, {
                    expiresIn: 60
                });
                answer = {
                    user: foundUser,
                    status: true,
                    statusCode: 200,
                    message: 'The user has successfully logged in',
                    token: token
                };
            } else {
                answer = baseFunctions.getAnswer(false, 400, 'Incorrect password');
            }
            res.send(answer);
            return;
        })
        .catch((error) => {
            let answer = baseFunctions.getAnswer(false, 400,  "Such user doesn't exist. Please, sign up first");
            res.send(answer);
            return;
        })
})

module.exports = router;