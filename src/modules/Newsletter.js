import React from "react";

// constants
import * as Constants from "../data/constants";

// visual components
import { Section } from "../components/Section";
import { TimeStamp } from "../components/TimeStamp";
import { ValueChecker } from "../components/ValueChecker";

// util
import { formatDollars } from "../util/formatDollars";
import { setTruncate } from "../util/setTruncate";

export class Newsletter extends React.Component {
  // some things to prevent memory leak
  visible = false;
  initialRun = true;

  constructor(props) {
    super(props);

    this.state = {
      datetime: new Date(),
      title: "Weekly Jan 1, 2018",
      subject: "After Holiday Clearance",
      id: 1,
      opens: 452,
      clicks: 158,
      revenue: 7082.58,
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
      this.timer = setInterval(
        () => this.fetchData(),
        3600000, // 1 hour in milliseconds
      );
    }

    //fetch the data
    fetch(Constants.ENDPOINT + "newsletter")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        this.setState({
          title: data.Title,
          subject: data.Subject,
          id: data.ID,
          opens: data.Opens,
          clicks: data.Clicks,
          revenue: data.Revenue,
          datetime: new Date(),
        });
        setTruncate();
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    let subject;

    if (!this.state.subject) {
      subject = <p>Subject not found</p>;
    } else {
      subject = (
        <a
          href="//caitlinteague.com/archive/dashboard/"
          rel="noopener noreferrer"
          className="text-link truncate"
        >
          {this.state.subject}
        </a>
      );
    }

    let title;

    if (!this.state.title) {
      title = "Title not found";
    } else {
      title = this.state.title;
    }

    return (
      <React.Fragment>
        <div className="content">
          <Section name={title}>{subject}</Section>
          <Section name="Opens">
            <ValueChecker value={this.state.opens} />
          </Section>
          <Section name="Clicks">
            <ValueChecker value={this.state.clicks} />
          </Section>
          <Section name="Revenue">
            <ValueChecker value={formatDollars(this.state.revenue)} />
          </Section>
        </div>

        <TimeStamp datetime={this.state.datetime} />
      </React.Fragment>
    );
  }
}
