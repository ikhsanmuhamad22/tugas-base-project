const express = require('express')
const { getUser, getUserById, deleteUser, updateUser } = require('../controllers/userController')
const { register, login } = require('../controllers/register&loginControler')
const { verifyToken, tokenNoExist, laundyIsExist } = require('../controllers/verifyController')
const { ngeloundry } = require('../controllers/ngeloundryController')
const router = express.Router()

//login & register
router.post('/register',  
  register
)

router.post('/login',
  login
)

// berasumsi bahwa user yang login yang merubah
router.delete('/user/delete',
  tokenNoExist,
  verifyToken,  
  deleteUser
)
router.put('/user/update',
  tokenNoExist,
  verifyToken,
  updateUser
)

//method ngeloundry
router.post('/user/ngelaundry', 
  tokenNoExist,
  verifyToken,
  laundyIsExist,
  ngeloundry
)

//method user
router.get('/user',  
  getUser
)
router.get('/user/:id', (req, res) => {
  getUserById(req, res)
}
)

module.exports = router