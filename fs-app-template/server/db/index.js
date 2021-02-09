//this is the access point for all things database related!

const db = require('./db')

//const { User, Product, Cart } = require('./models');
const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');

//associations could go here!
User.hasMany(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through : 'Order' });
Product.belongsToMany(Cart, { through : 'Order' });

const syncAndSeed =  async()=> {
  await db.sync({force: true})
  const users = await Promise.all([
    User.create({email: 'sjhunter86@gmail.com', password: '123'}),
    User.create({email: 'monil2912@gmail.com', password: '123'}),
    User.create({email: 'Msze400@gmail.com', password: '123'}),
    User.create({email: 'arwindersinghh@gmail.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({name: 'Beer Curler', price: 10, thumbnailImgUrl : "/assets/thumbnails/Beer_Curler_Thumbnail.jpg" }),
    Product.create({name: 'Money Toilet Paper', price: 15.20, thumbnailImgUrl : "/assets/thumbnails/Money_Toilet_Paper_Thumbnail.jpg" }),
    Product.create({name: 'Diet Water', price: 20.34, thumbnailImgUrl : "/assets/thumbnails/Diet_Water_Thumbnail.jpg" }),
    Product.create({name: 'Buff Squidward', price: 30, thumbnailImgUrl : "/assets/thumbnails/Buff_Squidward_Thumbnail.jpg" })
  ])
  const [cody, murphy] = users;

  return {
    users: {
      cody,
      murphy
    }
  };
}

module.exports = {
  db,
  syncAndSeed,
  models: {
    User,
    Product,
    Cart
  }
}
