import React, {Component} from 'react'
import './Reflection.css'

let reflection = (props) => {
	return (
		<div class="reflection"
			refs={el => }
		>
			<div class="reflection-date">Jul. 12, 2017</div>
			<div class="reflection-prompt">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis accusamus laudantium consectetur dicta adipisci suscipit, unde quasi autem, repellat? Illum facere ad distinctio voluptas necessitatibus inventore optio perferendis reprehenderit cupiditate.
			</div>
	    <CSSTransitionGroup
	      transitionName="newuserform"
	      transitionAppear={true}
	      transitionAppearTimeout={500}
	      transitionEnter={false}
	      transitionLeave={true}>
			<div class="reflection-text" contenteditable="true">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia necessitatibus eius soluta, aut eum, quae. Modi quaerat non, ducimus placeat, laboriosam in nemo tenetur veritatis impedit vero minima dolor veniam! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque quas totam, mollitia unde a vel aliquam repellat deleniti, nemo laboriosam rerum obcaecati voluptatum qui beatae alias provident ex labore! Obcaecati?
			</div>
			</CSSTransitionGroup>
			<button class="reflection-toggle">Reflection ▼</button>
		</div>)
}

let ReflectionsList = (props) => {
	<div class="reflections-container flex-column">
	</div>
}