const express = require("express");
const app = express();
// const Product = mongoose.model("ProductInfo");
const mongoose = require("mongoose");
app.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

const cors = require('cors');
app.use(cors());

app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed
PORT =5000;
// For URL-encoded payloads
app.use(express.urlencoded({ limit: '10mb', extended: true }));
const mongoUrl =
  "mongodb+srv://pavan147:pavan123@cluster0.xaedvyt.mongodb.net/";

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log(e);
  });
require("./UserDetails");

const User = mongoose.model("UserInfo");

app.get("/", (req, res) => {
  // res.send({ status: "Started" });
  res.send("Hello, World!");
});


app.post("/register", async (req, res) => {
  const { name, email, mobile, password, userType ,city,whatsapp} = req.body;
  console.log(req.body);

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    return res.send({ data: "User already exists!!" });
  }
  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({
      name: name,
      email: email,
      mobile,
      password: encryptedPassword,
      userType,
      city,
      whatsapp
    });
    res.send({ status: "ok", data: "User Created" });
  } catch (error) {
    res.send({ status: "error", data: error });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const oldUser = await User.findOne({ email: email });

  if (!oldUser) {
    return res.send({ data: "User doesn't exists!!" });
  }

  if (await bcrypt.compare(password, oldUser.password)) {
    const token = jwt.sign({ email: oldUser.email }, JWT_SECRET);
    console.log(token);
    console.log(oldUser.name)
    if (res.status(201)) {
      return res.send({
        status: "ok",
        data: token,
        userType: oldUser.userType,
        name:oldUser.name,
        email:oldUser.email,
        
      });
      
    } else {
      return res.send({ error: "error" });
    }
  }
});

app.post("/userdata", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    User.findOne({ email: useremail }).then((data) => {
      return res.send({ status: "Ok", data: data });
    });
  } catch (error) {
    return res.send({ error: error });
  }
});



app.post("/update-user", async (req, res) => {
  const {email, name,mobile,image,whatsapp,city} = req.body;
  console.log(req.body);
  try {
    await User.updateOne(
      { email: email },
      {
        $set: {
          name,
          mobile,
          image,
          whatsapp,
          city,
      
        },
      }
    );
    res.send({ status: "Ok", data: "Updated" });
  } catch (error) {
    return res.send({ error: error });
  }

});

// app.post("/update-user", async (req, res) => {
//   const { name, email, mobile, image, gender, profession } = req.body;
//   console.log(req.body);
//   try {
//     await User.updateOne(
//       { email: email },
//       {
//         $set: {
//           name,
//           mobile,
//           image,
//           gender,
//           profession,
//         },
//       }
//     );
//     res.send({ status: "Ok", data: "Updated" });
//   } catch (error) {
//     return res.send({ error: error });
//   }
// });

app.get("/get-all-user", async (req, res) => {
  try {
    const data = await User.find({});
    res.send({ status: "Ok", data: data });
  } catch (error) {
    return res.send({ error: error });
  }
});

app.post("/delete-user",async (req, res) => {
 const {id}=req.body;
 try {
  await User.deleteOne({_id:id});
  res.send({status:"Ok",data:"User Deleted"});
 } catch (error) {
  return res.send({ error: error });
  
 }
})






app.post("/products", async (req, res) => {
  const { token } = req.body; // Get token from request body

  try {
    // Verifying the token to get the user's email
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    console.log(userEmail)

    // Find the user by email and retrieve their products
    const userData = await User.findOne({ email: userEmail }, 'products');

    if (!userData) {
      return res.status(404).send({ status: "error", data: "User not found" });
    }

    res.send({ status: "ok", data: userData.products });
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).send({ status: "error", data: error.message });
  }
});










