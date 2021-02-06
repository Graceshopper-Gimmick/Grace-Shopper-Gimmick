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
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
  ])
  const products = await Promise.all([
    Product.create({name: 'Beer Curler', price: 10 }),
    Product.create({name: 'Money Toilet Paper', price: 15.20 }),
    Product.create({name: 'Diet Water', price: 20.34 }),
    Product.create({name: 'Buff Squidward', price: 30 })
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
