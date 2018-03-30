import React, { Component } from 'react'
import { Button, Modal, Icon, Dropdown } from 'semantic-ui-react'


export default class PhaseSettingsModal extends Component {
  constructor(props){
    super(props)
    this.state = { reorderview : false }
    this.handleView          = this.handleView.bind(this)
    this.handleClose         = this.handleClose.bind(this)
    this.handleCloseOnDimmer = this.handleCloseOnDimmer.bind(this)
    this.reorder             = this.reorder.bind(this)
}

  handleClick(){
    this.props.deletePhase(this.props.selectedPhase.phaseId)
    this.props.toggle()
  }

  handleView(){
    this.setState( { reorderview : !this.state.reorderview } ) 
  }

  handleClose(){
    this.props.toggle()
    this.handleView()
  }

  handleCloseOnDimmer(){
    this.handleView()
    return true
  }

  reorder(e, { name, value } ) {
    let phases      = this.props.phases //all phases
    let targetIndex = this.props.selectedPhase.phaseOrder // index of phase we are acting on
    let selectPhase = phases[targetIndex - 1] // set phase to be reordered
    phases.splice(value, 0, selectPhase) // insert selected phase into the array
    phases.splice(targetIndex -1, 1) // remove the selectedphase from it's old position
    this.props.updatePhaseOrder(phases) // send phases to backend to be updated
    this.handleClose() // close the modal 
  }

  render() {
    return (
      <div>
        <Modal 
          size="mini" 
          open={this.props.show} 
          closeIcon={true} 
          onClose={this.handleClose} 
          closeOnDimmerClick={this.handleCloseOnDimmer}>
            <Modal.Header>
              <Icon textAlign="center" name="settings"/>
            </Modal.Header>
            {
            this.state.reorderview 
            ?
              <Modal.Content textAlign="center">
                <Dropdown 
                  fluid 
                  selection 
                  placeholder='Rerrange Phases' 
                  onChange={this.reorder} 
                  options={this.props.phases.map(phase => ({ text: `${phase.phase_label}`,  value: phase.phase_order }))} />
              </Modal.Content>
            :
              <Modal.Content textAlign="center">
                  <Button.Group fluid size='large'>
                      <Button 
                        negative 
                        onClick={() => this.handleClick()}>
                          <Icon name="trash"/>
                      </Button>
                      <Button.Or />
                      <Button 
                      positive
                      onClick={this.handleView}>
                        <Icon name="ordered list"/>
                      </Button>
                  </Button.Group>
              </Modal.Content>
          }
        </Modal>
      </div>
    )
  }
}