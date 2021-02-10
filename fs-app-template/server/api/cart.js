const router = require('express').Router()
const { models: { Order,Cart,Product}} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
  try {
    const cartItems = await Cart.findAll({
        include: [Order],
        where:{
            userId:req.params.id,
            active:true
        }
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.get('/history/:id', async (req, res, next) => {
    try {
      const cartItems = await Cart.findAll({
          include: [Order],
          where:{
              userId:req.params.id,
              active:false
          }
      })
      res.json(cartItems)
    } catch (err) {
      next(err)
    }
  })