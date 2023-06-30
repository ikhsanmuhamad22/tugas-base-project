const jwt = require('jsonwebtoken')
const { secret } = require('../config/secretConfig')
const laundry = require('../models').laundry

const tokenNoExist = (req,res,next) => {
    let tokenHeader = req.headers['x-access-token']
    if(!tokenHeader) {
        return res.send({
            status: 'fail',
            message: 'mohon isikan dlu token anda'
        })
    }
    next()
}

const verifyToken = (req, res, next) => {
    let tokenHeader = req.headers['x-access-token'];

    if (tokenHeader.split(' ')[0] !== 'Bearer') {
        return res.status(500).send({
            auth: false,
            message: "Error",
            errors: "Incorrect token format"
        });
    }

    let token = tokenHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: "Error",
            errors: "No token provided"
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: "Error",
                errors: err
            });
        }

        req.userId = decoded.id;
        next();
    });
}

const laundyIsExist = (req, res, next) => {
    laundry.findOne({
        where: {
            id: req.body.laundryId
        }
    })
    .then(laundry => {
        if (!laundry) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "maaf laundry tidak tersedia"
            });
            return;
        }
        next()
    });
}

module.exports = { verifyToken, tokenNoExist, laundyIsExist }