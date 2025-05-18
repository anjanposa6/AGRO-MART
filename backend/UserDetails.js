// const mongoose = require("mongoose");

// const UserDetailSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: { type: String, unique: true },
//     mobile: String,
//     password: String,
//     image:String,
//     gender:String,
//     profession:String,
//     userType:String
    
  
//   },
//   {
//     collection: "UserInfo",
//   }
// );
// mongoose.model("UserInfo", UserDetailSchema);

const mongoose = require("mongoose");

// Define the Product schema
const ProductSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Define the User schema
const UserDetailSchema = new mongoose.Schema(
  {
    name: {type:String ,required: true},
    email: { type: String, unique: true },
    mobile:  {type:String ,required: true},
    password:  {type:String ,required: true},
    image: String,
    gender: String,
    profession: String,
    userType:  {type:String ,required: true},
    whatsapp: String,
    city:  {type:String ,required: true},
    products: [ProductSchema], // Embedding Product schema as an array of products
  },
  {
    collection: "UserInfo", // The collection name in MongoDB
  }
);

// Register the UserInfo model
mongoose.model("UserInfo", UserDetailSchema);
