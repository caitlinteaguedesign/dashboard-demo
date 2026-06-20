import React from "react";

// drag n drop
import { Droppable } from "react-beautiful-dnd";

// visual components
import { Module } from "./Module";

export class Column extends React.Component {
  render() {
    // skip any modules set to visible: false
    const liveModules = this.props.modules.map((thisModule, index) => {
      if (thisModule.visible) {
        return <Module key={thisModule.id} module={thisModule} index={index} />;
      }
      return null;
    });

    return (
      <div className="col-container">
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <div
              className="module-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {liveModules}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}
