const router = require('express').Router()

const stripe = require("stripe")("sk_test_51IMjVXJQEuzpjUNS3dj78SnPEDgcZ0eFCCX8bHgqVSyrHX7sPSD9OOP8MfeoHGHXpBj8dMOOsMEih0xTKkzzCZpp00sDGpecB1")
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

router.post("/payment", async(req, res) => {
  console.log("REQUEST", req.body);
  let error;
  let status;
  try{
  const { token } = req.body;
  const customer = await stripe.customers.create({
    email: token.email,
    source: token.id
  })
  const charge = await stripe.charges.create({
      amount: 10 * 100,
      currency: 'usd',
      customer: customer.id,
      receipt_email: token.email           
    })
    console.log("CHARGE:", { charge } );
    status = "success";
  } catch(error){
    console.log("ERROR:", error);
    status = "failure"
  }

  res.json({ error, status })

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
