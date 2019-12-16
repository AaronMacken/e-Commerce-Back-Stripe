require("dotenv").config();
const app = require("express")();

app.use(require("body-parser").json());

// routes
const paymentRoutes = require('./routes/payments');
app.use(paymentRoutes);

const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

const errorHandler = require('./handlers/errors');


// if none of the above routes are reached, display this error
app.use(function (req, res, next) {
  let err = new Error("Not Found!");
  err.status = 404;
  next(err);
});

// if the route was reached but there was an issue, use this errorHandler to format the error data
app.use(errorHandler);

app.listen(3001, () => console.log("Listening on port 3001"));