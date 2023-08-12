const { hashPassword, compare } = require('../helpers/authHelper');
const orderModel = require('../models/orderModel');
const userModel = require('../models/userModels');
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;
        //validation
        if (!name) {
            return res.status(400).send({ error: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ error: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ error: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).send({ error: 'Phone is required' });
        }
        if (!address) {
            return res.status(400).send({ error: 'Address is required' });
        }
        if (!answer) {
            return res.status(400).send({ error: 'answer is required' });
        }
        const existingUser = await userModel.findOne({ email });
        //existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already register, please login'

            })
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({ name, email, phone, address, password: hashedPassword, answer }).save();
        res.status(201).send({
            success: true,
            message: 'User register successfully',
            user
        })
    } catch (err) {
        // console.log(err);
        res.status(500).send({
            success: false,
            message: 'error in registration',
            err
        })
    }
}


//LOGIN || POST
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: 'Please provide email and password'
            })
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Email not found"
            })
        }
        const match = compare(password, user.password);
        if (!match) {
            return res.status(400).send({
                success: false,
                message: 'Invalid password'
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).send({
            success: true,
            message: 'user login successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (err) {
        // console.log(err);
        res.status(500).send({
            success: false,
            message: 'error in login',
            err
        })
    }
}

const testController = async (req, res) => {
    try {
        res.send('protected routes');
    } catch (err) {
        // console.log(err);
        res.status(500).send({
            success: false,
            message: 'test error',
            err
        })
    }
}

const forgotPasswordController = async (req, res) => {
    try {
        const { email, newpassword, answer } = req.body;
        if (!email) {
            res.status(400).send('email is required');
        }
        if (!answer) {
            res.status(400).send('answer is required');
        }
        if (!newpassword) {
            res.status(400).send('New Password is required');
        }
        //check
        const user = await userModel.findOne({ email });
        // console.log(user);
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong email or answer'
            });
        }
        const hashed = await hashPassword(newpassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "password Reset successfully"
        })
    } catch (err) {
        // console.log(err);
        res.status(400).send({
            success: false,
            message: 'invalid request body',
            err
        })
    }
}

const updateController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        // console.log('working');
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        // console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
}

//orders
const getOrderController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
}

const getAllOrderController = async (req, res) => {
    try {
        const orders = await orderModel
            .find()
            .populate("products", "-photo")
            .populate("buyer", "name")
            .sort({ createdAt: -1 })
        res.json(orders);
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error WHile Geting Orders",
            error,
        });
    }
}

const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );
        res.json(orders);
    } catch (error) {
        // console.log(error);
        res.status(500).send({
            success: false,
            message: "Error While Updateing Order",
            error,
        });
    }
}

module.exports = { registerController, loginController, testController, forgotPasswordController, updateController, getOrderController, getAllOrderController, orderStatusController };