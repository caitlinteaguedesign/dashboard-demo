import React from "react";

// constants
import * as Constants from "../data/constants";

// visual components
import { Section } from "../visual/Section";
import { TimeStamp } from "../visual/TimeStamp";
import { ValueChecker } from "../visual/ValueChecker";

// images
import Link from "../../images/link.svg?react";
import Check from "../../images/check.svg?react";
import Alert from "../../images/alert.svg?react";

// util
import { checkIP } from "../util/checkIP";

export class HighestPageLoadIps extends React.Component {
  // some things to prevent memory leak
  visible = false;
  initialRun = true;

  constructor(props) {
    super(props);

    this.state = {
      datetime: new Date(),
      ips: [
        { address: "192.168.0.95", count: 2523 },
        { address: "142.0.178.123", count: 1546 },
        { address: "192.168.0.256", count: 801 },
        { address: "192.168.0.54", count: 249 },
      ],
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
    fetch(Constants.ENDPOINT + "traffic/iptracking")
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        const rawIps = data.MostLoadsIP;
        var ipData = [];

        for (var i = 0; i < rawIps.length; i++) {
          var address = rawIps[i]["address"];
          var count = rawIps[i]["count"];

          ipData.push({ address: address, count: count });
        }

        this.setState({
          datetime: new Date(),
          ips: ipData,
        });
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    var ipResults = [];

    for (var i = 0; i < this.state.ips.length; i++) {
      var IPaddress = this.state.ips[i]["address"];
      var IPcount = this.state.ips[i]["count"];

      let statement;

      if (IPcount > 500) {
        statement = (
          <div className="pageload-state warning">
            <div className="icon">
              <Alert />
            </div>
            <span>Suspicious behavior</span>
          </div>
        );
      }

      if (checkIP(IPaddress)) {
        statement = (
          <div className="pageload-state okay">
            <div className="icon">
              <Check />
            </div>
            <span>No worries, it's just us!</span>
          </div>
        );
      }

      ipResults.push(
        <Section key={"ip_" + i} name={"#" + (1 + i)}>
          <div className="IPaddress">
            <ValueChecker value={IPaddress} />
            <a
              href={"//whois.domaintools.com/" + IPaddress}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-link"
              title="IP whois lookup"
            >
              <Link />
            </a>
          </div>
          <div className="value">
            {IPcount} <span className="subtext">page loads</span>
          </div>
          {statement}
        </Section>,
      );
    }

    return (
      <React.Fragment>
        <div className="content">{ipResults}</div>

        <TimeStamp datetime={this.state.datetime} />
      </React.Fragment>
    );
  }
}
