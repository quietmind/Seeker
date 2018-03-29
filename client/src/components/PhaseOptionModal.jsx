import React, { Component } from 'react'
import { Button, Modal, Icon, Dropdown } from 'semantic-ui-react'

export default class PhaseSettingsModal extends Component {
  constructor(props){
    super(props)
    this.state = { reorderview : false }
    this.handleView          = this.handleView.bind(this)
    this.handleClose         = this.handleClose.bind(this)
    this.handleCloseOnDimmer = this.handleCloseOnDimmer.bind(this)
}

  handleClick(){
    console.log('click')
    this.props.deletePhase(this.props.selectedPhase)
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
                <Dropdown placeholder='Rerrange Phases' fluid selection options={this.props.phases} />
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