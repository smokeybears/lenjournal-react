import React, {Component} from 'react'
import cookie from 'react-cookie'
import Helpers from '../../Helpers'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
// Components
import NewUserForm from './NewUserForm'
import PhoneForm from './PhoneForm'
import PhoneVerificationForm from './PhoneVerificationForm'
import './LoginShared.css'
class LoginFlow extends Component {
	constructor(props){
		super(props)	
		this.state = {
			firstName: '',
			lastName: '',
			phone: '',
			userID: '',
			loginStep: 1,
			newUser: false
		}
		this.stepText = [
		'Enter your Phone Number to Login or Signup',
		'Enter your first and last name to signup',
		'Enter the varification code we just sent to your phone'] // to ${Helpers.formatPhone(this.state.phone)}`
		this.setParentState = props.setParentState
	}

	liftState = (newState) => {
		if (newState.verifiedPhone == true){
			if (this.state.newUser) {
				this.createUser()
			} else {
				this.setParentState({loggedIn: true, userID: this.state.userID})
			}
		}
		this.setState(newState)
	}

	createUser = () => {
		fetch('/api/users', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: new Headers({'content-type': 'application/json'}),
			body: JSON.stringify({
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				phone: this.state.phone
			})
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			this.setParentState({loggedIn: true, userID: responseBody.user.id}) 
		})
		.catch(err => {
			console.log(err) 
		})
	}

	onChange = (e) => {
		this.setState({[e.target.name]:  e.target.value})
	}
	
	whichForm = () => {
		if (this.state.loginStep == 1) {
			return (
				<div>
					<PhoneForm
						stateLift={this.liftState}/>
				</div>)
		} else if (this.state.loginStep == 2){
			return (
				<div>
					<PhoneForm
						stateLift={this.liftState}/>
			    <CSSTransitionGroup
			      transitionName="newuserform"
			      transitionAppear={true}
			      transitionAppearTimeout={500}
			      transitionEnter={false}
			      transitionLeave={false}>
						<NewUserForm 
								firstName={this.state.firstName}
								lastName={this.state.lastName}
								control={this.onChange}
								// first and last name aren't required,
								// if user enters blank we'll still bring them to the next step
								actionHandler={() => this.liftState({loginStep: 3})}
							/>
					</CSSTransitionGroup>
				</div>)
		} else if (this.state.loginStep == 3) {
			return (
				<PhoneVerificationForm
					stateLift={this.liftState}
					phone={this.state.phone}
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
					<div className="login-step-text">{this.stepText[this.state.loginStep - 1]}</div>
					{this.whichForm()}
				</div>
			</div>
		)
	}
}

export default LoginFlow

