import React from 'react'
import JournalsContainer from './Journals'
import Logout from './Logout'
import './profile.css'
let Profile = (props) => {
	return (
			<div>
				<div onClick={props.logout} className="logout"> Logout </div>
				<JournalsContainer
					userID={props.userID}
					/>
			</div>
		)
}

export default Profile