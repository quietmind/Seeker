import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

class AppModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jobTitle: '',
      companyName: '',
      phase: '',
      contact: '',
      resume: null,
      coverLetter: null,
      modalOpen: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true }, this.props.toggle);
  }

  handleClose() {
    this.setState({ jobTitle: '', companyName: '', phase: '', contact: null, resume: null, coverLetter: null, modalOpen: false })
    this.props.getUserData()
  }

  handleSubmit() {
    axios.post('/applications', {
      phaseId: this.state.phase,
      reminderId: null,
      resumeId: this.state.resume,
      coverLetterId: this.state.coverLetter,
      jobTitle: this.state.jobTitle,
      company: this.state.companyName,
      contact: this.state.contact,
      date: new Date()})
    .then((response) => {
      this.handleClose()
    })
    .catch((err) => console.error(err));
  }

  render() {
    var resumeOptions = [{text: 'N/A', value: null, key: null}];
    resumeOptions = resumeOptions.concat(this.props.files.map(function(ele, i) { return {text: ele.file_name, value: ele.id, key: i}}));
    var coverLetterOptions = [{text: 'N/A', value: null, key: null}].concat(this.props.files.map(function(ele, i) { return {text: ele.file_name, value: ele.id, key: i}}));
    return (
      <Modal
        trigger={
          <Menu.Item onClick={this.handleOpen}>
            <Icon name='wordpress forms' />New App
          </Menu.Item>
        }
        open={this.state.modalOpen}
        onClose={this.handleClose}
        closeIcon={true}
        size='small'
      >
        <Header icon='wordpress forms' content='Enter Your Latest Job Application' />
        <Modal.Content >
          <Form>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Job Title' placeholder='Job Title' value={this.state.jobTitle} onChange={(event) => this.setState({jobTitle: event.target.value})}/>
              <Form.Input fluid label='Company Name' placeholder='Company Name' value={this.state.companyName} onChange={(event) => this.setState({companyName: event.target.value})}/>
              <Form.Select fluid label='Phase' options={this.props.phases.map(function(ele) { return {text: ele.phase_label, value: ele.id}})} placeholder='Status' value= {this.state.phase} onChange={(e, { value })=>this.setState({phase: value})}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid label='Point of Contact' placeholder='Contact Email' value={this.state.contact} onChange={(event) => this.setState({contact: event.target.value})}/>
              <Form.Select fluid label='Resume Used' options={resumeOptions} placeholder='Resume' value= {this.state.resume} onChange={(e, { value })=>this.setState({resume: value})}/>
              <Form.Select fluid label='Cover Letter Used' options={coverLetterOptions} placeholder='Cover Letter' value={this.state.coverletter} onChange={(e, { value })=>this.setState({coverLetter: value})}/>
            </Form.Group>
          <Button onClick={() => {this.handleSubmit()}}>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default AppModal;

//the phase drop down input box should receive options from the user's customized number of status options
