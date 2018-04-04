import React, { Component } from 'react'
import { Button, Modal, Icon, Dropdown, Header } from 'semantic-ui-react'


export default class PhaseSettingsModal extends Component {
  constructor(props){
    super(props)
    this.state = { reorderview : false }
    this.handleView = this.handleView.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.reorder = this.reorder.bind(this)
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

  reorder(e, { name, value } ) {
    let phases = this.props.phases //all phases
    let phaseToMoveIndex = this.props.selectedPhase.phaseOrder -1  // index of phase we are acting on
    let selectPhase = phases[phaseToMoveIndex] // set phase to be reordered
    phases.splice(value, 0, selectPhase)
    phases.splice(phaseToMoveIndex + 1, 1)
    this.props.updatePhaseOrder(phases)
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
          closeOnDimmerClick={false}>
          <Modal.Header>
            <Icon textAlign="center" name="settings"/>
            <h3 style={{display:"inline"}}>Options</h3>
          </Modal.Header>
          {this.state.reorderview ?
            <Modal.Content textAlign="center">
              <Dropdown
                fluid
                selection
                placeholder='Reorder Phase'
                onChange={this.reorder}
                options={this.props.phases.map(phase => ({ text: `${phase.phase_label}`,  value: phase.phase_order }))} />
            </Modal.Content>
          :
            <Modal.Content textAlign="center">
              <Header size="small" floated="left">Delete</Header>
              <Header size="small" floated="right">Reorder</Header>
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
