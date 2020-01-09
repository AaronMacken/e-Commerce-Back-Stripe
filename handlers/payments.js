const stripe = require("stripe")(process.env.SECRET_KEY); // put stripe sk here

// used to create a random string preventing duplicate payments
const uuid = require("uuid/v4");
const db = require("../models");

exports.processPayment = async function(req, res) {
  let totalPrice = 0;

  let sentProducts = req.body.checkoutItems.data.map(e => {
    return e;
  });

  console.log("sent products...");
  console.log(sentProducts);

  let productIds = req.body.checkoutItems.data.map(e => {
    return e.id;
  });

  // actual products
  let foundProducts = await db.Product.find()
    .where("_id")
    .in(productIds)
    .exec();

  console.log("found products...");
  console.log(foundProducts);

  let newArray = foundProducts.map((e, index) => {
    if (foundProducts[index]._id.equals(sentProducts[index].id)) {
      return {
        id: foundProducts[index]._id,
        title: foundProducts[index].title,
        price: foundProducts[index].price,
        qty: sentProducts[index].qty
      };
    }
  });

  console.log('new array...')
  console.log(newArray);


  // let error;
  // let status;
  // try {
  //     // destructure product and token information coming from req.body
  //     const { checkoutItems, token } = req.body;
  //     // create a stripe customer with token info
  //     const customer = await stripe.customers.create({
  //         email: token.email,
  //         source: token.id
  //     })
  //     // prevents customer from being charged twice
  //     const idempotency_key = uuid();
  //     // create a charge
  //     const charge = await stripe.charges.create({
  //         amount: checkoutItems.totalPrice * 100,
  //         currency: "usd",
  //         customer: customer.id,
  //         receipt_email: token.email,
  //         description: `Purchased: ${checkoutItems.orderString}`,
  //         shipping: {
  //             name: token.card.name,
  //             address: {
  //                 line1: token.card.address_line1,
  //                 line2: token.card.address_line2,
  //                 city: token.card.address_city,
  //                 country: token.card.address_country,
  //                 postal_code: token.card.address_zip
  //             }
  //         }
  //     }, {
  //         idempotency_key
  //     })
  //     console.log("Charge: ", { charge })
  //     status = "success";
  // } catch (error) {
  //     console.error("Error: ", error)
  //     status = "failure";
  // }
  // res.json({ error, status })
};
