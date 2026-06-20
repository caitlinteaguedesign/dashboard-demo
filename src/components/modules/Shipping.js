import React from "react";

// constants
import * as Constants from "../data/constants";

// visual components
import { Section } from "../visual/Section";
import { TimeStamp } from "../visual/TimeStamp";
import { ValueChecker } from "../visual/ValueChecker";

// util
import { formatDollars } from "../util/formatDollars";

export class Shipping extends React.Component {
  // some things to prevent memory leak
  visible = false;
  initialRun = true;

  constructor(props) {
    super(props);
    this.state = {
      datetime: new Date(),
      ordersShipped: 26,
      revenue: 276,
      cost: 130,
      net: 146,
      average: 5,
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
    fetch(Constants.ENDPOINT + "ship")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const revenue = data.CustCost;
        const quantity = data.OrdersShipped;
        const cost = data.OurCost;

        const net = this.calculateNet(revenue, cost);
        const average = this.calculateAverage(cost, quantity);

        this.setState({
          datetime: new Date(),
          ordersShipped: quantity,
          revenue: revenue,
          cost: cost,
          net: net,
          average: average,
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  calculateNet(revenue, cost) {
    return revenue - cost;
  }

  calculateAverage(cost, quantity) {
    return cost / quantity;
  }

  render() {
    let label;
    let colorClass;

    if (this.state.net > 0) {
      label = "Profit";
      colorClass = "positive";
    } else {
      label = "Loss";
      colorClass = "negative";
    }

    const netNumber = formatDollars(this.state.net);

    // for value checker (if there are 0 orders shipped, something may be a miss)
    const threshold = 0;
    const comparison = "lessthan";

    return (
      <React.Fragment>
        <div className="content">
          <Section name="Number shipped">
            <ValueChecker
              value={this.state.ordersShipped}
              threshold={threshold}
              comparison={comparison}
            />
          </Section>

          <Section name="Customers paid">
            <div className="value">{formatDollars(this.state.revenue)}</div>
          </Section>

          <Section name="Our cost">
            <div className="value">{formatDollars(this.state.cost)}</div>
          </Section>

          <Section name="Average cost per shipment">
            <div className="value">{formatDollars(this.state.average)}</div>
          </Section>

          <Section name={label}>
            <div className={"value " + colorClass}>{netNumber}</div>
          </Section>
        </div>

        <TimeStamp datetime={this.state.datetime} />
      </React.Fragment>
    );
  }
}
