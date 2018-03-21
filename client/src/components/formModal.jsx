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
      phases: props.phases
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(){
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
              <Form.Select fluid label='Phase' options={this.props.phases.map(function(ele) { return {text: ele.phase_label, value: ele.id}})} placeholder='Status' value= {this.state.phase} onChange={(e, { value })=>this.setState({phase: value})}/>

            </Form.Group>
            {/* <Form.Group widths='equal'>

              <Form.Input fluid label='Resume Used' placeholder='Resume Used' value= {this.state.resume} onChange={(e)=>this.setState({resume: e.target.value})}/>
              <Form.Input fluid label='Cover Letter Used' placeholder='Cover Letter Used' value= {this.state.coverLetter} onChange={(e)=>this.setState({coverLetter: e.target.value})}/>
            </Form.Group> */}
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


// {id: 26, user_id: 8, phase_label: "Not Yet Applied", phase_order: 0}
// 1
// :
// {id: 46, user_id: 8, phase_label: "Not Yet Applied", phase_order: 0}
// 2
// :
// {id: 27, user_id: 8, phase_label: "Applied", phase_order: 1}
// 3
// :
// {id: 47, user_id: 8, phase_label: "Applied", phase_order: 1}
// 4
// :
// {id: 28, user_id: 8, phase_label: "Received Response", phase_order: 2}
// 5
// :
// {id: 48, user_id: 8, phase_label: "Received Response", phase_order: 2}
// 6
// :
// {id: 29, user_id: 8, phase_label: "Interviewed", phase_order: 3}
// 7
// :
// {id: 49, user_id: 8, phase_label: "Interviewed", phase_order: 3}
// 8
// :
// {id: 30, user_id: 8, phase_label: "Received Job Offer", phase_order: 4}
// 9
// :
// {id: 50, user_id: 8, phase_label: "Received Job Offer", phase_order: 4}

//let me know if you want to do a different style.
//I want to alter font color. Didn't want to get stuck on that.

// I was considering changing the date input field to show an actual calendar: One option
// would involve incorporating these modules:
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


export default FormModal;

//the phase drop down input box should receive options from the user's customized number of status options
