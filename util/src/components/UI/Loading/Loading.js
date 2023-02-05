import { Fragment } from "react";
import LoadingSpinner from "../../../img/Loading_spinner.gif";

const Loading = () => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", width: 100, height: 100, margin: "auto" }}
    >
      <img src={LoadingSpinner} alt="Loading..." />
    </div>
  );
};

export default Loading;
