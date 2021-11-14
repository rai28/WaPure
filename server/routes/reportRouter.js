const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const isAuth = require("../middlewares/isAuth");
const Report = require("../models/reportModel");
const reportRouter = express.Router();

reportRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // check for report errors
    if (req.body.length === 0) {
      res.status(400).send("No report found");
    } else {
      // create report
      const report = new Report({
        orderItems: req.body.orderItems,
        reportFormContent: req.body.reportFormContent,
        paymentMethod: req.body.paymentMethod,
        reportPrice: req.body.reportPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createdReport = await report.save();
      res
        .status(201)
        .send({
          message: "report created successfully",
          report: createdReport,
        });
    }
  })
);

reportRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    if (report) {
      res.status(200).send(report);
    } else {
      res.status(404).send({ message: "report not found" });
    }
  })
);

reportRouter.put(
  "/:id/pay",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const report = await Report.findById(req.params.id);
    // console.log();
    if (req.body.status === "COMPLETED") {
      await report.updateOne({
        $set: {
          isPaid: true,
          paidAt: Date.now(),
        },
      });
      res.status(200).send({ message: "report paid successfully" });
    } else {
      res.status(404).send({ message: "report Not Found" });
    }
  })
);

reportRouter.get(
  "/mine/history",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Report.find({ user: req.user._id });
    res.send(orders);
  })
);

module.exports = reportRouter;
