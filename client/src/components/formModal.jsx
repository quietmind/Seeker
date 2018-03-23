import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';
import axios from 'axios';

class FormModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jobTitle: '',
      companyName: '',
      phase: '',
      resume: '',
      coverLetter: '',
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
    this.setState({ jobTitle: '', companyName: '', resume: '', coverLetter: '', modalOpen: false })
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
      date: new Date()})
    .then((response) => {
      this.handleClose()
    })
    .catch((err) => console.error(err));
  }

  render() {
    return (<Modal trigger={<Menu.Item onClick={this.handleOpen}>
                            <Icon name='wordpress forms' />
                            New App</Menu.Item>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
                    closeIcon={true}
                    closeOnDimmerClick={false}
                    basic
                    size='small'>
        <Header icon='wordpress forms' content='Enter Your Latest Job Application' />
        <Modal.Content >
          <Form>
            <Form.Group widths='equal'>

              <Form.Input fluid label='Job Title' placeholder='Job Title' value= {this.state.jobTitle} onChange={(e)=>this.setState({jobTitle: e.target.value})}/>
              <Form.Input fluid label='Company Name' placeholder='Company Name' value= {this.state.companyName} onChange={(e)=>this.setState({companyName: e.target.value})}/>
              <Form.Select fluid label='Phase' options={this.props.phases.map(function(ele) { return {text: ele.phase_label, value: ele.id}})} placeholder='Status' value= {this.state.phase} onChange={(e, { value })=>this.setState({phase: value})}/>

            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select fluid label='Resume Used' options={this.props.files.map(function(ele, i) { return {text: ele.file_name, value: ele.id, key: i}})} placeholder='Resume' value= {this.state.resume} onChange={(e, { value })=>this.setState({resume: value})}/>
              <Form.Select fluid label='Cover Letter Used' options={this.props.files.map(function(ele, i) { return {text: ele.file_name, value: ele.id, key: i}})} placeholder='Cover Letter' value={this.state.coverletter} onChange={(e, { value })=>this.setState({coverLetter: value})}/>
            </Form.Group>
          <Button onClick={() => {this.handleSubmit()}}>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

// I was considering changing the date input field to show an actual calendar: One option
// would involve incorporating these modules:
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


export default FormModal;

//the phase drop down input box should receive options from the user's customized number of status options
