const fs = require('fs');
const productModel = require('../models/productModels');
const categroyModel = require("../models/categoryModels");
const { default: slugify } = require('slugify');
var braintree = require("braintree");
const orderModel = require('../models/orderModel');
require('dotenv').config()

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "64smwjxfhwqyf4bk",
    publicKey: "h2xqt9dtr89mcwsf",
    privateKey: "e81359254f8bdc131b165f5af9ffb56f"
});

const createProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is require" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = new productModel({ ...req.fields, slug: slugify(name) });
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in clearing product"
        })
    }
}

const getProductController = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').select("-photo").limit(12).sort({ createdAt: -1 });
        res.status(200).send({
            count: products.length,
            success: true,
            message: "all products",
            products
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in getting product"
        })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate('category');
        res.status(200).send({
            success: true,
            message: "single product",
            product
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in geting single product"
        })
    }
}

const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid).select("photo");
        if (product.photo.data) {
            res.set('Content-type', product.photo.contentType);
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in geting photo"
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success: true,
            message: "product deleted successfully",
            product
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in deleting product"
        })
    }
}

const updateProductController = async (req, res) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        //validation
        switch (true) {
            case !name:
                return res.status(500).send({ error: "name is require" });
            case !description:
                return res.status(500).send({ error: "Description is Required" });
            case !price:
                return res.status(500).send({ error: "Price is Required" });
            case !category:
                return res.status(500).send({ error: "Category is Required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is Required" });
            case photo && photo.size > 1000000:
                return res
                    .status(500)
                    .send({ error: "photo is Required and should be less then 1mb" });
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {
            ...req.fields, slug: slugify(name)
        }, { new: true }
        )
        if (photo) {
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated Successfully",
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error in updating product"
        })
    }
}

const productFilterController = async (req, res) => {
    try {
        const { checked, radio } = req.body;
        let args = {};
        if (checked.length > 0) args.category = checked;
        if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
        const products = await productModel.find(args);
        res.status(200).send({
            success: true,
            products
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while filtering products"
        })
    }
}

const productCountController = async (req, res) => {
    try {
        const total = await productModel.findById({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            total
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while pagination products"
        })
    }
}

const productListController = async (req, res) => {
    try {
        const perPage = 6;
        const page = req.params.page ? req.params.page : 1;
        const products = await productModel.find({}).select('-photo').skip((page - 1) * perPage).limit(perPage).sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            products
        })
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while per page products"
        })
    }
}

const searchProductController = async (req, res) => {
    try {
        const { keyword } = req.params;
        const results = await productModel.find({
            $or: [
                { name: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }).select('-photo')
        res.send(results);
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "error while searching products"
        })
    }
}

const relatedProductController = async (req, res) => {
    try {
        const { pid, cid } = req.params;
        const products = await productModel
            .find({
                category: cid,
                _id: { $ne: pid },
            })
            .select("-photo")
            .limit(3)
            .populate("category");
        res.status(200).send({
            success: true,
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(400).send({
            success: false,
            message: "error while geting related product",
            error,
        });
    }
}

const productCategoryController = async (req, res) => {
    try {
        const category = await categroyModel.findOne({ slug: req.params.slug });
        const products = await productModel.find({ category }).populate("category");
        res.status(200).send({
            success: true,
            category,
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(400).send({
            success: false,
            error,
            message: "Error While Getting products",
        });
    }
}

const braintreeTokenController = async (req, res) => {
    try {
        gateway.clientToken.generate({}, function (err, response) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        });
    } catch (error) {
        //console.log(error);
    }
}

const braintreePaymentController = async (req, res) => {
    try {
        const { nonce, cart } = req.body;
        let total = 0;
        cart.map((i) => {
            total += i.price;
        });
        let newTransaction = gateway.transaction.sale(
            {
                amount: total,
                paymentMethodNonce: nonce,
                options: {
                    submitForSettlement: true,
                },
            },
            function (error, result) {
                if (result) {
                    const order = new orderModel({
                        products: cart,
                        payment: result,
                        buyer: req.user._id,
                    }).save();
                    res.json({ ok: true });
                } else {
                    res.status(500).send(error);
                }
            }
        );
    } catch (error) {
        //console.log(error);
    }
}
module.exports = { createProductController, getProductController, getSingleProduct, productPhotoController, deleteProductController, updateProductController, productFilterController, productCountController, productListController, searchProductController, relatedProductController, productCategoryController, braintreeTokenController, braintreePaymentController };