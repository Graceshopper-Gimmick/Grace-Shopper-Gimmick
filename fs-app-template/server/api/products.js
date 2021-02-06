const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll(
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      //attributes: ['id','name', 'price', 'thumbnailImgUrl', 'ogImgUrl']
    )
    res.json(products)
  } catch (err) {
    next(err)
  }
})