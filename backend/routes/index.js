const express = require("express");
const router = express.Router();

//we import other route files
const productRoute=require("./products.js");
const categoryRoute=require("./categories.js");

//We use each route under the corresponding road.
//Her rotayı ilgili yolun altında kullanıyoruz.
router.use("/categories", categoryRoute);
router.use("/products", productRoute);

module.exports=router;