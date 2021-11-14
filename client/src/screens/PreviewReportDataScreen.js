import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CheckOutNavigation from "../components/CheckOutNavigation";
import { createOrder } from "../actions/reportActions";
import { REPORT_CREATE_RESET } from "../constants/reportConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
export default function PreviewReportDataScreen(props) {
  const userInputChoiceCart = useSelector((state) => state.userInputChoiceCart);
  if (!userInputChoiceCart.paymentMethod) {
    props.history.push("/checkout");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, report } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2));
  userInputChoiceCart.reportPrice = 100;
  userInputChoiceCart.totalPrice = toPrice(userInputChoiceCart.reportPrice);
  const dispatch = useDispatch();
  const PlaceOrderHandler = () => {
    dispatch(
      createOrder({
        ...userInputChoiceCart,
        orderItems: userInputChoiceCart.cartItems,
      })
    );
  };
  useEffect(() => {
    if (success) {
      props.history.push(`/report/${report._id}`);
      dispatch({ type: REPORT_CREATE_RESET });
    }
  }, [dispatch, props.history, report, success]);
  return (
    <div>
      <CheckOutNavigation step1 step2 step3 step4></CheckOutNavigation>
      <div className="preview-data-col-container top">
        <div className="col-2">
          <ul>
            <li>
              <div className="report-card-box card-body">
                <h2>Report Data</h2>
                <p>
                  <div className="report-data-Input-Container">
                    <strong>Report Data Input: </strong>
                  </div>

                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Hardness</th>
                        <th>Total Dissolved Solids</th>
                        <th>Chloroamines</th>
                        <th>Sulfates</th>
                        <th>Trihalomethanes</th>
                        <th>Organic Carbon</th>
                        <th>Turbidity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {userInputChoiceCart.reportFormContent.hardness}
                        </td>
                        <td>
                          {
                            userInputChoiceCart.reportFormContent
                              .totalDissolvedSolids
                          }
                        </td>
                        <td>
                          {userInputChoiceCart.reportFormContent.chloroamines}
                        </td>
                        <td>
                          {userInputChoiceCart.reportFormContent.sulfates}
                        </td>
                        <td>
                          {
                            userInputChoiceCart.reportFormContent
                              .trihalomethanes
                          }
                        </td>
                        <td>
                          {userInputChoiceCart.reportFormContent.organicCarbon}
                        </td>
                        <td>
                          {userInputChoiceCart.reportFormContent.turbidity}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </p>
                <p>
                  <strong>Payment Method: </strong>{" "}
                  {userInputChoiceCart.paymentMethod}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-4 charge-sum-box">
          <div className="">
            <ul>
              <li>
                <h2>report Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>
                    <b>Report Charges</b>
                  </div>
                  <div>
                    <b>Rs {userInputChoiceCart.reportPrice.toFixed(2)}</b>
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <b>Total Charges</b>
                  </div>
                  <div>
                    <b>Rs {userInputChoiceCart.totalPrice.toFixed(2)}</b>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={PlaceOrderHandler}
                  className="primary block"
                >
                  Proceed Further
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
