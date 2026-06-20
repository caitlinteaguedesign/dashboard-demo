import React from "react";

// images
import Grid from "../images/grid.svg?react";

// drag n drop
import { Draggable } from "react-beautiful-dnd";

export class Module extends React.Component {
  render() {
    /*
		// handling collapse while reorder
		const handleMouseDown = () => {
	      var content = document.getElementsByClassName('collapsable_content');
	      for(var i = 0; i< content.length; i++)
	      {
	         content[i].classList.add("temp-collapse");
	      }  
		};

		// in click area return
	   onMouseDown={(...args) => {
			handleMouseDown();
			provided.dragHandleProps.onMouseDown(...args);
      }}
      */

    return (
      <Draggable draggableId={this.props.module.id} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            className="module"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              className="label module_label"
              title="Move module"
              {...provided.dragHandleProps}
            >
              <h2>{this.props.module.name}</h2>
              <div className="mover">
                <Grid />
              </div>
            </div>

            <div className="divider"></div>

            {this.props.module.content}
          </div>
        )}
      </Draggable>
    );
  }
}
