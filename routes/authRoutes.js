const express = require('express');
const {requireSignIn, isAdmin} = require('../middlewares/authMiddleware')
const router = express.Router();  //router object
const {registerController, loginController, testController, forgotPasswordController, updateController, getOrderController, getAllOrderController, orderStatusController} = require('../controllers/authControllers');
//routing
//REGISTER||METHOD POST

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);
router.get('/test', requireSignIn, isAdmin, testController);

//protected user route
router.get('/user-auth', requireSignIn, (req, res)=>{
    res.status(200).send({ok:true});
})

//protected admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res)=>{
    res.status(200).send({ok:true});
})

router.put('/profile', requireSignIn, updateController);

router.get('/orders', requireSignIn, getOrderController);
router.get('/all-orders', requireSignIn, isAdmin, getAllOrderController);
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController);

module.exports = router;