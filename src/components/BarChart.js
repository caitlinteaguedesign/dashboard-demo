import React from "react";

export function BarChart(props) {
  var header = "";

  if (props.name != null) {
    header = (
      <div className="chart-header">
        <span>{props.name}</span>
      </div>
    );
  }

  const bars = props.values.map((value, key) => {
    return (
      <div className="bar" key={key}>
        <div className="bar-value">{value}</div>
        <div className={"bar-element height-" + value}></div>
      </div>
    );
  });

  return (
    <div className="bar-chart">
      {header}
      <div className="chart-body">{bars}</div>
    </div>
  );
}
