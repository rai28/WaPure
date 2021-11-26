import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/reportActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Navbar from "../components/navbar/Navbar";
export default function ReportHistoryScreen(props) {
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <h2 className="report-history-heading">Report History</h2>
      <div className="history-container">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table report-history-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((report) => (
                <tr key={report._id}>
                  <td>{report._id}</td>
                  <td>{report.createdAt.substring(0, 10)}</td>
                  <td>{report.totalPrice.toFixed(2)}</td>
                  <td>
                    {report.isPaid ? report.paidAt.substring(0, 10) : "No"}
                  </td>
                  <td>
                    {report.isPaid
                      ? "Report Generated"
                      : "Report Not Generated"}
                  </td>
                  <td>
                    {" "}
                    <button
                      type="button"
                      className="small"
                      onClick={() => {
                        props.history.push(`/report/${report._id}`);
                      }}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
