import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
export default function UserDashboard() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <div>
      <Navbar />
      <div className="user-dashboard-div">
        {/* user name */}
        <h2 className="user-name-div">
          Hello <span className="r-user-name">{userInfo.name}</span>
        </h2>
        <p className="greet-dashboard-msg">Glad to see you again!</p>
        <div className="user-name-div">How can we help you?</div>
        {/* create two buttons in same line */}
        <div className="user-dashboard-buttons">
          <Link to="/reports/history">
            <button className="user-dashboard-button prev-tests-btn">
              Previous Tests
            </button>
          </Link>
          <Link to="/new-report">
            <button className="user-dashboard-button new-test-btn">
              New Test
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
