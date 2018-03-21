import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';


const FormModal = () => {
  return (<Modal trigger={<Menu.Item>
                          <Icon name='wordpress forms' />
                          Enter New Application</Menu.Item>} basic size='small'>
      <Header icon='wordpress forms' content='Enter Your Latest Job Application' />
      <Modal.Content >
        <Form>
          <Form.Group widths='equal'>

            <Form.Input fluid label='Job Title' placeholder='Job Title' />
            <Form.Input fluid label='Company Name' placeholder='Company Name' />
            <Form.Select fluid label='Phase' options={"Waiting", "Interviewd", "Applied"} placeholder='Status' />

          </Form.Group>
          <Form.Group widths='equal'>

            <Form.Input fluid label='Resume Used' placeholder='Resume Used' />
            <Form.Input fluid label='Cover Letter Used' placeholder='Cover Letter Used' />
            <Form.Input fluid label='Date' placeholder='Date' />

          </Form.Group>
        <Button>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>

  )
}

const options = [
  { text: 'Applied', value: 'applied' },
  { text: 'Response', value: 'response' },
  { text: 'Interviewd', value: 'interviewd' },
  { text: 'Received Offer', value: 'received offer' },    
];

//let me know if you want to do a different style.
//I want to alter font color. Didn't want to get stuck on that.

// I was considering changing the date input field to show an actual calendar: One option
// would involve incorporating these modules:
// import DatePicker from 'react-datepicker';
// import moment from 'moment';


export default FormModal;

//the phase drop down input box should receive options from the user's customized number of status options
