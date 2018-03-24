import React from 'react'
import dragula from 'react-dragula'
import Phase from './Phase.jsx'
import axios from 'axios'

export default class ProgressBoard extends React.Component{
	constructor(props){
		super(props)
	}

  componentDidMount(){
    dragula(Array.from(document.getElementsByClassName('phase'))).on('drop', (el, target, source, sibling) => {
      console.log(el, target, source, sibling)
      if(target.id !== source.id){
        let updateStatus= {appId: el.id, newStatusId: target.id}
        this.props.updateStatus(updateStatus)
      }
    })
  }
  componentDidUpdate(){
    dragula(Array.from(document.getElementsByClassName('phase'))).on('drop', (el, target, source, sibling) => {
      console.log(el, target, source, sibling)
      if(target.id !== source.id){
        let updateStatus= {appId: el.id, newStatusId: target.id}
        this.props.updateStatus(updateStatus)
      }
    })
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