const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportFormContent: {
      // hardness,
      //   totalDissolvedSolids,
      //   chloroamines,
      //   sulfates,
      //   trihalomethanes,
      //   organicCarbon,
      //   turbidity,
      hardness: { type: Number, required: true, default: 0 },
      totalDissolvedSolids: { type: Number, required: true, default: 0 },
      chloroamines: { type: Number, required: true, default: 0 },
      sulfates: { type: Number, required: true, default: 0 },
      trihalomethanes: { type: Number, required: true, default: 0 },
      organicCarbon: { type: Number, required: true, default: 0 },
      turbidity: { type: Number, required: true, default: 0 },
    },
    paymentMethod: { type: String, required: true, default: "null" },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    reportPrice: { type: Number, required: true, default: "null" },
    totalPrice: { type: Number, required: true, default: "null" },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      default: "null",
    },
    isPaid: { type: Boolean, required: true, default: "null", default: false },
    paidAt: { type: Date },

    isReportGenerated: {
      type: Boolean,
      required: true,
      default: "null",
      default: false,
    },
    reportGeneratedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);
const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
