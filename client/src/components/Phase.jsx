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
		return(
			<div className='phase'>
			<div className='PhaseTitle'>
			<Header size="large">{this.props.title}</Header>
			</div>
		    <div className="AppItem">Swap me around</div>
		    <div className="AppItem">Swap him around</div>
		    <div className="AppItem">Swap her around</div>
		    <div className="AppItem">Swap us around</div>
		    <div className="AppItem">Swap things around</div>
		  </div>
    )
	}
}