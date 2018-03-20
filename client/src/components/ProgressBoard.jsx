import React from 'react'
import dragula from 'react-dragula'
import Phase from './Phase.jsx'

export default class ProgressBoard extends React.Component{
	constructor(props){
		super(props)
		this.state ={

		}
	}

  componentDidMount(){
    dragula(Array.from(document.getElementsByClassName('phase')))
  }

	render(){
		return(
			<div className="progressboard-container">
        <Phase/><Phase/><Phase/><Phase/><Phase/>
      </div>
		)
	}
}