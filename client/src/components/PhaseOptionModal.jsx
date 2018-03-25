import React, { Component } from 'react'
import { Button, Modal, Icon } from 'semantic-ui-react'

export default class PhaseSettingsModal extends Component {
  constructor(props){
    super(props)
}

  render() {

    return (
      <div>
        <Modal size={mini} open={false} onClose={false}>
          <Modal.Header>
            <Icon name="settings" textAlign="center"/>
          </Modal.Header>
          <Modal.Content>
            <p>Delete Phase?</p>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}


