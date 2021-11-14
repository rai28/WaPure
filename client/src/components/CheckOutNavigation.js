import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "active" : ""}>Sign-In</div>
      <div className={props.step2 ? "active" : ""}>Enter Water Data</div>
      <div className={props.step3 ? "active" : ""}>Select Payment Method</div>
      <div className={props.step4 ? "active" : ""}>Preview</div>
    </div>
  );
}
