// component set up
import React from "react";

// images
import ExMark from "../../images/exmark.svg?react";

// class
export default class Modal extends React.Component {
  render() {
    // get visibility
    const visibility = this.props.visible;

    // toggle body overflow
    if (visibility.toString() === "true") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return (
      <div
        className="modal-wrapper"
        style={{
          transform: visibility ? "translateY(0vh)" : "translateY(-100vh)",
          transitionDelay: visibility ? "0s" : "450ms",
        }}
      >
        <div
          className="backdrop"
          onClick={(e) => this.props.toggleModal(e)}
          style={{
            opacity: visibility ? "1" : "0",
            transitionDelay: visibility ? "250ms" : "0s",
          }}
        ></div>

        <div
          className="modal"
          style={{
            transform: visibility ? "translateY(0vh)" : "translateY(-100vh)",
          }}
        >
          <div className="modal-header">
            <h2>{this.props.name}</h2>
            <div
              className="modal-closer"
              title="Close modal"
              onClick={(e) => this.props.toggleModal(e)}
            >
              <ExMark />
            </div>
          </div>

          <div className="divider"></div>

          {this.props.children}
        </div>
      </div>
    );
  }
}
