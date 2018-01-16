const express = require('express');
const app     = express();
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const config  = require('../middleware/token');
const auth    = require('../middleware/auth');
const models  = require('../../models');
const bcrypt  = require('bcrypt-nodejs');

router.get('/checkstate', auth, (req, res) => {
    const answer = {
        success: true,
        statusCode: 200,
        message: 'Successfully logged in'
    };
    res.send(answer);
});

router.post('/signup', (req, res) => {
    const data = req.body;
    if (!data) {
        let answer = getAnswer(false, 400,  'Please, enter information');
        res.send(answer);
    }
    models.user.create(req.body)
        .then((insertedUser) => {
            const answer = getAnswerUserSuccess(insertedUser.dataValues, 'New user has been successfully created');
            res.send(answer);
            return;
        })
});

router.post('/signin', (req, res) => {
    const data = req.body;
    if (!data) {
        let answer = getAnswer(false, 400,  'Please, enter information');
        res.send(answer);
    }
    models.user.findOne({where: {email: data.email}})
        .then((foundUser) => {
            let answer;
            if(bcrypt.compareSync(data.password, foundUser.dataValues.password)) {
                answer = getAnswerUserSuccess(foundUser.dataValues, 'The user has successfully logged in');
                
            } else {
                answer = getAnswer(false, 400, 'Incorrect password');
            }
            res.send(answer);
            return;
        })
        .catch((error) => {
            let answer = getAnswer(false, 400,  "Such user doesn't exist. Please, sign in first");
            res.send(answer);
            return;
        })
})

function getAnswer(status, statusCode, message) {
    if (!message.length) {
        return {status, statusCode, message : 'unknown reasons'};
    }
    return { status, statusCode, message };
}

function getAnswerUserSuccess(user, userMessage) {
    const token = jwt.sign({email: user.email}, config.secret, {
        expiresIn: 60
    });
    return {
        user: user,
        success: true,
        statusCode: 200,
        message: userMessage,
        token: token
    };
}

module.exports = router;