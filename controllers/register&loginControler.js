const Custemer = require('../models').Custemer
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/secretConfig')

const register = (req, res) => {
  Custemer.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password)
  }).then(data => {
    res.send({
      status: 'succes',
      message: 'berhasil register',
      data: data
    })
  }).catch(err => {
    res.status(500).send(err.status)
  })
}

const login = (req, res) => {
    Custemer
    .findOne({
      where: {
        email: req.body.email
      }
    }).then(data => {
      if (!data) {
        return res.status(404).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: "email Not Found."
        });
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, data.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          id: req.body.email,
          message: "Error",
          errors: "Invalid Password!"
        });
      }

      const jwtToken = jwt.sign({id: data.id}, secret, {expiresIn: 86400});

      let token = `Bearer ${jwtToken}`;

      res.status(200).send({
        auth: true,
        id: req.body.email,
        message: "success",
        token: token,
        errors: null
      });
    }).catch(err => {
      res.status(500).send({
        auth: false,
        id: req.body.email,
        message: "Error",
        errors: err.message
      });
    });
}

module.exports = { register,login }