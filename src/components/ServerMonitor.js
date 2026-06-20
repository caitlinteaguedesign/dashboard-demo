import React from "react";

// constants
// import * as Constants from './data/constants';

// visual components
import { Section } from "./visual/Section";
import { TimeStamp } from "./visual/TimeStamp";
import { ValueChecker } from "./visual/ValueChecker";
import { BarChart } from "./visual/BarChart";

// helper classes
import LineGraph from "./helpers/LineGraph";
import Collapsable from "./helpers/Collapsable";

// logic components
import { getRandomInt } from "./util/getRandomInt";

export class ServerMonitor extends React.Component {
  // some things to prevent memory leak
  visible = false;
  initialRun = true;

  constructor(props) {
    super(props);

    this.state = {
      datetime: new Date(),
      usageCurrent: 35,
      usageHistory: [20, 10, 40, 80, 50, 40],
      computeHistory: [50, 75, 99, 40, 5, 18, 47, 35],
    };
  }

  componentDidMount() {
    this.visible = true;

    if (this.visible) {
      // fetch data the first time
      this.timer = setInterval(
        () => this.fetchData(),
        5000, // 1000
      );
    }
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
        10000, // 1 minute 60000
      );
    }

    // fetch the data
    // fetch(Constants.ENDPOINT+'leerburg/aws/ec2')
    // .then(results => {
    // 	return results.json();
    // })
    // .then(data => {

    // 	const usageCurrent = data.CPUCurrent[0]['Maximum'];
    // 	const newUsageCurrent = roundDecimal(usageCurrent, 2);

    // 	const usageHistory = data.CPU24Hour;
    // 	let newUsageHistory = [];

    // 	for (var i in usageHistory) {
    // 		const data = usageHistory[i]["Maximum"];
    // 		const formatData = roundDecimal(data, 2);

    // 		newUsageHistory.push(formatData);
    // 	}

    // 	this.setState({
    // 		datetime: new Date(),
    // 		usageCurrent: newUsageCurrent,
    // 		usageHistory: newUsageHistory
    // 	});

    // })
    // .catch(function(err) {
    // 	console.log('Fetch Error :-S', err);
    // });

    var newNumber = getRandomInt(100);
    var newHistory = this.state.usageHistory;
    newHistory.splice(newHistory, 1);
    newHistory.push(this.state.usageCurrent);

    this.setState({
      datetime: new Date(),
      usageCurrent: newNumber,
      usageHistory: newHistory,
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="content">
          <Section name="CPU Usage">
            <ValueChecker value={this.state.usageCurrent} afterValue="%" />

            <Collapsable
              id="exampleUsageDetails"
              hiddenLabel="show past 24 hours"
              shownLabel="hide details"
            >
              <Section name="Past 24 hours">
                <LineGraph
                  id="LeerburgEc2CPUChart"
                  data={this.state.usageHistory}
                  xLabels={["-24", "-20", "-16", "-12", "-8", "-4"]}
                  xLabelExt=" hours ago"
                  yLabel="%"
                  yRange={100}
                  yStep={20}
                />
              </Section>
            </Collapsable>
          </Section>

          <Section name="Capacity">
            <BarChart name="By Server" values={this.state.computeHistory} />
          </Section>
        </div>

        <TimeStamp datetime={this.state.datetime} />
      </React.Fragment>
    );
  }
}
