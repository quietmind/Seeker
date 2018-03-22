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

    this.submitPost = this.submitPost.bind(this);
  }

  submitPost(e) {
    console.log(this.state.resumeToSend);
    e.preventDefault();
    const formData = new FormData();
    formData.append('payload', this.state.resumeToSend);

    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }

    axios.post('/resumes', formData, config);
  }

  render() {
    return (<Modal trigger={<Menu.Item>
                            <Icon name='wordpress forms' />
                            Your Documents</Menu.Item>}
                            basic size='small'
            >
        <Header icon='wordpress forms' content='View and Update Your Documents' />
        <Modal.Content >
            <input name="myFile" type="file" onChange="handleFiles(this.myFile)" onChange={(e)=>this.setState({resumeToSend: e.target.files[0]})}></input>
            <Button onClick={(e)=>this.submitPost(e)}>Submit</Button>
        </Modal.Content>
      </Modal>
    )
  }
}

export default DocModal;
