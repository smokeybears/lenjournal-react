import React, {Component} from 'react'
import '../LoginShared.css'
import './PhoneForm.css'
import Helpers from '../../Helpers'
const BASEURL = 'http://localhost:8090'
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
		fetch(`${BASEURL}/users/exist/${this.state.phone1 + this.state.phone2 + this.state.phone3}`, {
			credentials: 'include',
			mode: 'cors'
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			debugger
			this.setState({requestPending: false})
			if (responseBody.error){
				return this.setState({errorText: responseBody.message})
			}
			this.setState({errorText: ''})
			if (responseBody.userExist){
				this.setParentState({newUser: false, phoneEntered: true})
			} else {
				this.setParentState({newUser: true, phoneEntered: true})
			}
		})
		.catch((err) => {
			debugger
			// this.staterequestPending = false
			throw new Error("Bad number verification request")
		})
	}

	componentDidUpdate = (prevProps, prevState) => {
		if (!isNaN(this.state.phone1) || !isNaN(this.state.phone2) || !isNaN(this.state.phone3)) {
			//set error text
		}
		let length = this.state.phone1.length + this.state.phone2.length + this.state.phone3.length
		let prevStateLength = prevState.phone1.length + prevState.phone2.length + prevState.phone3.length
		if (length === 10 && !(prevStateLength === 10) && !this.state.requestPending){
			this.setState({requestPending: true})
			this.isUser()
		}
	}

	onChange = (e) => {
		// debugger
		// areaCode =
		// let field = e.target.name
		// let update = [0, 0].concat(e.target.value.split(''))
		// if (field === 'phone1') {
		// 	update[1] = 3
		// } else if (field === 'phone2') {
		// 	update[0] = 3
		// 	update[1] = 6
		// } else if (field === 'phone3'){
		// 	update[0] = 6
		// 	update[1] = 10
		// }
		// let newPhone = this.state.phone
		// debugger
		// Array.prototype.splice.apply(newPhone, update)
		// debugger
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
				loading={this.state.loading}
				control={this.onChange}
				errorText={this.state.errorText}
				requestPending={this.state.requestPending}
			/>
		)
	}
}


let PhoneForm = (props) => {
	return (
		<form className="flex-column">
			<div className="flex-row phone">
				<pre>(</pre>
					<input maxLength="3" type="text" pattern=".{1,3}" required
					name="phone1"
					value={props.phone1}
					onChange={props.control}
					style={{width: "50px"}}
					disabled={props.requestPending}
					className="login-input"></input>
				<pre>)-</pre> 
				<input maxLength="3" type="text" pattern=".{1,3}" required
					name="phone2"
					value={props.phone2}
					onChange={props.control}
					style={{width: "59px"}}
					disabled={props.requestPending}
					className="login-input"></input>
				<pre>-</pre>
				<input maxLength="4" type="text" pattern=".{1,4}" required
					name="phone3"
					value={props.phone3}
					onChange={props.control}
					style={{width: "88px"}}
					disabled={props.requestPending}
					className="login-input">
				</input>
				{props.requestPending && <div className="loading"></div>}
			</div>
			<div className="error-text"> {props.errorText} </div>
		</form>
	)
}

export default PhoneFormContainer