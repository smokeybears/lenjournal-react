import React, {Component} from 'react'
import Helpers from '../../Helpers'
import './PhoneVerificationForm.css'
const BASEURL = 'http://localhost:8090'
class PhoneVerificationFormContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			validationCode:  ['', '', '', ''],
			checkingCode: false,
			incorrectCode: false
		}
		this.updated = false
		this.liftState = 	props.stateLift
	}

	checkPhoneCode = () => {
		fetch(`${BASEURL}/phone/verify`, {
			method: 'PUT',
			mode: 'cors',
			body: JSON.stringify({
				sessionID: Helpers.getSessionID(),
				code: this.state.validationCode.join('')
			})
		})
		.then(Helpers.checkStatus)
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
		// need to clean this up, bool logic is hard to follow, could perhaps be done better in onChange()
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

let PhoneVerificationForm = (props) => {
	return (
			<div>
				<div className="flex-row">
					{props.code.map((val, idx) => <input type="text" name={idx.toString()} key={idx.toString()}
									maxLength="1"
									value={val} 
									onChange={props.control}
									disabled={props.checkingCode}
									className="login-input conf"
									></input>
						)}
					{props.checkingCode && <div className='loading' style={{right: "-44%"}}></div>}
				</div>
				{props.incorrectCode && <div className="error-text">Incorrect Verification Code</div>}
			</div>
		)
}

export default PhoneVerificationFormContainer