const router = require("express").Router();
const Product = require("../models/products");

const upload = require("../middlewares/upload-photo");

//POST request - create a new product
router.post("/products", upload.single("photo"), async (req, res) => {
  try {
    let product = new Product();
    product.title = req.body.title;
    product.description = req.body.description;
    product.photo = req.body.photo;
    product.price = req.body.price;
    product.stockQuantity = req.body.stockQuantity;

    await product.save();

    res.json({
      status: true,
      message: "Successfully saved",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//GET request - get all products
router.get("/products", async (req, res) => {
  try {
    let products = await Product.find();

    res.json({
      status: true,
      products: products,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//GET request - get a product
router.get("/product/:id", async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });

    res.json({
      status: true,
      product: product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//PUT request - update a product
router.put("/product/:id", async (req, res) => {
  try {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          photo: req.body.photo,
          price: req.body.price,
          category: req.body.categoryID,
          owner: req.body.ownerID,
        },
      },
      { upsert: true }
    );

    res.json({
      status: true,
      updateProduct: product,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

//DELETE request - delete a single product
router.delete("/products/:id", async (req, res) => {
  try {
    let deletedProduct = await Product.findOneAndDelete({ _id: req.params.id });

    if (deletedProduct) {
      res.json({
        status: true,
        message: "Successfully deleted",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
