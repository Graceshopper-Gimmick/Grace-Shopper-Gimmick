const router = require('express').Router()
const { models: { User,Cart,Order}} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.body.userId);
    res.send(await user.update({
      email : req.body.email
    }))
  } catch (err) {
    next(err)
  }
})

router.post('/createguest', async (req, res, next) => {
  try {
    const guests = await User.createGuest()
    const guestNumber = guests.length+1
    const email = 'guest_' + guestNumber.toString() + '@dummy.com'
    const password = 'guest_password'
    const guest = await User.create({email,password})
    const cart = await Cart.create({ userId: guest.id, active: true })
    res.status(201).send({guest,cart})
  } catch (err) {
    next(err)
  }
})

router.put('/claimcart/:id', async (req, res, next) => {
  try {
    // const guestId = window.localStorage.getItem('guestId')*1
    // const cartId = window.localStorage.getItem('cartId')*1
    const cart = await Cart.findOne({
      where:{
        userId:req.params.id,
        active:true
      }
    })
   // console.log('CART',cart)
    const userCartId = cart.id

    const orders = await Order.findAll({
      where:{
        cartId:req.body.cartId
      }
    })
    await Promise.all(orders.map(order=>{
      order.cartId = userCartId
      order.save()
    }))

    await User.destroyGuest(req.body.guestId)
    await Cart.destroyGuest(req.body.cartId)

    res.send(orders)
    }catch (err) {
    next(err)
  }
})



