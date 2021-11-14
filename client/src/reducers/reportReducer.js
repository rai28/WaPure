import {
  REPORT_CREATE_FAILURE,
  REPORT_CREATE_REQUEST,
  REPORT_CREATE_RESET,
  REPORT_CREATE_SUCCESS,
  REPORT_DETAILS_REQUEST,
  REPORT_DETAILS_FAILURE,
  REPORT_DETAILS_SUCCESS,
  REPORT_PAY_REQUEST,
  REPORT_PAY_SUCCESS,
  REPORT_PAY_FAILURE,
  REPORT_PAY_RESET,
  REPORT_LIST_MINE_REQUEST,
  REPORT_LIST_MINE_SUCCESS,
  REPORT_LIST_MINE_FAILURE,
} from "../constants/reportConstants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_CREATE_REQUEST:
      return { loading: true };
    case REPORT_CREATE_SUCCESS:
      return { loading: false, success: true, report: action.payload };
    case REPORT_CREATE_FAILURE:
      return { loading: false, error: action.payload };
    case REPORT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case REPORT_DETAILS_REQUEST:
      return { loading: true };
    case REPORT_DETAILS_SUCCESS:
      return { loading: false, report: action.payload };
    case REPORT_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_PAY_REQUEST:
      return { loading: true };
    case REPORT_PAY_SUCCESS:
      return { loading: false, success: true };
    case REPORT_PAY_FAILURE:
      return { loading: false, error: action.payload };
    case REPORT_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderMineListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case REPORT_LIST_MINE_REQUEST:
      return { loading: true };

    case REPORT_LIST_MINE_SUCCESS:
      return { loading: false, orders: action.payload };

    case REPORT_LIST_MINE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
