const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    quantity: { type: Sequelize.INTEGER },
})


module.exports = Order
