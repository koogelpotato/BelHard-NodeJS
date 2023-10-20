const express = require("express");
const { request } = require("../../app");
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Orders were fetched"
    });
});

router.post('/', (req, res, next) => {
    const order = {
        productId : req.body.productId,
        quantity: req.body.quantity
    };
    res.status(201).json({
        message: "Orders was created",
        createdOrder: order
    });
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Got order with id: " + req.params.orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: "Deleting order with id: " + req.params.orderId
    });
});

module.exports = router;