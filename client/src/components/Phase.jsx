import React, { Component } from 'react'
import Appitem from './AppItem.jsx'
import {Header, Card, Icon} from 'semantic-ui-react'
import moment from 'moment'



export default class Phase extends Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return(
			<div className='phase' id={this.props.phase.id}>
			<div className='PhaseTitle'>
			<Header className="phasetitle" textAlign="center" block inverted size="large">{this.props.phase.phase_label}</Header>
			</div>
			{
		      this.props.applications.map((app,i) =>  <div id={app.id} key={i}><Card className="AppItem" header={app.company} description={app.job_title} meta={`Last Update: ${moment(app.last_update).format('MM/DD')}`}/></div>)
			}
		    </div>
        )
	}
}
