import {
  CART_SAVE_PAYMENT_METHOD,
  USER_SAVE_REPORT_DATA,
} from "../constants/userInputChoiceCartConstants";
export const userInputChoiceCartReducer = (
  state = { cartItems: [] },
  action
) => {
  switch (action.type) {
    case USER_SAVE_REPORT_DATA:
      return { ...state, reportFormContent: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    default:
      return state;
  }
};
