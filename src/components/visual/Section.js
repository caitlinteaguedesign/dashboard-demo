import React from 'react';

// images
import { ReactComponent as Link } from '../../images/link.svg';

export function Section(props)
{
	var link = "";
	//var trigger = "";
	let srcName;

	// if there is a source
	if(props.source) {

		if(props.sourceName) {
			srcName = props.sourceName;
		}
		else {
			srcName = props.name;
		}

		link = <a href={props.source} target="_blank" rel="noopener noreferrer" title={"External link to "+srcName}><Link /></a>
	}

	// if this is hideable
	// if(props.hideable) {
	// 	trigger = <button className="button" onClick={() => props.toggle()}>Hide</button>
	// }

	return (
		<div className="section">
		
			<div className="section-label">
				{props.name}
				{link}
			</div>

			<div className="section-content">{props.children}</div>
			
		</div>
	);
}