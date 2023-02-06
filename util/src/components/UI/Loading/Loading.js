import { Fragment } from "react";
import LoadingSpinner from "../../../img/Loading_spinner.gif";

const Loading = () => {
  return (
    <Fragment>
      <img src={LoadingSpinner} style={{ width: 100, height: 100 }} alt="Loading..." />
    </Fragment>
  );
};

export default Loading;
