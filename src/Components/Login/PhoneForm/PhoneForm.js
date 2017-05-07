import React from 'react'
let PhoneForm = (props) => {
	return (
		<form className="flex-column">
			<div className="flex-row phone">
				<pre>(</pre>
				<input maxLength="3" type="text" pattern=".{1,3}" required
					name="phone1"
					value={props.phone1}
					onChange={props.control}
					style={{width: "59px"}}
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

export default PhoneForm