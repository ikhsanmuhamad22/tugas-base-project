// inisialisani express
const express = require('express')
const app = express()

//inisiate sequelize
const {sequelize} = require('./models')
const router = require('./routers')

//inisiate tambahan
require('dotenv').config()
const port = process.env.DB_PORT


// try {
//   sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
