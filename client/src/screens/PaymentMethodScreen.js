import React, { useState } from "react";
import CheckOutNavigation from "../components/CheckOutNavigation";
import { useDispatch } from "react-redux";
import { savePaymentMethod } from "../actions/userInputChoiceCartActions";
export default function PaymentMethodScreen(props) {
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/review-report");
  };
  return (
    <div>
      <CheckOutNavigation step1 step2 step3></CheckOutNavigation>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h2>Choose Your Payment Method</h2>
        </div>

        <div className="paymentMethod-container">
          <div>
            <input
              type="radio"
              name="paymentMethod"
              value="PayPal"
              checked
              id="paypal"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal"> PayPal </label>
          </div>
          <div>
            <input
              type="radio"
              name="paymentMethod"
              value="Paytm"
              id="paytm"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
              disabled="yes"
            ></input>
            <label htmlFor="paytm"> Paytm </label>
          </div>
        </div>
        <div>
          <button className="primary" type="submit">
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}
