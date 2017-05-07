import React, {Component} from 'react'
import Helpers from '../../../../Helpers'
import Editor from '../TextEditor'
class ResponseContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			text: '',
			errorText: ''
		}
		this.responseURL = `/api/users/${props.userID}/prompts/${props.promptID}/response`
	}

	componentWillMount = () => {
		fetch(this.responseURL, {
			credentials: 'include',
			mode: 'cors'
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			this.setState({text: responseBody.responseText})
		})
	}

	update = (responseText) => {
		fetch(this.responseURL, {
			method: 'PUT',
			headers: new Headers({'content-type': 'application/json'}),
			credentials: 'include',
			mode: 'cors',
			body: JSON.stringify({responseText})
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			this.setState({
				text: responseBody.responseText
			})
		})
		.catch(err => {
			console.log(err)
			this.setState({
				errText: 'We\'re having trouble connecting to the internet'
			})
		})
	}


	render(){
		return (
			<div>
					<Editor text={this.state.text} onSave={this.update}/>
			</div>)
	}		
}

export default ResponseContainer