app.put("/products/:productId", async (req, res) => {
  const { token, name, price, quantity, image, unit } = req.body;
  const { productId } = req.params; // Get product ID from the URL parameters

  console.log("Token:", token);
  console.log("Product ID:", productId); // Log Product ID for debugging

  try {
    // Verifying the token to get the user's email
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    // Find the user by email and update the product in their products array
    const userData = await User.findOneAndUpdate(
      { email: userEmail, 'products._id': productId }, // Find the user and the specific product by ID
      {
        $set: {
          'products.$.name': name,      // Update the product's name
          'products.$.price': price,    // Update the product's price
          'products.$.quantity': quantity, // Update the product's quantity
          'products.$.image': image,    // Update the product's image
          'products.$.unit': unit       // Update the product's unit
        }
      },
      { new: true, useFindAndModify: false } // Return the updated document and disable deprecated findOneAndUpdate
    );

    if (!userData) {
      return res.status(404).send({ status: "error", message: "User or product not found" });
    }

    res.send({ status: "ok", data: userData.products });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({ status: "error", message: "An error occurred while updating the product", error: error.message });
  }
});






app.delete("/products-delete/:productId", async (req, res) => {
  const { token } = req.body; // Get the token from the request body
  const { productId } = req.params; // Get product ID from the URL parameters

  console.log("Token:", token);
  console.log("Product ID:", productId); 
  try {
    // Verifying the token to get the user's email
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;

    // Find the user by email and remove the product from their products array
    const userData = await User.findOneAndUpdate(
      { email: userEmail },
      { $pull: { products: { _id: productId } } }, // Remove the product by ID
      { new: true, useFindAndModify: false } // Return the updated document
    );

    if (!userData) {
      return res.status(404).send({ status: "error", message: "User not found" });
    }

    // Optionally return the updated products array
    res.send({ status: "ok", data: userData.products });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ status: "error", message: "An error occurred while deleting the product", error: error.message });
  }
});





// app.get("/all-products", async (req, res) => {
//   try {
//     // Fetch all users and project only the products array from the result
//     const users = await User.find({}, { products: 1, _id: 0 }); // Only return the products field, omit _id

//     // Aggregate all products from all users
//     const allProducts = users.reduce((acc, user) => acc.concat(user.products), []);

//     res.send({ status: "ok", data: allProducts });
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     res.status(500).send({ status: "error", message: "An error occurred while fetching products", error: error.message });
//   }
// });


app.get("/all-products", async (req, res) => {
  try {
    // Fetch all users and include the relevant fields (name, mobile, image, and products)
    const users = await User.find({}, { name: 1, mobile: 1, image: 1, products: 1,city:1 });

    // Create an array of products with the user’s profile details
    const allProducts = users.reduce((acc, user) => {
      const userProducts = user.products.map(product => ({
        ...product.toObject(), // Convert product to a plain JS object
        userName: user.name,
        userMobile: user.mobile,
        userImage: user.image,
        city: user.city
      }));
      return acc.concat(userProducts);
    }, []);

    res.send({ status: "ok", data: allProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ status: "error", message: "An error occurred while fetching products", error: error.message });
  }
});





app.get("/apple-products", async (req, res) => {
  try {
    // Fetch all users where the products array contains an item with name 'apple'
    const users = await User.find({ 'products.name': 'Pineapple' }, { name: 1, mobile: 1, image: 1, products: 1 });

    // Filter only the products where the name is 'apple'
    const appleProducts = users.reduce((acc, user) => {
      const userAppleProducts = user.products
        .filter(product => product.name.toLowerCase() === 'pineapple') // Filter for products named 'apple'
        .map(product => ({
          ...product.toObject(), // Convert product to plain JS object
          userName: user.name,
          userMobile: user.mobile,
          userImage: user.image
        }));
      return acc.concat(userAppleProducts);
    }, []);

    if (appleProducts.length === 0) {
      return res.status(404).send({ status: "error", message: "No products found with the name 'apple'" });
    }

    res.send({ status: "ok", data: appleProducts });
  } catch (error) {
    console.error("Error fetching apple products:", error);
    res.status(500).send({ status: "error", message: "An error occurred while fetching apple products", error: error.message });
  }
});






