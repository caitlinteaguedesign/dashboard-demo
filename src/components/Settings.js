import React from "react";

// visual components
import { Section } from "./visual/Section";

export function Settings(props) {
  // for getting the theme list
  let themesList = [];

  for (var theme in props.themes) {
    const thisTheme = props.themes[theme];

    var isCurrentTheme = false;
    if (thisTheme.id === props.activeTheme) isCurrentTheme = true;

    themesList.push(
      <div key={thisTheme.id} className="an-option">
        <input
          type="radio"
          name="theme-selection"
          id={"radio_" + thisTheme.id}
          checked={isCurrentTheme}
          onChange={(e) => props.switchThemes(thisTheme.id)}
        />
        <label htmlFor={"radio_" + thisTheme.id}>{thisTheme.name}</label>
      </div>,
    );
  }

  // for getting modules list
  let modulesList = [];

  for (var module in props.modules) {
    const thisModule = props.modules[module];

    modulesList.push(
      <div key={thisModule.id} className="an-option">
        <input
          type="checkbox"
          id={"check_" + thisModule.id}
          checked={thisModule.visible}
          onChange={(e) => props.toggleModules(thisModule)}
        />
        <label htmlFor={"check_" + thisModule.id}>{thisModule.name}</label>
      </div>,
    );
  }

  // <button type="button" className="button" onClick={props.toggleModal}>Cancel</button>
  return (
    <React.Fragment>
      <div className="modal-content">
        <Section name="Modules"> {modulesList} </Section>
        <Section name="Themes"> {themesList} </Section>
      </div>

      <div className="settings-actions">
        <button
          type="button"
          className="button"
          onClick={(e) => props.saveSettings(e)}
        >
          Save
        </button>
      </div>
    </React.Fragment>
  );
}
