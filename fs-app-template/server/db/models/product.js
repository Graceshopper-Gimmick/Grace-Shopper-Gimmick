const Sequelize = require('sequelize')
const db = require('../db')




const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    
  },
  category: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  ogImgUrl: {
    type: Sequelize.STRING
  },
  thumbnailImgUrl : {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})








module.exports = Product;
