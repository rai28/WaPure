import React from "react";
import { HashRouter, Link, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { useSelector, useDispatch } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserDashboard from "./screens/UserDashboard";
import ReportFormDataScreen from "./screens/ReportFormDataScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PreviewReportDataScreen from "./screens/PreviewReportDataScreen";
import PrivateRoute from "./components/PrivateRoute";
import ReportGenerationScreen from "./screens/ReportGenerationScreen";
import ReportHistoryScreen from "./screens/ReportHistoryScreen";
import ContactUsScreen from "./screens/ContactUsScreen";
import drinkWaterPng from "./assets/images/drink-water.png";
import loginpng from "./assets/images/login.png";
import boypng from "./assets/images/boy.png";

function App() {
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // user signoutHandler
  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <HashRouter>
      <div>
        <div className="grid-container">
          <header className="row">
            <div>
              <Link to="/">
                <h1 className="brand-logo">
                  <img src={drinkWaterPng} alt="logo" width="40" height="40" />{" "}
                  WaPure{" "}
                </h1>
              </Link>
            </div>
            <div>
              {userInfo ? (
                <div className="dropdown">
                  <Link to="/dashboard">
                    <img
                      src={boypng}
                      height="50px"
                      width="50px"
                      alt="signin"
                      className="boypng-icon"
                    />{" "}
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/dashboard">User Dashboard</Link>
                    </li>
                    <li>
                      <Link to="/signout" onClick={signoutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link to="/register">
                  <div className="signup-div">
                    <p className="signup-text">Sign Up</p>
                  </div>
                </Link>
              )}
            </div>
          </header>
          <main>
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            <PrivateRoute
              path="/dashboard"
              component={UserDashboard}
            ></PrivateRoute>
            <Route path="/new-report" component={ReportFormDataScreen}></Route>
            <PrivateRoute
              path="/checkout"
              component={PaymentMethodScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/review-report"
              component={PreviewReportDataScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/report/:id"
              component={ReportGenerationScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/reports/history"
              component={ReportHistoryScreen}
            ></PrivateRoute>
            <PrivateRoute
              path="/profile"
              component={ProfileScreen}
            ></PrivateRoute>
            <Route path="/contact-us" component={ContactUsScreen}></Route>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
