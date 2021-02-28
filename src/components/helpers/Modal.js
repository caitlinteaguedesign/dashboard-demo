// component set up
import React from 'react';

// images 
import { ReactComponent as ExMark } from '../../images/exmark.svg';

// class
export default class Modal extends React.Component {

	render() {

		// get visibility
		const visibility = this.props.visible;

		// toggle body overflow
		if(visibility.toString() === "true")
      {
         document.body.style.overflow = "hidden";
      }
      else {
         document.body.style.overflow = "auto";
      }

		return (
			<div 
				className="modal-wrapper"
				style={{
					transform: visibility ? 'translateY(0vh)' : 'translateY(-100vh)',
					transition: visibility ? 'transform 0.2s ease' : 'transform 0.2s ease 0.2s'
				}}
			>
				<div className="backdrop" onClick={(e) => this.props.toggleModal(e)}
					style={{
						opacity: visibility ? '1' : '0',
						transition: visibility ? 'opacity 0.2s ease 0.2s' : 'opacity 0.2s ease'
					}}>
				</div>

				<div className="modal" style={{
					transform: visibility ? 'translateY(0vh)' : 'translateY(-100vh)'}}>
					<div className="modal-header">
						<h2>{this.props.name}</h2>
						<div className="modal-closer" title="Close modal" onClick={(e) => this.props.toggleModal(e)}><ExMark /></div>
					</div>

					<div className="divider"></div>
					
					{this.props.children}
				</div>

			</div>
		)
   }
}