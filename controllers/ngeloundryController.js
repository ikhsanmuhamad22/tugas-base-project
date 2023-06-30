const items_laundry = require('../models').items_laundry
const laundry = require('../models').laundry

const ngeloundry = (req, res) => {
  return items_laundry
    .create({
      id_custemer: req.userId,
      id_laundry: req.body.laundryId,
      nama_items: req.body.nama_items,
      berat_items: req.body.berat,
      status_pembayaran: req.body.pembayaran,
    })
    .then(data => {
      res.send({
        status: 'success',
        message: 'berhasil laundry',
        data: data
      })
    }).catch(err => {
      res.status(400).send(err.message)
    })
}

module.exports = { ngeloundry }