app.post("/add-product", async (req, res) => {
  const { image, name, price, quantity, unit, token } = req.body;

  try {
    // Verifying the token to get the user's email
    const user = jwt.verify(token, JWT_SECRET);
    const userEmail = user.email;
    console.log(userEmail);

    // Find the user by email and push the new product into the products array
    await User.updateOne(
      { email: userEmail },
      {
        $push: {
          products: { image, name, price, quantity, unit }, // Add new product with Cloudinary image URL
        },
      }
    );

    res.send({ status: "ok", data: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.send({ status: "error", data: error.message });
  }
});




// app.post("/send-invoice", async (req, res) => {
//   const { email, items, total } = req.body;
//   console.log(email)

//   if (!email || !items || items.length === 0) {
//       return res.status(400).json({ message: "Invalid request data" });
//   }

//   const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//           user: process.env.EMAIL_USER,  // Set this in your .env file
//           pass: process.env.EMAIL_PASS,  // Set this in your .env file
//       },
//   });

//   const itemList = items
//       .map(item => `<li>${item.name} - ₹${item.price} x ${item.quantity}</li>`)
//       .join("");

//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: "puttupavankumar@gmail.com",
//         subject: "Your Order Invoice - AgroMart",
//         html: `
//             <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 2px solid #4CAF50; border-radius: 10px; padding: 20px;">
//                 <div style="text-align: center;">
//                     <img src="https://your-image-url.com/logo.png" alt="AgroMart Logo" style="max-width: 100px;">
//                     <h2 style="color: #4CAF50;">Thank you for your order!</h2>
//                     <p>Here is your invoice:</p>
//                 </div>
    
//                 <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
//                     <thead>
//                         <tr style="background-color: #4CAF50; color: white;">
//                             <th style="padding: 10px; border: 1px solid #ddd;">Item</th>
//                             <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
//                             <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${items.map(item => `
//                             <tr style="text-align: center;">
//                                 <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
//                                 <td style="padding: 10px; border: 1px solid #ddd;">₹${item.price}</td>
//                                 <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
    
//                 <h3 style="color: #4CAF50; text-align: right;">Total: ₹${total}</h3>
    
//                 <p style="text-align: center; color: #555;">We appreciate your business!</p>
//             </div>
//         `,
//     };
    

//   try {
//       await transporter.sendMail(mailOptions);
//       res.json({ message: "Invoice sent successfully" });
//   } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ message: "Failed to send invoice" });
//   }
// });




app.post("/send-invoice", async (req, res) => {
  const { email, items, total } = req.body;
  console.log(email);

  if (!email || !items || items.length === 0) {
      return res.status(400).json({ message: "Invalid request data" });
  }

  // Nodemailer transporter setup
  const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: process.env.EMAIL_USER, // Ensure .env file has EMAIL_USER
          pass: process.env.EMAIL_PASS, // Ensure .env file has EMAIL_PASS
      },
  });


  // Invoice Email Template (Styled Table with Green Theme & Images)
  const mailOptions = {
      from: process.env.EMAIL_USER,
      to:"posaanjankumar9@gmail.com", // Send to user's email
      // to:email,
      subject: "Your Order Invoice - AgroMart",
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 2px solid #4CAF50; border-radius: 10px; padding: 20px;">
              <div style="text-align: center;">
                 <img src="https://agromart.agrolearner.com/wp-content/uploads/2023/07/20230722_171633_0000.png" alt="AgroMart Logo" style="max-width: 100px;">
                  <h2 style="color: #4CAF50;">Thank you for your order!</h2>
                  <p>Here is your invoice:</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                  <thead>
                      <tr style="background-color: #4CAF50; color: white;">
                          <th style="padding: 10px; border: 1px solid #ddd;">Image</th>
                          <th style="padding: 10px; border: 1px solid #ddd;">Item</th>
                          <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
                          <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${items.map(item => `
                          <tr style="text-align: center;">
                              <td style="padding: 10px; border: 1px solid #ddd;">
                                  <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
                              </td>
                              <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
                              <td style="padding: 10px; border: 1px solid #ddd;">₹${item.price}</td>
                              <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
                          </tr>
                      `).join('')}
                  </tbody>
              </table>

              <h3 style="color: #4CAF50; text-align: right;">Total: ₹${total}</h3>

              <p style="text-align: center; color: #555;">We appreciate your business!</p>
          </div>
      `,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.json({ message: "Invoice sent successfully" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send invoice" });
  }
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});






