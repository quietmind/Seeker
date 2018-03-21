import React from 'react';
import { Button, Menu, Header, Image, Icon, Modal, Form } from 'semantic-ui-react';


const FormModal = () => {
  return (<Modal trigger={<Menu.Item>
                          <Icon name='wordpress forms' />
                          Enter New Application</Menu.Item>} basic size='small'>
      <Header icon='wordpress forms' content='Enter Your Latest Job Application' />
      <Modal.Content >
        <Form onSubmit={console.log("submit")}>
          <Form.Group widths='equal'>

            <Form.Input fluid label='Job Title' placeholder='Job Title' />
            <Form.Input fluid label='Company Name' placeholder='Company Name' />
            <Form.Select fluid label='Phase' options={options} placeholder='Status' />

          </Form.Group>
          <Form.Group widths='equal'>

            <Form.Input fluid label='Resume Used' placeholder='Resume Used' />
            <Form.Input fluid label='Cover Letter Used' placeholder='Cover Letter Used' />
            <Form.Input fluid label='Date' placeholder='Date' />

          </Form.Group>
        <Button type='submit'>Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>

  )
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
