const shortid = require('shortid');
const Razorpay = require('razorpay');

const Transaction = require('../Models/TransactionModels');

var instance = new Razorpay({ key_id: 'rzp_test_j4utDJIZNOsvz6', key_secret: 'CKhrbawLXOExlb1B1BTuKali' })

exports.createOrders=(req,res)=>{
    var options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: shortid.generate()
      };
      instance.orders.create(options, function(err, order) {
        console.log(order);
        res.status(200).json(order)
      });
}

exports.saveTransaction = (req,res) => {
    const transactionObject = new Transaction({
        transaction_id:req.body.razorpay_payment_id,
        transaction_amount:req.body.amount
    })

    transactionObject.save((err,save) => {
        if(err)
            console.log(err)
        else
            console.log(save)
    });
}