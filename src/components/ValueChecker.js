import React from "react";

// images
import Alert from "../images/alert.svg?react";

export function ValueChecker(props) {
  let statement;
  let icon;

  // if the value is null or not returned for some reason
  // (0 might have returned incorrectly once, requires more tests)
  if (!props.value && props.value !== 0) {
    statement = "Unknown";
  }

  // we have a value!
  else {
    // what kind of comparison do we have?
    if (props.comparison === "lessthan") {
      // add an alert!
      if (props.value <= props.threshold) {
        icon = (
          <div className="alert">
            <Alert />
          </div>
        );
      }
    } else if (props.comparison === "greaterthan") {
      // add an alert!
      if (props.value >= props.threshold) {
        icon = (
          <div className="alert">
            <Alert />
          </div>
        );
      }
    } else if (props.comparison === "inrange") {
      var min = props.threshold.min;
      var max = props.threshold.max;
      var value = props.value;

      if (value >= max || value <= min) {
        icon = (
          <div className="alert">
            <Alert />
          </div>
        );
      }
    }

    // start making the statement
    statement = props.value.toLocaleString();

    // do we have any other values? (typically unit labels)
    if (props.beforeValue) {
      // append to start of statement
      statement = props.beforeValue + statement;
    }
    if (props.afterValue) {
      // append to end of statement
      statement = statement + props.afterValue;
    }
  }

  return (
    <div className="value-n-optional-icon">
      <div className="value">{statement}</div>
      {icon}
    </div>
  );
}
