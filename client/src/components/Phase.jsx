import React, { Component } from 'react'
import Appitem from './AppItem.js'



export default class Phase extends Component {
	constructor(props){
		super(props)
		this.state = {
		}
	}

	render(){
		return(
			<div className='phase'>
			<div className='PhaseTitle'>
	
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