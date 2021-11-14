import {
  CART_SAVE_PAYMENT_METHOD,
  USER_SAVE_REPORT_DATA,
} from "../constants/userInputChoiceCartConstants";

export const saveReportFormData = (data) => (dispatch) => {
  dispatch({
    type: USER_SAVE_REPORT_DATA,
    payload: data,
  });
  localStorage.setItem("reportFormContent", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
