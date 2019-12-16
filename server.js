require("dotenv").config();
const app = require("express")();
// initialize the stripe client library using the secret key
const stripe = require("stripe")(process.env.SECRET_KEY); // put stripe sk here
app.use(require("body-parser").json());
// used to create a random string preventing duplicate payments
const uuid = require('uuid/v4');

// post request for incoming stripe requests via front end application
app.post("/charge", async (req, res) => {
  console.log("Request: ", req.body)

  let error;
  let status;
  try {
    // destructure product and token information coming from req.body
    const {checkoutItems, token} = req.body;
    // create a stripe customer with token info
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    // prevents customer from being charged twice
    const idempotency_key = uuid();
    // create a charge
    const charge = await stripe.charges.create({
      amount: checkoutItems.totalPrice * 100,
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
    console.log("Charge: ", {charge})
    status = "success";
  } catch (error) {
    console.error("Error: ", error)
    status = "failure";
  }
  res.json({error, status})
});


app.listen(3001, () => console.log("Listening on port 3001"));