const router = require('express').Router()
const { models: { Product }} = require('../db')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order:[
        ['id','ASC']
      ]
    })
    res.send(products)
  } catch (err) {
    next(err)
  }
})

// Potential route to display single product?
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.send(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err)
  }
})

router.put('/admin/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body))
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    console.log('product created');
    res.sendStatus(201);
  } catch (err) {
    next(err)
  }
})
