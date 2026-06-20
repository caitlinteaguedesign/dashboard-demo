// component set up
import React from "react";

// drag an drop
import { DragDropContext } from "react-beautiful-dnd";

export default class DragDrop extends React.Component {
  // when user clicks a draggable, change background color of droppables
  onDragStart = () => {
    // get array of elements with .module-list
    var modAreas = document.getElementsByClassName("module-list");
    // foreach
    for (var i = 0; i < modAreas.length; i++) {
      // add .dragging class
      modAreas[i].classList.add("dragging");
    }
  };

  // not currently using, saving to remember if need it later
  onDragUpdate = (update) => {};

  // do the updates after drag complete
  onDragEnd = (result) => {
    // reset background color on droppables:
    var modAreas = document.getElementsByClassName("module-list");
    for (var i = 0; i < modAreas.length; i++) {
      modAreas[i].classList.remove("dragging");
    }

    // // reset collapsed content
    // var content = document.getElementsByClassName('content');
    // for(var j = 0; j< content.length; j++)
    // {
    //    content[j].classList.remove("hidden");
    // }

    // make changes to the module positions:

    // get results
    const { destination, source, draggableId } = result;

    // skip if null
    if (!destination) {
      return;
    }
    // skip if no changes
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // get the things
    const start = this.props.positions[source.droppableId];
    const finish = this.props.positions[destination.droppableId];

    // check if is in the same list or not
    if (start === finish) {
      // create a new array for storing changes
      const newModuleIDs = Array.from(start.moduleIDs);

      // place in array to target, remove 1 element
      newModuleIDs.splice(source.index, 1);

      // place in array to target, replace none, thing to add
      newModuleIDs.splice(destination.index, 0, draggableId);

      // set all of *this* column state plus modify moduleID
      const newColumn = {
        ...start,
        moduleIDs: newModuleIDs,
      };

      // set all of *this* state plus modify *this* column
      const newState = {
        ...this.props.positions,
        [newColumn.id]: newColumn,
      };

      // set state with all the info from above
      this.props.update(newState);
    }

    // moving from one list to another
    else {
      // starting column
      const startModuleIDs = Array.from(start.moduleIDs);
      startModuleIDs.splice(source.index, 1);
      const newStart = {
        ...start,
        moduleIDs: startModuleIDs,
      };

      // ending column
      const finishedModuleIDs = Array.from(finish.moduleIDs);
      finishedModuleIDs.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        moduleIDs: finishedModuleIDs,
      };

      // set all of *this* state and modify the start and end columns
      const newState = {
        ...this.props.positions,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      };

      // set state with all the info from above
      this.props.update(newState);
    }
  };

  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        {this.props.children}
      </DragDropContext>
    );
  }
}
