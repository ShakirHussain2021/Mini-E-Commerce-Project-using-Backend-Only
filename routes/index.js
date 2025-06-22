const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function(req, res){
    let error = req.flash("Error");
    res.render("index", {error, loggedin: false});
});

//shop
router.get("/shop", isloggedin , async function(req, res){
    let products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
}); 


//cart
router.get("/cart", isloggedin , async function(req, res){
    let user = await userModel
        .findOne({email: req.user.email})
        .populate("cart");        

        const bill = (Number(user.cart[0].price))-Number(user.cart[0].discount);
        res.render("cart" , {user, bill});
    }); 
    
    
//addtocart    
router.get("/addtocart/:productid", isloggedin , async function(req, res){
    const user = await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to Cart");
    res.redirect("/shop");
});



//admin
// router.post("/admin", isloggedin , async function(req, res){
//     res.render("admin");
// }); 


//logout
// router.get("/logout", isloggedin, function(req,res){
//     req.("shop");
// });


module.exports = router; 