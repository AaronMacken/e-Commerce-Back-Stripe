const stripe = require("stripe")(process.env.SECRET_KEY); // put stripe sk here
const db = require('../models');
// used to create a random string preventing duplicate payments
const uuid = require('uuid/v4');
const { getFinalArr } = require('./dataCombiner')

exports.processPayment = async function (req, res) {
    let totalPrice = 0;
    let sentProducts = req.body.checkoutItems.data.map(e => { // incoming data (array1)
        return e;
    });

    let productIds = req.body.checkoutItems.data.map(e => { // ids from incoming data
        return e.id;
    });

    let foundProducts = await db.Product.find() // actual products retrieved from ids (array2)
        .where("_id")
        .in(productIds)
        .exec();

    let finalArr = getFinalArr(sentProducts, foundProducts);

    for (let i = 0; i < finalArr.length; i++) {
        totalPrice += (finalArr[i].price * finalArr[i].qty);
    }

    if (sentProducts.length === foundProducts.length) {
        let error;
        let status;
        try {
            // destructure product and token information coming from req.body
            const { checkoutItems, token } = req.body;
            // create a stripe customer with token info
            const customer = await stripe.customers.create({
                email: token.email,
                source: token.id
            })
            
            // prevents customer from being charged twice
            const idempotency_key = uuid();


            // create a charge
            const charge = await stripe.charges.create({
                amount: totalPrice * 100, // takes price in cents, pass to it the dollar amount * 100
                currency: "usd",
                customer: customer.id,
                receipt_email: token.email,
                description: `Purchased: ${checkoutItems.orderString}`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            }, {
                idempotency_key
            })
            status = "success";
            totalPrice = 0;
        } catch (error) {
            status = "failure";
            totalPrice = 0;
            console.log(error)
            res.json({ error, status })
        }
        
    } else {
        status = "failure";
        totalPrice = 0;
        let err = new Error("Invoice to database conflict.")
        console.log(error);
        res.json({ err , status})
    }
}
