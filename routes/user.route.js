let mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

// User Models
let userSchema = require('../models/User');
let MoneySchema = require('../models/TransferMoney');

// CREATE user
router.post('/create-user', (req, res, next) => {
    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            // Redirect response with JSON data
            res.json({ redirect: "/" });
        }
    });
});

// CREATE transaction
router.post('/create-transaction', async (req, res) => {
    const { name1, name2, amount } = req.body;
    const from = name1, to = name2;

    try {
        // Fetch the sender's details
        const fromCustomer = await userSchema.findOne({ name: from });
        if (!fromCustomer) {
            return res.status(404).json({ message: `User ${from} not found` });
        }

        const newFromBalance = Number(fromCustomer.amount) - Number(amount);

        // Update sender's balance
        await userSchema.updateOne({ name: from }, { amount: newFromBalance });

        // Fetch the recipient's details
        const toCustomer = await userSchema.findOne({ name: to });
        if (!toCustomer) {
            return res.status(404).json({ message: `User ${to} not found` });
        }

        const newToBalance = Number(toCustomer.amount) + Number(amount);

        // Update recipient's balance
        await userSchema.updateOne({ name: to }, { amount: newToBalance });

        // Save the transaction details
        const transaction = new MoneySchema({
            name1: name1,
            name2: name2,
            amount,
        });

        await transaction.save();
        res.json(transaction);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// READ users
router.get('/', (req, res, next) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// READ transactions
router.get('/transaction-history', (req, res, next) => {
    MoneySchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// DELETE user
router.delete('/delete-user/:id', (req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "User deleted successfully",
                data
            });
        }
    });
});

module.exports = router;
