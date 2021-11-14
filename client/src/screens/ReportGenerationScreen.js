import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder, payOrder } from "../actions/reportActions";
import axios from "axios";
import { REPORT_PAY_RESET } from "../constants/reportConstants";
export default function ReportGenerationScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { report, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const orderPay = useSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    error: errorPay,
    success: successPay,
  } = orderPay;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.pypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!report || !successPay || (report && report._id !== orderId)) {
      dispatch({ type: REPORT_PAY_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!report.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, report]);
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(report, paymentResult));
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h4 className="report-id-heading">Reporty ID - {report._id}</h4>
      <div className="row top">
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
                        <td>{report.reportFormContent.hardness}</td>
                        <td>{report.reportFormContent.totalDissolvedSolids}</td>
                        <td>{report.reportFormContent.chloroamines}</td>
                        <td>{report.reportFormContent.sulfates}</td>
                        <td>{report.reportFormContent.trihalomethanes}</td>
                        <td>{report.reportFormContent.organicCarbon}</td>
                        <td>{report.reportFormContent.turbidity}</td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </p>
                {report.isReportGenerated ? (
                  <MessageBox variant="success">
                    Report Generated at {report.reportGeneratedAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Report Not Generated</MessageBox>
                )}
                <p>
                  <strong>Payment Method: </strong> {report.paymentMethod}
                </p>
                <h2>Payment Status</h2>
                {report.isPaid ? (
                  <MessageBox variant="success">
                    Payment Successful At :{" "}
                    {report.paidAt.slice(0, 10).split("-").reverse().join("-")}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
                <h4> Report Results</h4>
                <p></p>
              </div>
            </li>
          </ul>
          <div
            className="generat-pdf-btn-container"
            onClick={() =>
              // print report-screen-container-id
              window.print()
            }
          >
            Generate PDF
          </div>
        </div>
        <div className="col-4 payment-box">
          <div className="payment-card card-body">
            <ul>
              <li>
                <h2>report Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Report Charges</div>
                  <div>Rs {report.reportPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Total Charges</div>
                  <div>Rs {report.totalPrice.toFixed(2)}</div>
                </div>
              </li>
              {!report.isPaid && (
                <li>
                  {!sdkReady ? (
                    <LoadingBox></LoadingBox>
                  ) : (
                    <>
                      {errorPay && (
                        <MessageBox variant="danger">{errorPay}</MessageBox>
                      )}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      <PayPalButton
                        amount={report.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
