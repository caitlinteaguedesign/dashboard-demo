// -----------------------------------------------------------------
// setup
import React from "react";

// data
import initialData from "./data/initial";
import { getPreferences } from "./data/getPreferences";

// helpers
import Modal from "./helpers/Modal";
import DragDrop from "./helpers/DragDrop";
import Cookies from "universal-cookie";

// visual components
import { Header } from "./visual/Header";
import { Column } from "./visual/Column";
import { Footer } from "./visual/Footer";

// app settings
import { Settings } from "./modules/Settings";
import { setModules } from "./util/setModules";

// -----------------------------------------------------------------
// the toolbar
export class Toolbar extends React.Component {
  // -----------------------------------------------------------------
  // initial data

  state = initialData;

  // -----------------------------------------------------------------
  // constructor

  constructor(props) {
    super(props);

    // set the default theme
    document.body.classList.add(this.state.activeTheme);
  }

  // -----------------------------------------------------------------
  // after everything is loaded

  componentDidMount() {
    // replace default data with preferences, if the cookies exist
    this.setState(
      getPreferences(this.state),
      this.switchTheme(this.state.theme),
    );
  }

  // -----------------------------------------------------------------
  // minimize / maximize modules
  toggleMinimizeModules() {
    this.setState(
      {
        minimized: !this.state.minimized,
      },
      () => setModules(this.state.minimized),
    );
  }

  // -----------------------------------------------------------------
  // drag n drop logic

  updateDragDrop(results) {
    this.setState(
      {
        columns: results,
      },
      () => {
        setModules(this.state.minimized);
        this.saveSettings();
      },
    );
  }

  // -----------------------------------------------------------------
  // modal logic (pass key that stores modal visiblity: true // false)

  toggleModal(modal) {
    this.setState({
      [modal]: !this.state[modal],
    });
  }

  // -----------------------------------------------------------------
  // settings logic

  toggleModule(thisModule) {
    const toggleVisible = thisModule.visible ? false : true;

    const newState = {
      ...this.state,
      modules: {
        ...this.state.modules,
        [thisModule.id]: {
          ...this.state.modules[thisModule.id],
          visible: toggleVisible,
        },
      },
    };

    this.setState(newState, () => setModules(this.state.minimized));
  }

  switchTheme(thisTheme) {
    this.setState(
      {
        activeTheme: thisTheme,
      },
      () => {
        document.body.className = "";
        document.body.classList.add(this.state.activeTheme);
      },
    );
  }

  saveSettings() {
    const cookies = new Cookies();
    const cookieExpires = new Date(Date.UTC(2030, 11, 31));
    const cookieOptons = { sameSite: "strict", expires: cookieExpires };

    // save theme
    cookies.set("theme", this.state.activeTheme, cookieOptons);

    // get module ids and visibility values
    let modules = {};

    for (var m in this.state.modules) {
      const mod = this.state.modules[m];

      modules[mod.id] = { id: mod.id, visibility: mod.visible };
    }
    // save modules
    cookies.set("modules", modules, cookieOptons);

    // copy columns
    const positions = this.state.columns;

    // save positions
    cookies.set("positions", positions, cookieOptons);

    // close the settings modal
    this.setState({
      settingsModal: false, // modalVisibility: false
    });
  }

  // -----------------------------------------------------------------
  // render the things
  render() {
    /*
      {this.state.columnOrder.map((columnId) => {
         const column = this.state.columns[columnId];
         const modules = column.moduleIDs.map(moduleID => this.state.modules[moduleID]);

         return <Column key={column.id} column={column} modules={modules} />;
      })}
      */

    // for getting the columns and their assigned modules
    let columnList = [];

    for (var column in this.state.columns) {
      const thisColumn = this.state.columns[column];
      const modules = thisColumn.moduleIDs.map(
        (moduleID) => this.state.modules[moduleID],
      );

      columnList.push(
        <Column key={thisColumn.id} column={thisColumn} modules={modules} />,
      );
    }

    return (
      <div className="container">
        <Modal
          name="Settings"
          visible={this.state.settingsModal}
          toggleModal={(e) => this.toggleModal("settingsModal")}
        >
          <Settings
            modules={this.state.modules}
            toggleModules={(e) => this.toggleModule(e)}
            themes={this.state.themes}
            activeTheme={this.state.activeTheme}
            switchThemes={(e) => this.switchTheme(e)}
            saveSettings={(e) => this.saveSettings(e)}
          />
        </Modal>
        <main className="main">
          <Header
            openSettings={(e) => this.toggleModal("settingsModal")}
            saveSettings={(e) => this.saveSettings(e)}
            minimized={this.state.minimized}
            minimizeModules={(e) => this.toggleMinimizeModules(e)}
          />

          <DragDrop
            positions={this.state.columns}
            update={(e) => this.updateDragDrop(e)}
          >
            <div className="module-area">{columnList}</div>
          </DragDrop>
        </main>
        <Footer />
      </div>
    );
  }
}
