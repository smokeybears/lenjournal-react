import React, {Component} from 'react'
import '../LoginShared.css'
import './NewUserForm.css'
import Helpers from '../../Helpers'
const BASEURL = 'http://localhost:8090'
class NewUserFormContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			firstName: '',
			lastName: ''
		}
		this.liftState = props.stateLift
	}

	onChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}
	
	createPhoneCode = (e) => {
		e.preventDefault()
		fetch(`${BASEURL}/phone/verify`, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
			})
		})
		.then(Helpers.getBody)
		.then(responseBody =>  {
			this.liftState({"newUser": false})
		})
		.catch(err => {
			throw new Error(`${err}: Error creating verification code`)
		})
	}

	render(){
		return <NewUserForm
			firstName={this.state.firstName}
			lastName={this.state.lastName}
			control={this.onChange}
			// requestHandler={this.createPhoneCode}
		/>
	}
}

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
				<button onClick={props.requestHandler}>Sign Up</button>
				</div>
	)
}

export default NewUserFormContainer