import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

class DocModal extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      resumeToSend : '',
      coverLetterToSend : ''
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  submitPost(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('payload', this.state.resumeToSend);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('/resumes', formData, config)
    .then(()=>this.handleClose())
  }

  submitPost2(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('payload', this.state.coverLetterToSend);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('/coverletters', formData, config)
    .then(()=>this.handleClose())
  }

  render() {
    return (<Modal trigger={<Menu.Item onClick={this.handleOpen}>
                            <Icon name='wordpress forms' />
                            Your Documents</Menu.Item>}
                            open={this.state.modalOpen}
                            onClose={this.handleClose}
                            basic
                            size='small'
            >
        <Header icon='wordpress forms' content='View and Update Your Documents' />
        <Modal.Content >
            <label>Add a New Resume</label>
            <input name="myFile" type="file" onChange="handleFiles(this.myFile)" onChange={(e)=>this.setState({resumeToSend: e.target.files[0]})}></input>
            <Button onClick={(e)=>this.submitPost(e)}>Submit</Button>
            <br></br>
            <label>Add a New Cover Letter</label>
            <input name="myFile" type="file" onChange="handleFiles(this.myFile)" onChange={(e)=>this.setState({coverLetterToSend: e.target.files[0]})}></input>
            <Button onClick={(e)=>this.submitPost2(e)}>Submit</Button>
        </Modal.Content>
      </Modal>
    )
  }
}

export default DocModal;
