import React from "react";

// images
import Gear from "../../images/gear.svg?react";
import Save from "../../images/save.svg?react";

export function Header(props) {
  const btnTitle = props.minimized
    ? "Expand modules so you can see stuff"
    : "Minimize modules to make it easier to reorder them";

  const btnText = props.minimized ? "Expand Modules" : "Minimize Modules";

  return (
    <div className="header">
      <h1>Dashboard</h1>

      <div className="actions">
        <button
          className="button"
          title={btnTitle}
          onClick={(e) => props.minimizeModules(e)}
        >
          {btnText}
        </button>

        <button
          className="action"
          title="Save positions"
          onClick={(e) => props.saveSettings(e)}
        >
          <Save />
        </button>

        <button
          className="action"
          title="Open settings"
          onClick={(e) => props.openSettings(e)}
        >
          <Gear />
        </button>
      </div>
    </div>
  );
}
