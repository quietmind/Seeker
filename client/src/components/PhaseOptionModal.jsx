import React, { Component } from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'

export default class PhaseSettingsModal extends Component {
  constructor(props){
    super(props)
}

  handleClick(){
    console.log('click')
    this.props.deletePhase(this.props.selectedPhase)
    this.props.toggle()
  }



  render() {
    return (
      <div>
        <Modal 
          size="mini" 
          open={this.props.show} 
          closeIcon={true} 
          onClose={this.props.toggle} 
          closeOnDimmerClick={true}>
            <Modal.Header>
              <Icon textAlign="center" name="settings"/>
            </Modal.Header>
            <Modal.Content textAlign="center">
                <Button.Group fluid size='large'>
                    <Button 
                      negative 
                      onClick={() => this.handleClick()}>
                        <Icon name="trash"/>
                    </Button>
                    <Button.Or />
                    <Button 
                    positive>
                      <Icon name="ordered list"/>
                    </Button>
                </Button.Group>
            </Modal.Content>
        </Modal>
      </div>
    )
  }
}