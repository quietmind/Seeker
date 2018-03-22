import React, { Component } from 'react'
import Appitem from './AppItem.jsx'
import {Header, Card} from 'semantic-ui-react'



export default class Phase extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return(
			<div className='phase' id={this.props.phase.id}>
			<div className='PhaseTitle'>
			<Header size="large">{this.props.phase.phase_label}</Header>
			</div>
			{
		      this.props.applications.map((app,i) =>  <div id={app.id} key={i} className="AppItem">{app.company}</div>)
			}
		    </div>
        )
	}
}
