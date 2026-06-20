import React from "react";

// modules
import { HighestPageLoadIps } from "../modules/HighestPageLoadIps";
import { Newsletter } from "../modules/Newsletter";
import { OrderActivity } from "../modules/OrderActivity";
import { OrdersBySource } from "../modules/OrdersBySource";
import { ServerMonitor } from "../modules/ServerMonitor";
import { Shipping } from "../modules/Shipping";
import { Traffic } from "../modules/Traffic";

// the data
const initialData = {
  // themes
  activeTheme: "default",
  themes: {
    default: { id: "default", name: "Default" },
    mountains: { id: "mountains", name: "Mountains" },
    "evening-sky": { id: "evening-sky", name: "Evening Sky" },
  },

  // modals
  settingsModal: false,

  // minimized modules
  minimized: false,

  // modules
  modules: {
    ips: {
      id: "ips",
      visible: true,
      name: "IPs with Highest Page Load",
      content: <HighestPageLoadIps />,
    },
    newsletter: {
      id: "newsletter",
      visible: true,
      name: "Most Recent Newsletter",
      content: <Newsletter />,
    },
    oactivity: {
      id: "oactivity",
      visible: true,
      name: "Order Activity",
      content: <OrderActivity />,
    },
    osources: {
      id: "osources",
      visible: true,
      name: "Orders by Source",
      content: <OrdersBySource />,
    },
    server: {
      id: "server",
      visible: true,
      name: "Server Monitor",
      content: <ServerMonitor />,
    },
    shipping: {
      id: "shipping",
      visible: true,
      name: "Shipping",
      content: <Shipping />,
    },
    traffic: {
      id: "traffic",
      visible: true,
      name: "Traffic",
      content: <Traffic />,
    },
  },

  // columns for drag and drop
  columns: {
    "column-1": {
      id: "column-1",
      moduleIDs: ["oactivity", "newsletter"],
    },
    "column-2": {
      id: "column-2",
      moduleIDs: ["osources", "shipping"],
    },
    "column-3": {
      id: "column-3",
      moduleIDs: ["traffic", "ips"],
    },
    "column-4": {
      id: "column-4",
      moduleIDs: ["server"],
    },
  },
};

export default initialData;
