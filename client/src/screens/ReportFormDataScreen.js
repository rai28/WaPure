import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveReportFormData } from "../actions/userInputChoiceCartActions";
import CheckOutNavigation from "../components/CheckOutNavigation";
export default function ReportFormDataScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const userInputChoiceCart = useSelector((state) => state.userInputChoiceCart);
  const { reportFormContent } = userInputChoiceCart;
  const { userInfo } = userSignin;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [hardness, setHardness] = useState(reportFormContent.hardness);
  const [totalDissolvedSolids, setTotalDissolvedSolids] = useState(
    reportFormContent.totalDissolvedSolids
  );
  const [chloroamines, setChloroamines] = useState(
    reportFormContent.chloroamines
  );
  const [sulfates, setSulfates] = useState(reportFormContent.sulfates);
  const [trihalomethanes, setTrihalomethanes] = useState(
    reportFormContent.trihalomethanes
  );
  const [organicCarbon, setOrganicCarbon] = useState(
    reportFormContent.organicCarbon
  );
  const [turbidity, setTurbidity] = useState(reportFormContent.turbidity);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveReportFormData({
        hardness,
        totalDissolvedSolids,
        chloroamines,
        sulfates,
        trihalomethanes,
        organicCarbon,
        turbidity,
      })
    );
    props.history.push("/checkout");
  };
  return (
    <div>
      <CheckOutNavigation step1></CheckOutNavigation>
      <form className="report-input-form-container" onSubmit={submitHandler}>
        <div>
          <h1>Report Data</h1>
        </div>
        <div>
          {/* for hardness */}
          <label htmlFor="hardness">Hardness</label>
          <input
            type="text"
            id="hardness"
            name="hardness"
            value={hardness}
            onChange={(e) => setHardness(e.target.value)}
            required
          ></input>
        </div>
        {/* for total dissolved solids */}
        <div>
          <label htmlFor="totalDissolvedSolids">Total Dissolved Solids</label>
          <input
            type="text"
            id="totalDissolvedSolids"
            name="totalDissolvedSolids"
            value={totalDissolvedSolids}
            onChange={(e) => setTotalDissolvedSolids(e.target.value)}
            required
          ></input>
        </div>
        {/* for chloroamines */}
        <div>
          <label htmlFor="chloroamines">Chloroamines</label>
          <input
            type="text"
            id="chloroamines"
            name="chloroamines"
            value={chloroamines}
            onChange={(e) => setChloroamines(e.target.value)}
            required
          ></input>
        </div>
        {/* for sulfates */}
        <div>
          <label htmlFor="sulfates">Sulfates</label>
          <input
            type="text"
            id="sulfates"
            name="sulfates"
            value={sulfates}
            onChange={(e) => setSulfates(e.target.value)}
            required
          ></input>
        </div>
        {/* for trihalomethanes */}
        <div>
          <label htmlFor="trihalomethanes">Trihalomethanes</label>
          <input
            type="text"
            id="trihalomethanes"
            name="trihalomethanes"
            value={trihalomethanes}
            onChange={(e) => setTrihalomethanes(e.target.value)}
            required
          ></input>
        </div>
        {/* for organic carbon */}
        <div>
          <label htmlFor="organicCarbon">Organic Carbon</label>
          <input
            type="text"
            id="organicCarbon"
            name="organicCarbon"
            value={organicCarbon}
            onChange={(e) => setOrganicCarbon(e.target.value)}
            required
          ></input>
        </div>
        {/* for turbidity */}
        <div>
          <label htmlFor="turbidity">Turbidity</label>
          <input
            type="text"
            id="turbidity"
            name="turbidity"
            value={turbidity}
            onChange={(e) => setTurbidity(e.target.value)}
            required
          ></input>
        </div>
        <div>
          <label> </label>
          <button className="primary report-sbmt-btn" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
