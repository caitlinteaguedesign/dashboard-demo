import React from "react";
import moment from "moment";

export function TimeStamp(props) {
  let statement;

  if (!props.datetime) {
    statement = <p>Uh-oh, something went wrong!</p>;
  } else {
    const relativeDatetime = moment().calendar(props.datetime);
    statement = (
      <p>
        last updated <span>{relativeDatetime}</span>
      </p>
    );
  }

  return <div className="timestamp">{statement}</div>;
}
