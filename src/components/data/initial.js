import React from 'react';

// helpers
// import schedule from 'node-schedule';
// import { getDayLabel } from '../logic/getDayLabel';

// modules
import { OrderActivity } from '../OrderActivity';
import { Shipping } from '../Shipping';
import { Traffic } from '../Traffic';
import { Newsletter } from '../Newsletter';
import { OrdersBySource } from '../OrdersBySource';
import { ServerMonitor } from '../ServerMonitor';
import { HighestPageLoadIps } from '../HighestPageLoadIps';

// do when app loads
// var salesDay = getDayLabel();

// // check again at midnight (in case the app is left open overnight)
// schedule.scheduleJob('0 0 * * *', () => {
// 	salesDay = getDayLabel();
// });

// the data
const initialData = {
	// themes
	activeTheme: 'default',
	themes: {
		'default' : { id: 'default', name: 'Default' },
		'mountains' : { id: 'mountains', name: 'Mountains' },
		'evening-sky' : { id: 'evening-sky', name: 'Evening Sky' }
	},

	// modals
	settingsModal: false,

	// minimized modules
	minimized: false,

	// modules
	modules: {
		'ips': { id: 'ips', visible: true, name: 'IPs with Highest Page Load', content: <HighestPageLoadIps />},
		'newsletter': { id: 'newsletter', visible: true, name: 'Most Recent Newsletter', content: <Newsletter />},
		'oactivity': { id: 'oactivity', visible: true, name: 'Order Activity', content: <OrderActivity />},
		'osources': { id: 'osources', visible: true, name: 'Orders by Source', content: <OrdersBySource />},
		'server': { id: 'server', visible: true, name: 'Server Monitor', content: <ServerMonitor />},
		'shipping': { id: 'shipping', visible: true, name: 'Shipping', content: <Shipping />},
		'traffic': { id: 'traffic', visible: true, name: 'Traffic', content: <Traffic />},
	},

	// columns for drag and drop
	columns: {
		'column-1': {
			id: "column-1",
			moduleIDs: ["oactivity", "newsletter"],
		},
		'column-2': {
			id: "column-2",
			moduleIDs: ["osources", "shipping"],
		},
		'column-3': {
			id: "column-3",
			moduleIDs: ["traffic", "ips"],
		},
		'column-4': {
			id: "column-4",
			moduleIDs: ["server"],
		},
	}
};

export default initialData;