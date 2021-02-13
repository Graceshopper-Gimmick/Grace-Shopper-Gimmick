const router = require('express').Router()
const { models: {User,Cart }} = require('../db')
module.exports = router
const express = require('express')
router.use(express.json())

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})

//github callback if using github OAUTH
router.get('/github/callback', async(req, res, next)=> {
  //User.authenticateGithub will attempt to use code to find a user in our system.
  //if successful, a jwt token will be returned
  //that token will be set in localStorage
  //and client will redirect to home page
  console.log('CODE',req.query.code)
  try {
    console.log('CODE',req.query.code)
    res.send(
      `
      <html>
      <body>
        <script>
        window.localStorage.setItem('token', '${await User.authenticateGithub(req.query.code)}');
        window.document.location = '/';
        </script>
      </body>
      </html>
      `);
  }
  catch(ex){
    console.log(ex)
    next(ex);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    const cart = await Cart.create({ userId: user.id, active: true })
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
