const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    image: String,
    name: String,
    price: String,
    quantity: String,
    unit: String,
    userEmail: { 
      type: String, 
      ref: 'UserInfo' // Reference to User Schema's email
    }
  },
  {
    collection: "ProductInfo",
  }
);

module.exports = mongoose.model('ProductInfo', ProductSchema);
