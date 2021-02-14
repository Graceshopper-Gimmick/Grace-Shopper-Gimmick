const { shallowEqual } = require('react-redux');
const Sequelize = require('sequelize')
const db = require('../db')




const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true
  },
  description: {
    type: Sequelize.STRING
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
    type: Sequelize.STRING,
    defaultValue: '/assets/thumbnails/Default_Image_Thumbnail.jpg'
  },
  price: {
    type: Sequelize.DECIMAL(10, 2)
  }
})








module.exports = Product;
