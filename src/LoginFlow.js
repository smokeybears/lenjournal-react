import React, {Component} from 'react'
import cookie from 'react-cookie'
import Helpers from './Helpers'
import NewUserForm from './loginComponents/NewUserForm'
import PhoneForm from './loginComponents/PhoneForm'
import PhoneVerificationForm from './loginComponents/PhoneVerificationForm'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import './loginComponents/LoginShared.css'
const BASEURL =  'http://localhost:8090'

class LoginFlow extends Component {
	constructor(props){
		super(props)	
		this.state = {
			phoneEntered: false,
			verifiedPhone: false,
			newUser: false,
			stepText: 'Please enter your phone number to login or signup'
		}
		this.setParentState = props.stateLift
	}

	liftState = (newState) => {
		this.setState(newState)
	}

	createUser = () => {
		fetch(`${BASEURL}/users`, {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				// only need to send sessionID because
				// all user info is already on server
				sessionID: Helpers.getSessionID()
			})
		})
		.then(Helpers.checkStatus)
		.then(Helpers.getBody)
		.then(responseBody => {
			console.log(responseBody)
			debugger
			this.setParentState({loggedIn: true}) 
		})
		.catch(err => {
			console.log(err) 
		})
	}

	onChange = (e) => {
		let val = e.target.value
		this.setState({[e.target.name]: val})
	}

	componentDidUpdate = () => {
		if (this.state.verifiedPhone) {
			this.createUser()
		}
	}

	renderForm = () => {
		if (!this.state.phoneEntered || this.state.newUser) {
			return (
				<div>
					<PhoneForm
						stateLift={this.liftState}/>
						{this.state.newUser && 
				    <CSSTransitionGroup
				      transitionName="newuserform"
				      transitionAppear={true}
				      transitionAppearTimeout={500}
				      transitionEnter={false}
				      transitionLeave={false}>
							<NewUserForm 
								stateLift={this.liftState}
								/>
						</CSSTransitionGroup>
						}
				</div>)
		} else if (!this.state.verifiedPhone) {
			return (
				<PhoneVerificationForm 
					requestHandler={this.checkPhoneCode}
					stateLift={this.liftState}
					/>
				)
		} else {
			return <h1> loading... </h1>
		}
	}

	render(){
		return(
			<div className="login-view">
				<div className="login-container flex-column">
					<div className="login-header">Len Journal</div>
					<div className="login-step-text">{this.state.stepText}</div>
					{this.renderForm()}
				</div>
			</div>
		)
	}
}

export default LoginFlow

