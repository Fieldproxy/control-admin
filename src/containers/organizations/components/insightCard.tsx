import React from "react";
import Loader from "../../../components/loader";

interface insightPropI {
  loading: Boolean;
  data?: Number;
}

function InsightCard(props: insightPropI) {
  return (
    <div className="insight-card">
      <div className="content">{props.loading ? <Loader /> : props.data}</div>
    </div>
  );
}

export default InsightCard;
