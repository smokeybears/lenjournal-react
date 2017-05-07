import React, {Component} from 'react'
import Helpers from '../../../Helpers'
import PhoneForm from './PhoneForm'
import '../LoginShared.css'
import './PhoneForm.css'

class PhoneFormContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			phone1: '',
			phone2: '',
			phone3: '',
			requestPending: false,
			errorText: ''
		}
		this.setParentState = props.stateLift
	}

	isUser = () => {
		let phone = this.state.phone1 + this.state.phone2 + this.state.phone3
		fetch(`/api/users/exist/${phone}`, {
			credentials: 'include',
			mode: 'cors'
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			this.setState({requestPending: false, errorText: ''})
			if (responseBody.error){
				return this.setState({errorText: responseBody.message})
			}
			if (responseBody.userExist){
				this.setParentState({newUser: false, phone: phone, loginStep: 3, userID: responseBody.userID})
			} else {
				this.setParentState({newUser: true, phone: phone, loginStep: 2})
			}
		})
		.catch((err) => {
			this.setState({requestPending: false, errorText: 'Something went wrong...'})
			throw new Error("Bad number verification request")
		})
	}

	componentDidUpdate = (prevProps, prevState) => {
		// having to deal with 3 seperate phone fields bulks this up
		let Phonelength = this.state.phone1.length + this.state.phone2.length + this.state.phone3.length
		let prevStatePhoneLength = prevState.phone1.length + prevState.phone2.length + prevState.phone3.length
		if (Phonelength === 10 && !(prevStatePhoneLength === 10) && !this.state.requestPending){
			this.setState({requestPending: true})
			this.isUser()
		}
	}

	onChange = (e) => {
		if (e.target.value.length == e.target.maxLength && e.target.nextElementSibling){
			e.target.nextElementSibling.nextElementSibling.focus()
		}
		this.setState({[e.target.name]: e.target.value})
	}

	render(){
		return (
			<PhoneForm 
				phone1={this.state.phone1}
				phone2={this.state.phone2}
				phone3={this.state.phone3}
				control={this.onChange}
				errorText={this.state.errorText}
				requestPending={this.state.requestPending}
			/>
		)
	}
}


export default PhoneFormContainer