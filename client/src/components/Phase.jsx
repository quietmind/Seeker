import React, { Component } from 'react'
import Appitem from './AppItem.jsx'
import {Header, Card} from 'semantic-ui-react'



export default class Phase extends Component {
	constructor(props){
		super(props)
		this.state = {
			apps: []
		}
	}
	render(){
		console.log("apps in phases", this.props.applications)
		return(
			<div className='phase'>
			<div className='PhaseTitle'>
			<Header size="large">{this.props.phase.phase_label}</Header>
			</div>
			{
		      this.props.applications.map(app => <div className="AppItem">{app.company}</div>)
			}
		    </div>
        )
	}
}