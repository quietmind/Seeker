import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';

class DocModal extends React.Component {
  constructor(props){
    super(props)

  }


  render() {
    return (<Modal trigger={<Menu.Item>
                            <Icon name='wordpress forms' />
                            Enter New Application</Menu.Item>}
                            basic size='small'
            >
        <Header icon='wordpress forms' content='Enter Your Latest Job Application' />
        <Modal.Content >
          <input name="myFile" type="file">
        </Modal.Content>
      </Modal>
    )
  }

}

export default DocModal;
