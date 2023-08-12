const express = require('express');
const { requireSignIn, isAdmin } = require('../middlewares/authMiddleware');
const { createProductController, getProductController, getSingleProduct, productPhotoController, updateProductController, deleteProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController } = require('../controllers/productControllers');
const formidable = require('express-formidable');
const { deleteCategoryController } = require('../controllers/categoryControllers');

const router = express.Router();

//routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);
router.get('/get-products', getProductController);
router.get('/get-product/:slug', getSingleProduct);
router.get('/product-photo/:pid', productPhotoController);
router.delete('/delete-product/:pid', requireSignIn, isAdmin, deleteProductController);
router.post('/product-filter', productFilterController);
router.get('/product-count', productCountController);
router.get('/product-list/:page', productListController);
router.get('/search/:keyword', searchProductController);
router.get('/related-product/:pid/:cid', relatedProductController);
router.get('/product-category/:slug', productCategoryController);
router.get('/braintree/token', braintreeTokenController);
router.post('/braintree/payment', requireSignIn, braintreePaymentController);

module.exports = router;