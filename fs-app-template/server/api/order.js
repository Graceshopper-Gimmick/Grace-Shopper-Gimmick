const router = require('express').Router()
const {
    models: { Cart },
} = require('../db')
const Order = require('../db/models/order')
module.exports = router

// router.get('/', async (req, res, next) => {
//     try {
//         const products = await Product
//             .findAll
//             // explicitly select only the id and email fields - even though
//             // users' passwords are encrypted, it won't help if we just
//             // send everything to anyone who asks!
//             //attributes: ['id','name', 'price', 'thumbnailImgUrl', 'ogImgUrl']
//             ()
//         res.json(products)
//     } catch (err) {
//         next(err)
//     }
// })

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body)
        const cart = await Cart.findOne(
            { where: { userId: req.body.userId, active: true } }
            // explicitly select only the id and email fields - even though
            // users' passwords are encrypted, it won't help if we just
            // send everything to anyone who asks!
            //attributes: ['id','name', 'price', 'thumbnailImgUrl', 'ogImgUrl']
        )
        const checkOrder = await Order.findOne({
            where: {
                productId : req.body.productId,
                cartId : cart.id
            }
        });
        if(checkOrder){
            const error = Error('Cannot create duplicate order');
            error.status = 401;
            return next(error);
        }

        const order = await Order.create({
            userId: req.body.userId,
            cartId: cart.id,
            quantity: req.body.quantity,
            productId: req.body.productId,
        })
    } catch (err) {
        next(err)
    }
})
