const router = require('express').Router();
const Users = require('./auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res, next) => {
  // implement registration
  try {
    const { username, password } = req.body
    const user = await Users.addUser({
      username: username,
      password: await bcrypt.hash(password, 14)
    })

    res.json(user)
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res) => {
  // implement login
  try {
    const { username, password } = req.body
    const user = await Users.findBy({ username }).first()

    if (!user) {
      return res.status(401).json({
        message: "You shall not pass!",
      })
    }
    
    const passwordValid = await bcrypt.compare(password, user.password)

    if (!passwordValid) {
      return res.status(401).json({
        message: "You shall not pass!",
      })
    }
    
    const token = jwt.sign({
      userID: user.id
    }, "secret string")
    
    res.cookie("token", token)

    res.json(token)
  } catch(err) {
    next(err)
  }
});

module.exports = router;
