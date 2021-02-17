const Sequelize = require('sequelize')
const db = require('../db')


const Cart = db.define('cart', { 
  quantity: {
    type: Sequelize.INTEGER
  },
  active: {
    type: Sequelize.BOOLEAN
  }
})

Cart.destroyGuest = async function(cartId){
  const cart = await Cart.findByPk(cartId);
  await cart.destroy()
}



module.exports = Cart;