require("dotenv").config();
const app = require("express")();

app.use(require("body-parser").json());

// routes
const paymentRoutes = require('./routes/payments');
app.use(paymentRoutes);

app.listen(3001, () => console.log("Listening on port 3001"));

// test