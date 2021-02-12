//this is the access point for all things database related!

const db = require('./db')

//const { User, Product, Cart } = require('./models');
const User = require('./models/user')
const Product = require('./models/product')
const Cart = require('./models/cart')
const Order = require('./models/order')
const { Card } = require('@material-ui/core')

//associations could go here!
User.hasMany(Cart)
Cart.belongsTo(User)
Product.hasMany(Order)
Cart.hasMany(Order)
//User.hasMany(Order)
Order.belongsTo(Product)
Order.belongsTo(Cart)
//Order.belongsTo(User)
// Cart.belongsToMany(Product, { through: 'Order' })
// Product.belongsToMany(Cart, { through: 'Order' })

const syncAndSeed = async () => {
    await db.sync({ force: true })
    const users = await Promise.all([
        User.create({ email: 'sjhunter86@gmail.com', password: '123' }),
        User.create({ email: 'monil2912@test.com', password: '123' }),
        User.create({ email: 'Msze400@gmail.com', password: '123' }),
        User.create({ email: 'arwindersinghh@gmail.com', password: '123', isAdmin: true })
    ])
    
    const products = await Promise.all([
        Product.create({
            name: 'Beer Curler',
            price: 10,
            thumbnailImgUrl: '/assets/thumbnails/Beer_Curler_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Money Toilet Paper',
            price: 15.2,
            thumbnailImgUrl:
                '/assets/thumbnails/Money_Toilet_Paper_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Diet Water',
            price: 20.34,
            thumbnailImgUrl: '/assets/thumbnails/Diet_Water_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Buff Squidward',
            price: 30,
            thumbnailImgUrl: '/assets/thumbnails/Buff_Squidward_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Anti Theft Bag',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Anti_Theft_Bag_Thumbnail.jpg',
        }),
        Product.create({
            name: 'AT AT BBQ GRILL',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/AT_AT_BBQ_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Baby Mop',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Baby_Mop_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Bacon Perfume',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Bacon_Perfume_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Baguette Pack',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Baguette_Pack_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Beard Hat',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Beard_Hat_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Computer Privacy Hood',
            price: 1,
            thumbnailImgUrl:
                '/assets/thumbnails/Computer_Privacy_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Darth Vader BBQ Apron',
            price: 1,
            thumbnailImgUrl:
                '/assets/thumbnails/Darth_Vader_BBQ_Apron_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Darth Vader Face Mask',
            price: 1,
            thumbnailImgUrl:
                '/assets/thumbnails/Darth_Vader_Face_Mask_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Eye Drop Funnel',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Eyedrop_Funnel_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Finger Pants',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Finger_Pants_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Han Solo Icecube Tray',
            price: 1,
            thumbnailImgUrl:
                '/assets/thumbnails/Han_Solo_Icecube_Tray_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Hand Holder',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Hand_Holder_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Hand Glass',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Handglass_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Nap Pillow Case',
            price: 1,
            thumbnailImgUrl:
                '/assets/thumbnails/Its_A_Nap_Pillow_Case_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Noodle Fan',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Noodle_Fan_Thumbnail.jpg',
        }),
        Product.create({
            name: 'Shoe Umbrella',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Shoe_Umbrella_Thumbnail.jpg',
        }),
        Product.create({
            name: 'T Shirt Mask',
            price: 1,
            thumbnailImgUrl: '/assets/thumbnails/Tshirt_Mask_Thumbnail.jpg',
        }),
    ])
    const [cody, murphy] = users

    const cart = await Promise.all([
        Cart.create({
            userId: 1,
            active: true,
        }),
        Cart.create({ userId: 1, active: false }),
        Cart.create({ userId: 2, active: true }),
        Cart.create({ userId: 3, active: true }),
        Cart.create({ userId: 4, active: true }),
    ])

    // Cart.create({ userId: 1, active: false }),

    // await cart.addProduct(products, {
    //     through: { Order: { productId: 1, cartId: 1 } },
    // })

    const order = await Promise.all([
        Order.create({ cartId: 1, productId: 5, quantity: 2}), // active cart order
        Order.create({ cartId: 2, productId: 6, quantity: 1}), // checked out cart order
        Order.create({ cartId: 2, productId: 4, quantity: 3}), // checked out cart order
        Order.create({ cartId: 2, productId: 7, quantity: 5}), // checked out cart order
    ])
    return {
        users: {
            cody,
            murphy,
        },
    }
}

module.exports = {
    db,
    syncAndSeed,
    models: {
        User,
        Product,
        Cart,
        Order
    },
}
