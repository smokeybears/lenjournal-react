import React from 'react'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Response from './Response'
let Journal = (props) => {
	return (
		<div className="journal" key={props.id}>
			<div className="journal-date">{props.sent_on}</div>
			<div className="journal-prompt">
				{props.prompt_text}
			</div>
			<div className="journal-toggle" data-index={props.index} onClick={props.toggleVisibillity}>Reflection ▼</div>
			{props.visible && <CSSTransitionGroup
			      transitionName="reflection"
			      transitionAppear={true}
			      transitionAppearTimeout={500}
			      transitionEnterTimeout={500}
			      transitionEnter={true}
			      transitionLeaveTimeout={500}
			      transitionLeave={true}>
			      <Response 
			      	userID={props.userID}
			      	promptID={props.id}
			      	/>
					</CSSTransitionGroup>}
		</div>)
}

export default Journal