import React, {Component} from 'react'
import Helpers from '../../../Helpers'
import update from 'immutability-helper'
// Components
import Journal from './Journal'
import Dropdown from '../../shared/Dropdown'
import './Journal.css'

class JournalsContainer extends Component {
	constructor(props){
		super(props)
		this.userID = props.userID
		this.state = {
			currentStudy: '',
			studies: [],
			journals: []
		}
	}

	componentDidMount = () => {
		this.getStudies()
		.then(this.getJournals)
	}

	getStudies = () => {
		return fetch(`/api/users/${this.userID}/studies`, {
			method: 'GET',
			mode: 'cors',
			credentials: 'include'
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			return this.setState({
				currentStudy: responseBody.studies[0], 
				studies: responseBody.studies
			})
		})
	}

	getJournals = () => {
		return fetch(`/api/studies/${this.state.currentStudy.id}`, {
			method: 'GET',
			credentials: 'include',
			mode: 'cors'
		})
		.then(Helpers.getBody)
		.then(responseBody => {
			return this.setState({
				journals: responseBody.map((journal, idx) => {
						return Object.assign(journal, 
							{toggleVisibillity: this.toggleVisibillity, userID: this.userID, visible: false, index: idx}
						)
					})
			})
		})
	}

	updateJournals = (idx, name) => {
		if (!(name == this.state.currentStudy.name)) {
			this.setState({currentStudy: this.state.studies[idx]}, this.getJournals)
		}
	}

	toggleVisibillity = (e) => {
		e.preventDefault()
		let journalIndex = parseInt(e.target.getAttribute('data-index'))	
		this.setState({
			// if your unfamilair with #update this updates the state in an immutable way  
			journals: update(this.state.journals, {[journalIndex]: {visible: {$apply: (v) => !v}}})
		})
	}

	render(){
		return (
			<div className="journal-container flex-column">
				<Dropdown 
					selection={this.state.currentStudy.name || ''} 
					options={this.state.studies} 
					onChange={this.updateJournals}
					/>
				{this.state.journals.map(Journal)}
			</div>)
	}
}

export default JournalsContainer