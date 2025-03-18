const express = require("express");
const paypalClient = require("../config/paypalConfig.js");

const router = express.Router();

router.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "INR",
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
