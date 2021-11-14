import {
  REPORT_CREATE_FAILURE,
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_SUCCESS,
  REPORT_DETAILS_REQUEST,
  REPORT_DETAILS_FAILURE,
  REPORT_DETAILS_SUCCESS,
  REPORT_PAY_REQUEST,
  REPORT_PAY_FAILURE,
  REPORT_PAY_SUCCESS,
  REPORT_LIST_MINE_SUCCESS,
  REPORT_LIST_MINE_REQUEST,
  REPORT_LIST_MINE_FAILURE,
} from "../constants/reportConstants";
import axios from "axios";
export const createOrder = (report) => async (dispatch, getState) => {
  dispatch({ type: REPORT_CREATE_REQUEST, payload: report });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post("/api/reports", report, {
      headers: { Authorization: `Bearer ${userInfo.data}` },
    });
    dispatch({ type: REPORT_CREATE_SUCCESS, payload: data.report });
  } catch (err) {
    dispatch({
      type: REPORT_CREATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({ type: REPORT_DETAILS_REQUEST, payload: orderId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get(`/api/reports/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.data}` },
    });
    dispatch({ type: REPORT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: REPORT_DETAILS_FAILURE, payload: message });
  }
};

export const payOrder =
  (report, paymentResult) => async (dispatch, getState) => {
    dispatch({ type: REPORT_PAY_REQUEST, payload: { report, paymentResult } });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = axios.put(
        `/api/reports/${report._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.data}` },
        }
      );
      dispatch({ type: REPORT_PAY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: REPORT_PAY_FAILURE, payload: message });
    }
  };

export const listMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: REPORT_LIST_MINE_REQUEST });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("/api/reports/mine/history", {
      headers: { Authorization: `Bearer ${userInfo.data}` },
    });
    dispatch({ type: REPORT_LIST_MINE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: REPORT_LIST_MINE_FAILURE, payload: message });
  }
};
