import React from 'react'
import './PhoneVerificationForm.css'
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

export default PhoneVerificationForm