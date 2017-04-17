import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoginFlow from './LoginFlow'
import Profile from './Profile'
import Helpers from './Helpers'

let validatePhoneForm = (props) => {
}

class App extends Component {
	constructor(props){
		super(props)
		this.sessionID = Helpers.getSessionID()
		this.state = {
			loggedIn: false
		}
	}
	
	liftState = (newState) => {
		this.setState(newState)
	}

	render(){
		if (!this.state.loggedIn){
			return <LoginFlow stateLift={this.liftState}/>
		} else {
			return <h1> Profile </h1>
		}
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
