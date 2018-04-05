import React from 'react'
import drgl from 'react-dragula'
import Phase from './Phase.jsx'
import axios from 'axios'
import NewPhase from './NewPhase.jsx'
import PhaseOptionModal from './PhaseOptionModal.jsx'


export default class ProgressBoard extends React.Component{
	constructor(props){
		super(props)
    this.state = { show: false, selectedPhase: null }

    this.toggle = this.toggle.bind(this)
    this.selectPhase = this.selectPhase.bind(this)
	}

  toggle(e){
    this.setState( { show: !this.state.show } )
  }

  selectPhase(phase){
    this.setState( { selectedPhase: phase } )
  }

  componentDidMount(){
    drgl(Array.from(document.getElementsByClassName('phase')),{
      moves: (el, target, source, sibling) => {
        return el.id === 'title' ? false : true
      }
    }).on('drop', (el, target, source, sibling) => {
      drgl().cancel(true)
      let updateStatus = {appId: el.id, newStatusId: target.id}
      if(target.id !== source.id) this.props.updateStatus(updateStatus)
    })
  }
  componentDidUpdate(){
    drgl(Array.from(document.getElementsByClassName('phase')),{
      moves: (el, target, source, sibling) => {
        return el.id === 'title' ? false : true
      }
    }).on('drop', (el, target, source, sibling) => {
      drgl().cancel(true)
      let updateStatus = {appId: el.id, newStatusId: target.id}
      if(target.id !== source.id) this.props.updateStatus(updateStatus)
    })
  }

  componentWillReceiveProps(nextProps){
    drgl(Array.from(document.getElementsByClassName('phase')),{
      moves: (el, target, source, sibling) => {
        return el.id === 'title' ? false : true
      }
    }).on('drop', (el, target, source, sibling) => {
      let updateStatus = { appId: el.id, newStatusId: target.id }
      drgl().cancel(true)
      if(target.id !== source.id) this.props.updateStatus(updateStatus)
    })
  }


	render(){

		return(
			<div className="progressboard-container">
      <PhaseOptionModal
        toggle={this.toggle}
        show={this.state.show}
        phases={this.props.phases}
        deletePhase={this.props.deletePhase}
        selectedPhase={this.state.selectedPhase}
        updatePhaseOrder={this.props.updatePhaseOrder} />
        {this.props.phases.map((phase,i) => {
          return <Phase
            getUserData={this.props.getUserData}
            key={i}
            phase={phase}
            toggle={this.toggle}
            selectPhase={this.selectPhase}
            files={this.props.files}
            notes={this.props.notes}
            applications={this.props.apps.filter(app => app.phase_id === phase.id)}
            email={this.props.email}
            contacts={this.props.contacts}
            reminders={this.props.reminders}
          />
        })}
      <NewPhase createPhase={this.props.createPhase}/>
      </div>
		)
	}
}
