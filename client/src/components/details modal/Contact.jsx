import React from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';

class Contact extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      saving: false,
      firstName: this.props.contact ? this.props.contact.first_name : '',
      lastName: this.props.contact ? this.props.contact.last_name : '',
      contactPhone: this.props.contact ? this.props.contact.contact_phone : '',
      contactEmail: this.props.contact ? this.props.contact.contact_email : '',
      title: this.props.contact ? this.props.contact.job_title : '',
      department: this.props.contact ? this.props.contact.department : ''
    }

    this.addContact = this.addContact.bind(this);
  }

  handleSubmit() {
    this.setState({saving: true})
    setTimeout(() => this.setState({saving: false}), 2000)
    this.props.getUserData()
  }

  addContact() {
    if (!this.props.email) {
      axios.post('/people', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        contactPhone: this.state.contactPhone,
        contactEmail: this.state.contactEmail,
        company: this.props.app.company,
        title: this.state.title,
        department: this.state.department
      })
      .then(() => console.log('successfully posted to google contacts'))
      .catch((err) => console.error(err))
    }
    axios.delete('/contacts', {
      params: {
        appId: this.props.app.id
      }
    })
    .then((response) => {
      axios.post('/contacts', {
        appId: this.props.app.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        contactPhone: this.state.contactPhone,
        contactEmail: this.state.contactEmail,
        company: this.props.app.company,
        title: this.state.title,
        department: this.state.department
      })
      .then((response) => {
        axios.post('/appinfo/contact', {
          id: this.props.app.id,
          contact: response.data
        })
        .then((response) => {
          this.handleSubmit()
        })
        .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
  }

  render() {
    return (
      <Form>
        <h2>Add a Point of Contact</h2>
        <Form.Group widths="equal">
          <Form.Input fluid label="First Name" placeholder="First Name" value={this.state.firstName} onChange={(event) => this.setState({firstName: event.target.value})}></Form.Input>
          <Form.Input fluid label="Last Name" placeholder="Last Name" value={this.state.lastName} onChange={(event) => this.setState({lastName: event.target.value})}></Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Phone #" placeholder="Phone #" value={this.state.contactPhone} onChange={(event) => this.setState({contactPhone: event.target.value})}></Form.Input>
          <Form.Input fluid label="Email" placeholder="Email" value={this.state.contactEmail} onChange={(event) => this.setState({contactEmail: event.target.value})}></Form.Input>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Input fluid label="Title" placeholder="Title" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})}></Form.Input>
          <Form.Input fluid label="Department" placeholder="Department" value={this.state.department} onChange={(event) => this.setState({department: event.target.value})}></Form.Input>
        </Form.Group>
        <Button onClick={this.addContact}>Submit</Button>
        {this.state.saving ? <div style={{display:"inline"}}>Saving...</div> : <div></div>}
      </Form>
    )
  }
}

export default Contact;