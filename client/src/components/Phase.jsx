import React, { Component } from 'react'
import {Header, Card, Icon} from 'semantic-ui-react'
import moment from 'moment'



export default class Phase extends Component {
	constructor(props){
		super(props)
		this.clickHandler = this.clickHandler.bind(this)
	}

	clickHandler(){
		let phasePacket = { phaseId: this.props.phase.id, phaseOrder: this.props.phase.phase_order }
		this.props.selectedPhase(phasePacket)
		this.props.toggle()
	}

	render(){
		return(
			<div className='phase' id={this.props.phase.id}>
			<div className='PhaseTitle' id="title">
			<Header 
			  className="phasetitle" 
			  textAlign="center" 
			  block 
			  inverted 
			  size="large">{this.props.phase.phase_label}
				<Icon 
				  className="headericon" 
				  name="ellipsis vertical"
				  textAlign="right"
				  onClick={this.clickHandler} /></Header> 
			</div>
			{
		      this.props.applications.map((app,i) =>  {
		      	return <div id={app.id} key={i}>
		      	<Card 
		      	  className="AppItem" 
		      	  header={app.company} 
		      	  description={app.job_title} 
		      	  meta={`Last Update: ${moment(app.last_update).format('MM/DD')}`}/>
		      	  </div>
		      })
			}
		    </div>
        )
	}
}