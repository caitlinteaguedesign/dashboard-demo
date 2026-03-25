import React from "react";

// constants
import * as Constants from "./data/constants";

// visual components
import { Section } from "./visual/Section";
import { TimeStamp } from "./visual/TimeStamp";
import { ValueChecker } from "./visual/ValueChecker";

export class Traffic extends React.Component {
  // some things to prevent memory leak
  visible = false;
  initialRun = true;

  constructor(props) {
    super(props);

    this.state = {
      datetime: new Date(),
      topReferrer: "http://google.com",
      referral_count: 28,
      pageloads: 561,
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

    //fetch the data
    fetch(Constants.ENDPOINT + "traffic")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        this.setState({
          datetime: new Date(),
          topReferrer: data.TopReferrer,
          referral_count: data.NumReferrals,
          pageloads: data.PageLoads,
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    let topReferrer;

    if (this.state.topReferrer) {
      topReferrer = (
        <a
          href={this.state.topReferrer}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link truncate"
        >
          {this.state.topReferrer}
        </a>
      );
    } else {
      topReferrer = <p>Unknown</p>;
    }

    return (
      <React.Fragment>
        <div className="content">
          <Section name="Page loads">
            <ValueChecker
              value={this.state.pageloads}
              threshold={50000}
              comparison="greaterthan"
            />
          </Section>
          <Section name="Top referrer">
            {topReferrer}
            <div className="value" style={{ marginTop: "0.5rem" }}>
              {this.state.referral_count.toLocaleString()}
            </div>
          </Section>
        </div>

        <TimeStamp datetime={this.state.datetime} />
      </React.Fragment>
    );
  }
}
