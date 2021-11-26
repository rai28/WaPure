import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButton } from "react-paypal-button-v2";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { detailsOrder, payOrder } from "../actions/reportActions";
import axios from "axios";
import certifiedlogo from "../assets/images/certifiedlogo.png";
import { REPORT_PAY_RESET } from "../constants/reportConstants";
export default function ReportGenerationScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { report, loading, error } = orderDetails;
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
                    Report Generated at{" "}
                    {report.paidAt.slice(0, 10).split("-").reverse().join("-")}
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
                <p>
                  {/* if payment status is paid then show result */}
                  {report.isPaid ? (
                    <div>
                      <table className="table table-bordered">
                        <caption>
                          <h4> Report Results</h4>
                        </caption>
                        <thead>
                          <tr>
                            <th>Property</th>
                            <th>User Value</th>
                            <th>Permissible Range</th>
                            <th>Remarks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Hardness</td>
                            <td>{report.reportFormContent.hardness}</td>
                            <td>200 to 600</td>
                            <td>
                              {report.reportFormContent.hardness > 200 &&
                              report.reportFormContent.hardness < 600
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                          <tr>
                            <td>Total Dissolved Solids</td>
                            <td>
                              {report.reportFormContent.totalDissolvedSolids}
                            </td>
                            <td>0 - 20000</td>
                            <td>
                              {report.reportFormContent.totalDissolvedSolids >
                                0 &&
                              report.reportFormContent.totalDissolvedSolids <
                                20000
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                          <tr>
                            <td>Chloroamines</td>
                            <td>{report.reportFormContent.chloroamines}</td>
                            <td>0-10</td>
                            <td>
                              {report.reportFormContent.chloroamines > 0 &&
                              report.reportFormContent.chloroamines < 10
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                          <tr>
                            <td>Sulfates</td>
                            <td>{report.reportFormContent.sulfates}</td>
                            <td>200-4000</td>
                            <td>
                              {report.reportFormContent.sulfates > 200 &&
                              report.reportFormContent.sulfates < 4000
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                          <tr>
                            <td>Trihalomethanes</td>
                            <td>{report.reportFormContent.trihalomethanes}</td>
                            <td>0-80 </td>
                            <td>
                              {report.reportFormContent.trihalomethanes > 0 &&
                              report.reportFormContent.trihalomethanes < 80
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                          <tr>
                            <td>Organic Carbon</td>
                            <td>{report.reportFormContent.organicCarbon}</td>
                            <td>0-13</td>
                            <td>
                              {report.reportFormContent.organicCarbon > 0 &&
                              report.reportFormContent.organicCarbon < 13
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                          <tr>
                            <td>Turbidity</td>
                            <td>{report.reportFormContent.turbidity}</td>
                            <td>0-4</td>
                            <td>
                              {report.reportFormContent.turbidity > 0 &&
                              report.reportFormContent.turbidity < 4
                                ? "Pass"
                                : "Fail"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="report-result-container">
                        {report.reportFormContent.hardness > 200 &&
                        report.reportFormContent.hardness < 600 &&
                        report.reportFormContent.totalDissolvedSolids > 0 &&
                        report.reportFormContent.totalDissolvedSolids < 20000 &&
                        report.reportFormContent.chloroamines > 0 &&
                        report.reportFormContent.chloroamines < 10 &&
                        report.reportFormContent.sulfates > 200 &&
                        report.reportFormContent.sulfates < 4000 &&
                        report.reportFormContent.trihalomethanes > 0 &&
                        report.reportFormContent.trihalomethanes < 80 &&
                        report.reportFormContent.organicCarbon > 0 &&
                        report.reportFormContent.organicCarbon < 13 &&
                        report.reportFormContent.turbidity > 0 &&
                        report.reportFormContent.turbidity < 4 ? (
                          <MessageBox variant="success">
                            <div className="final-result-output">
                              <h4> Report Passed</h4>
                              <p> It's safe to drink this water.</p>
                            </div>
                          </MessageBox>
                        ) : (
                          <MessageBox variant="danger">
                            <div className="final-result-output">
                              <h4> Report is Failed</h4>
                              <p> Water Quality is not good</p>
                            </div>
                          </MessageBox>
                        )}
                      </div>
                      <div className="certified-logo-png">
                        <img
                          src={certifiedlogo}
                          alt="certified logo"
                          width="100"
                          height="100"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <MessageBox variant="danger">
                        Payment Not Successful Yet
                      </MessageBox>
                    </div>
                  )}
                </p>
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
                <h2>Total Price</h2>
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
