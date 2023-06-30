const Custemer = require('../models').Custemer
const bcrypt = require('bcryptjs')

const getUser = ( req, res ) => {
  Custemer.findAll().then(data => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data: data
    })
  }).catch(err => {
    res.status(400).send(err.message)
  })
}

const getUserById = ( req, res ) => {
  Custemer.findOne({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.send({
      status: 'success',
      message: 'berhasil menampilkan data',
      data: data
    })
  }).catch(err => {
    res.status(400).send(err.message)
  })
}

const updateUser = (req, res) => {
    if(!req.body.name){
        res.status(400).send({
            mesegge: "nama tidak boleh kosong"
        })
        return
    }
    if(!req.body.email){
        res.status(400).send({
            mesegge: "email tidak boleh kosong"
        })
        return
    }
    if(!req.body.password){
        res.status(400).send({
            mesegge: "password tidak boleh kosong"
        })
        return
    }
    Custemer.findOne({
        where: {
            id: req.userId
        }
    }).then(data => {
        data.name = req.body.name
        data.email = req.body.email
        data.password = bcrypt.hashSync(req.body.password)
        data.save()

        res.send({
            mesegge: `data dengan id ${data.id} berhasil di rubah`
        })
    }).catch(err => {
        res.status(500).send({
            message: err
        })
    })
}

const deleteUser = ( req, res ) => {
  Custemer.destroy({
    where: {
      id: req.userId
    }
  }).then(data => {
    res.send({
      status: 'success',
      message: 'berhasil menghapus akun',
    })
  }).catch(err => {
    res.status(400).send(err.message)
  })
}

module.exports = { getUser, getUserById, deleteUser, updateUser }