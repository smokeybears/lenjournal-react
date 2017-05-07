import React, {Component} from 'react'
import Helpers from '../../../Helpers'
import PhoneVerificationForm from './PhoneVerificationForm'

class PhoneVerificationFormContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			validationCode:  ['', '', '', ''],
			phone: props.phone,
			checkingCode: false,
			incorrectCode: false
		}
		this.updated = false
		this.liftState = 	props.stateLift
	}

	componentWillMount = () => {
		fetch('/api/phone/validation', {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			headers: new Headers({"content-type": "application/json"}),
			body: JSON.stringify({
				phone: this.state.phone
			})
		})
		.then(Helpers.getBody)
		.then(responseBody =>  {
			if (!responseBody.codeCreated) {
				// something went wrong
			}
		})
		.catch(err => {
			throw new Error(`${err}: Error creating verification code`)
		})
	}

	checkPhoneCode = () => {
		fetch('/api/phone/verify', {
			method: 'PUT',
			mode: 'cors',
			credentials: 'include',
			headers: new Headers({"content-type": "application/json"}),
			body: JSON.stringify({
				code: this.state.validationCode.join('')
			})
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			if (responseBody.valid == true){
				this.liftState({verifiedPhone: true})
				this.setState({incorrectCode: false, checkingCode: false})
			} else {
				this.setState({incorrectCode: true, checkingCode: false})
			}
		})
		.catch(err => {
			this.setState({incorrectCode: false, checkingCode: false})
			throw new Error(`${err}: Something went wrong while checking the verification code`)
		})
	}

	componentDidUpdate(prevProps, prevState){
		if (this.state.validationCode.join('').length === this.state.validationCode.length && this.updated){
			this.setState({checkingCode: true})
			this.checkPhoneCode()
		}
		this.updated = false
	}

	onChange = (e) => {
		if (e.target.value.length == e.target.maxLength && e.target.nextElementSibling){
			e.target.nextElementSibling.focus()
		}
		this.updated = true
		let validationCode = this.state.validationCode
		validationCode[parseInt(e.target.name)] = e.target.value
		this.setState({validationCode, incorrectCode: false})
	}

	render(){
		return <PhoneVerificationForm 
			code={this.state.validationCode}
			checkingCode={this.state.checkingCode}
			control={this.onChange}
			incorrectCode={this.state.incorrectCode}
			/>
	}
}


export default PhoneVerificationFormContainer