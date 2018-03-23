import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';


class FormModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      jobTitle: '',
      companyName: '',
      phase: '',
      resume: '',
      coverLetter: '',
      phases: props.phases,
      modalOpen: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true });
  }

  handleClose() {
    this.setState({ modalOpen: false });
  }

  handleSubmit(callback){
    this.props.handleClick(this.state.phase, this.state.resume, this.state.coverLetter, this.state.jobTitle, this.state.companyName);
    callback;
  }


  render() {
    return (<Modal trigger={<Menu.Item onClick={this.handleOpen}>
                            <Icon name='wordpress forms' />
                            Enter New Application</Menu.Item>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}
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
            {/* <Form.Group widths='equal'>

              <Form.Input fluid label='Resume Used' placeholder='Resume Used' value= {this.state.resume} onChange={(e)=>this.setState({resume: e.target.value})}/>
              <Form.Input fluid label='Cover Letter Used' placeholder='Cover Letter Used' value= {this.state.coverLetter} onChange={(e)=>this.setState({coverLetter: e.target.value})}/>
            </Form.Group> */}
          <Button onClick={() => { this.handleSubmit(this.handleClose())}}>Submit</Button>
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
