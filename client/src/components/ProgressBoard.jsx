import React from 'react'
import dragula from 'react-dragula'
import Phase from './Phase.jsx'
import axios from 'axios'
import NewPhase from './NewPhase.jsx'
import PhaseOptionModal from './PhaseOptionModal.jsx'


export default class ProgressBoard extends React.Component{
	constructor(props){
		super(props)
    this.state={show: false, selectedPhase: null}
    this.toggle = this.toggle.bind(this)
    this.selectedPhase = this.selectedPhase.bind(this)
	}

  toggle(e){
    this.setState({show: !this.state.show}, () => console.log(this.state))
  }

  selectedPhase(phaseId){
    console.log(phaseId)
    this.setState({
      selectedPhase: phaseId
    })
  }

  componentDidMount(){
    dragula(Array.from(document.getElementsByClassName('phase')),{
      moves: (el, target, source, sibling) => {
        return el.id === 'title'? false : true
      }
    }).on('drop', (el, target, source, sibling) => {
      let updateStatus = {appId: el.id, newStatusId: target.id}
      if(target.id !== source.id) this.props.updateStatus(updateStatus)
    })
  }
  componentDidUpdate(){
    dragula(Array.from(document.getElementsByClassName('phase')),{
      moves: (el, target, source, sibling) => {
        return el.id === 'title' ? false : true
      }
    }).on('drop', (el, target, source, sibling) => {
      let updateStatus = {appId: el.id, newStatusId: target.id}
      if(target.id !== source.id) this.props.updateStatus(updateStatus)
    })
  }



	render(){

		return(
			<div className="progressboard-container">
      <PhaseOptionModal selectedPhase={this.state.selectedPhase} deletePhase={this.props.deletePhase} show={this.state.show} toggle={this.toggle}/> {
        this.props.phases.map((phase,i) => <Phase key={i} phase={phase} applications={this.props.apps.filter(app => app.phase_id === phase.id)} selectedPhase={this.selectedPhase} toggle={this.toggle}/>)
      }
      <NewPhase createPhase={this.props.createPhase}/>
      </div>

		)
	}
}