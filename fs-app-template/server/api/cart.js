const router = require('express').Router()
const {
    models: { Order, Cart, Product },
} = require('../db')
module.exports = router

router.get('/:id', async (req, res, next) => {
    try {
        const cartItems = await Cart.findAll({
            include: [
                {
                    model: Order,
                    include: [{ model: Product }],
                    // include: [Product],
                },
            ],
            where: {
                userId: req.params.id,
                active: true,
            },
            order: [['id']],
        })
        res.send(cartItems)
    } catch (err) {
        next(err)
    }
})

router.get('/history/:id', async (req, res, next) => {
    try {
        const cartItems = await Cart.findAll({
            include: [Order],
            where: {
                userId: req.params.id,
                active: false,
            },
        })
        res.json(cartItems)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id/:cartItemId', async (req, res, next) => {
    try {
        const deletedCartItem = await Order.findOne({
            where: {
                cartId: req.params.id,
                productId: req.params.cartItemId,
            },
        })
        await deletedCartItem.destroy()
        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
})

// makes the active cart false
router.put('/:id', async (req, res, next) => {
    try {
        const updatedCart = await Cart.findByPk(req.params.id)
        const newCart = await Cart.create({
            userId: updatedCart.userId,
            active: true,
        })
        res.send(
            await updatedCart.update({
                active: false,
            })
        )
    } catch (err) {
        next(err)
    }
})

router.post('/:id', async (req, res, next) => {
    try {
        //must get new cart ID ==> ask monil how he got length of database
        const newCart = await Cart.create(req.params.id)
    } catch (err) {
        next(err)
    }
})

//
