import React, {Component} from 'react'
import '../LoginShared.css'
import './NewUserForm.css'
import Helpers from '../../../Helpers'

let NewUserForm = (props) => {	
	return (
				<div className="form-user-signup flex-column">
					<div className="flex-row">
						<label htmlFor="firstName">First Name:</label>
						<input name="firstName" type="text"
							onChange={props.control}
							value={props.firstName}
							className="login-input"
							></input>
					</div>
					<div className="flex-row">
						<label htmlFor="lastName">Last Name:</label>
						<input name="lastName" type="text"
							onChange={props.control}
							value={props.lastName}
							className="login-input"
						></input>
					</div>
					<div className="signup-button" onClick={props.actionHandler}>Sign Up</div>
				</div>
	)
}

export default NewUserForm