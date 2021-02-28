// component set up
import React from 'react';

// data
import Cookies from 'universal-cookie';

export default class Collapsable extends React.Component 
{
	constructor(props) {
		super(props);

      // default
      var status = false;

		// establish a cookie instance
      const cookies = new Cookies();

      // get this collapsables stored state
      const stored = cookies.get("collapsable_" + this.props.id);

      // check if cookie
      if(typeof stored !== 'undefined') {
      	//convert string to boolean
			status = (stored === 'true');
      }

		this.state = {
			hidden: status
		};
	}

	toggleCollapsable() {
		// toggle state
		this.setState({
			hidden: !this.state.hidden
		}, () => this.saveCurrentState());
	}

	saveCurrentState() {
		// save current state
	   const cookies = new Cookies();
	   const cookieExpires = new Date(Date.UTC(2030, 11, 31));
      const cookieOptons = {sameSite: "strict", expires: cookieExpires};

      cookies.set("collapsable_" + this.props.id, this.state.hidden, cookieOptons);
	}

	render() {
		// button label
		const buttonLabel = 
			(this.state.hidden)
			? this.props.hiddenLabel
			: this.props.shownLabel;

		// content visibility
		const collapsed = 
			(this.state.hidden)
			? "collapsed"
			: "";

		return (
			<div className="collapsable_parent">
				<button className="collapsable_trigger" onClick={() => this.toggleCollapsable()}>{buttonLabel}</button>

				<div className={"collapsable_content " + collapsed}>
					{this.props.children}
				</div>
			</div>
		)
   }
}