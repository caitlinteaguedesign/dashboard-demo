import React from 'react';

// constants
import * as Constants from './data/constants';

// visual components
import {TimeStamp} from './visual/TimeStamp';

// logic components
import {formatDollars} from './logic/formatDollars';

export class OrdersBySource extends React.Component
{

	// some things to prevent memory leak
	visible = false;
	initialRun = true;

	constructor(props)
	{
		super(props);
		
		this.state = {
			datetime: new Date(),
			checkout_count: 229,
			checkout_sales: 5201.08,
			uni_count: 20,
			uni_sales: 750.00,
			store_count: 3,
			store_sales: 174.75,
			third_count: 1,
			third_sales: 16.70
		}
	}

	componentDidMount()
	{
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

	fetchData()
	{
		// after initial, reset timer
		if(this.initialRun) {
			clearInterval(this.timer);

			this.initialRun = false;
			this.timer = setInterval(
				() => this.fetchData(),
				300000
			);
		}

		// fetch the data
		fetch(Constants.ENDPOINT+'orders')
		.then(results => {
			return results.json();
		})
		.then(data => {
			const amazon = data['Amazon'];
			const cart = data['Cart'];
			const ebay = data['Ebay'];
			const etsy = data['Etsy'];
			const lou = data['LOU'];
			const phone = data['Phone'];
			const store = data['Storefront'];

			this.setState({
				cart_count: cart['count'],
				cart_sales: cart['total'],
				phone_count: phone['count'],
				phone_sales: phone['total'],
				lou_count: lou['count'],
				lou_sales: lou['total'],
				amazon_count: amazon['count'],
				amazon_sales: amazon['total'],
				ebay_count: ebay['count'],
				ebay_sales: ebay['total'],
				etsy_count: etsy['count'],
				etsy_sales: etsy['total'],
				store_count: store['count'],
				store_sales: store['total'],

				datetime: new Date()
			});
		})
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
	}

	render()
	{
		return (
			<React.Fragment>
				<div className="content">

					<div className="grid-table">
	            	<div className="row-label">Source 1</div>
	              	<div className="value">{this.state.checkout_count.toLocaleString()}</div>
	              	<div className="value">{formatDollars(this.state.checkout_sales)}</div>
	           
	            	<div className="row-label">Source 2</div>
	              	<div className="value">{this.state.uni_count.toLocaleString()}</div>
	              	<div className="value">{formatDollars(this.state.uni_sales)}</div>

	              	<div className="row-label">Source 3</div>
	              	<div className="value">{this.state.store_count.toLocaleString()}</div>
	              	<div className="value">{formatDollars(this.state.store_sales)}</div>

						  <div className="row-label">Source 4</div>
	              	<div className="value">{this.state.third_count.toLocaleString()}</div>
	              	<div className="value">{formatDollars(this.state.third_sales)}</div>
	            </div>
	           
				</div>
				
				<TimeStamp datetime={this.state.datetime} />
			</React.Fragment>				
		);
	}
}