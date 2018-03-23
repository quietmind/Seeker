import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

class DocModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      fileToSend : '',
      docName: ''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true }, this.props.toggle)
  }

  handleClose() {
    this.setState({ modalOpen: false });
    this.props.getUserData()
  }

  submitPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('payload', this.state.fileToSend);
    formData.append('name', this.state.docName)

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('/files', formData, config)
    .then(()=>this.handleClose())
  }

  render() {
    return (
      <Modal 
        trigger={<Menu.Item onClick={this.handleOpen}><Icon name='wordpress forms' />My Files</Menu.Item>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        basic
        size='small'
      >
        <Header icon='wordpress forms' content='View and Update Your Documents' />
        <Modal.Content >
          <label>Add a New Document</label>
          <input type="text" placeholder="Document Name" value={this.state.docName} onChange={(event) => this.setState({docName: event.target.value})}></input>
          <input name="myFile" type="file" onChange="handleFiles(this.myFile)" onChange={(e)=>this.setState({fileToSend: e.target.files[0]})}></input>
          <Button onClick={(e)=>this.submitPost(e)}>Submit</Button>
        </Modal.Content>
      </Modal>
    )
  }
}

export default DocModal;
