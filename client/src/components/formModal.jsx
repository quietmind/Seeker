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
      coverLetter: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
    console.log(this.state.jobTitle, this.state.companyName, this.state.phase, this.state.resume, this.state.coverLetter, this.state.date)
    this.props.handleClick(this.state.phase, this.state.resume, this.state.coverLetter, this.state.jobTitle, this.state.companyName);
  }


  render() {
    return (<Modal trigger={<Menu.Item>
                            <Icon name='wordpress forms' />
                            Enter New Application</Menu.Item>} basic size='small'>
        <Header icon='wordpress forms' content='Enter Your Latest Job Application' />
        <Modal.Content >
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths='equal'>

              <Form.Input fluid label='Job Title' placeholder='Job Title' value= {this.state.jobTitle} onChange={(e)=>this.setState({jobTitle: e.target.value})}/>
              <Form.Input fluid label='Company Name' placeholder='Company Name' value= {this.state.companyName} onChange={(e)=>this.setState({companyName: e.target.value})}/>
              <Form.Select fluid label='Phase' options={options} placeholder='Status' value= {this.state.phase} onChange={(e, { value })=>this.setState({phase: value})}/>

            </Form.Group>
            <Form.Group widths='equal'>

              <Form.Input fluid label='Resume Used' placeholder='Resume Used' value= {this.state.resume} onChange={(e)=>this.setState({resume: e.target.value})}/>
              <Form.Input fluid label='Cover Letter Used' placeholder='Cover Letter Used' value= {this.state.coverLetter} onChange={(e)=>this.setState({coverLetter: e.target.value})}/>
            </Form.Group>
          <Button type='submit'>Submit</Button>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const options = [
  { text: 'Not Yet Applied', value: 26 },
  { text: 'Applied', value: 27 },
  { text: 'Received Response', value: 28 },
  { text: 'Interviewed', value: 29 },
  { text: 'Received Job Offer', value: 30 },
];

//let me know if you want to do a different style.
//I want to alter font color. Didn't want to get stuck on that.

// I was considering changing the date input field to show an actual calendar: One option
// would involve incorporating these modules:
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


export default FormModal;

//the phase drop down input box should receive options from the user's customized number of status options
