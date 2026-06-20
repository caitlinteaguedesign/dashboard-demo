import React from "react";

// constants
import * as Constants from "./data/constants";

// visual components
import { Section } from "./visual/Section";
import { TimeStamp } from "./visual/TimeStamp";
import { ValueChecker } from "./visual/ValueChecker";

export class OrderActivity extends React.Component {
  // some things to prevent memory leak
  visible = false;
  initialRun = true;

  constructor(props) {
    super(props);

    this.state = {
      datetime: new Date(),
      ordersLastHour: 0,
      ordersLast24Hours: 36,
    };
  }

  componentDidMount() {
    // this.visible = true;
    // if(this.visible) {
    // 	// fetch data the first time
    // 	this.timer = setInterval(
    // 		() => this.fetchData(),
    // 		1000
    // 	);
    // }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  fetchData() {
    // after initial, reset timer
    if (this.initialRun) {
      clearInterval(this.timer);

      this.initialRun = false;
      this.timer = setInterval(() => this.fetchData(), 300000);
    }

    // fetch the data
    fetch(Constants.ENDPOINT + "main")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        this.setState({
          ordersLastHour: data.h1,
          ordersLast24Hours: data.h24,
          datetime: new Date(),
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    // for value checker
    const threshold = 0;
    const comparison = "lessthan";

    return (
      <React.Fragment>
        <div className="content">
          <Section name="Past Hour">
            <ValueChecker
              value={this.state.ordersLastHour}
              threshold={threshold}
              comparison={comparison}
            />
          </Section>

          <Section name="Past 24 Hours">
            <ValueChecker
              value={this.state.ordersLast24Hours}
              threshold={threshold}
              comparison={comparison}
            />
          </Section>
        </div>

        <TimeStamp datetime={this.state.datetime} />
      </React.Fragment>
    );
  }
}
