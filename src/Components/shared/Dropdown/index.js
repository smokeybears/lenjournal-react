import React from 'react'
import './Dropdown.css'
let Dropdown = (props) => {
	let dropdownContent;
	let displayDropdown = (e) => {
		dropdownContent.style.maxHeight = '300px'
		dropdownContent.style.opacity = 1
	}

	let hideDropdown = (e) => {
		dropdownContent.style.maxHeight = '0px'
		dropdownContent.style.opacity = 0
		document.activeElement.focus()
	}

	let itemEnterHover = (e) => {
		e.target.style.background = "rgb(91,192,222)"
	}

	let itemLeaveHover = (e) => {
		e.target.style.background = "white"
	}

  return (
  	<div 
  		id="dropdown" 
  		onMouseEnter={displayDropdown} 
  		onMouseLeave={hideDropdown}>
			{props.selection}
  		<div id="dropdown-content" ref={(content) => dropdownContent = content}>
   			{props.options.map((option, idx) => {
   				return (
   				<div 
   					key={option.id}
   					data-index={idx}
   					onMouseLeave={itemLeaveHover}
   					onMouseEnter={itemEnterHover}
   					onClick={(e) => {props.onChange(idx, option.name); hideDropdown()}}>
   						{option.name}
   					</div>)
   				})
   			}
  		</div>
  	</div>
   );
}

export default Dropdown