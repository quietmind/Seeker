import React from 'react'
import dragula from 'react-dragula'
import Phase from './Phase.jsx'
import axios from 'axios'

export default class ProgressBoard extends React.Component{
	constructor(props){
		super(props)
	}

  componentDidMount(){
    dragula(Array.from(document.getElementsByClassName('phase')))
  }
  componentDidUpdate(){
    dragula(Array.from(document.getElementsByClassName('phase')))
  }



	render(){

		return(
			<div className="progressboard-container">
      {
        this.props.phases.map((phase,i) => <Phase key={i} phase={phase} applications={this.props.apps.filter(app => app.phase_id === phase.id)}/>)
      }
      </div>

		)
	}
}