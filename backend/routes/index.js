const express = require("express");
const router = express.Router();

//we import other route files
const productRoute = require("./products.js");
const authRoute = require("./auth.js");
const categoryRoute = require("./categories.js");
const couponRoute = require("./coupons.js");
const userRoute = require("./users.js");
const paymentRoute = require("./payment.js");
const sliderRoute = require("./sliders.js");



//We use each route under the corresponding road.
//Her rotayı ilgili yolun altında kullanıyoruz.
router.use("/categories", categoryRoute);
router.use("/products", productRoute);
router.use("/auth", authRoute);
router.use("/coupons", couponRoute);
router.use("/users", userRoute);
router.use("/payment", paymentRoute);
router.use("/slider", sliderRoute);


module.exports = router;
