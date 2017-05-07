import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import LoginFlow from './Components/Login'
import Profile from './Components/Profile'
import Helpers from './Helpers'
class App extends Component {
	constructor(props){
		super(props)
		this.sessionID = Helpers.getSessionID()
		this.state = {
			loggedIn: false,
			userID: null
		}
	}
	
	liftState = (newState) => {
		this.setState(newState)
	}

	logout = () => {
		fetch(`/api/sessions`, {
				method: "DELETE",
				mode: 'cors',
				credentials: 'include'
			}
		)
		.then(Helpers.getBody)
		.then(responseBody => {
			if (responseBody.loggedOut){
				this.setState({loggedIn: false, userID: ''})
				Helpers.clearSessionCookie()
				this.sessionID = Helpers.getSessionID()
			}
		})
	}

	componentWillMount = () => {
		return fetch('/api/sessions/authenticate', {
			credentials: 'include',
			mode: 'cors'
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			if (responseBody.validSession) {
				this.setState({loggedIn: true, userID: responseBody.userID})
			} 
		})
		.catch(err => {
			throw new Error(err)
			this.setState({loggedIn: false})
		})
	}

	render = () => {
		if (!this.state.loggedIn){
			return <LoginFlow setParentState={this.liftState}/>
		} else {
			return <Profile logout={this.logout} userID={this.state.userID} />
		}
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)
