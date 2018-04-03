import React from 'react';
import axios from 'axios';

class Contact extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      firstName: this.props.contact ? this.props.contact.first_name : '',
      lastName: this.props.contact ? this.props.contact.last_name : '',
      contactPhone: this.props.contact ? this.props.contact.contact_phone : '',
      contactEmail: this.props.contact ? this.props.contact.contact_email : '',
      title: this.props.contact ? this.props.contact.job_title : '',
      department: this.props.contact ? this.props.contact.department : ''
    }

    this.addContact = this.addContact.bind(this);
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
      let app = this.props.app
      app.point_of_contact = response.data
      axios.post('/details', app)
      .then((response) => {
        this.props.handleClick()
      })
      .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
  }

  render() {
    return (
      <div className="contact">
        <p>Add a Point of Contact</p>
        <input type="text" value={this.state.firstName} placeholder="First Name" onChange={(event) => this.setState({firstName: event.target.value})}></input>
        <input type="text" value={this.state.lastName} placeholder="Last Name" onChange={(event) => this.setState({lastName: event.target.value})}></input>
        <input type="text" value={this.state.contactPhone} placeholder="Phone #" onChange={(event) => this.setState({contactPhone: event.target.value})}></input>
        <input type="text" value={this.state.contactEmail} placeholder="Email" onChange={(event) => this.setState({contactEmail: event.target.value})}></input>
        <input type="text" value={this.state.title} placeholder="Title" onChange={(event) => this.setState({title: event.target.value})}></input>
        <input type="text" value={this.state.department} placeholder="Department" onChange={(event) => this.setState({department: event.target.value})}></input>
        <button onClick={this.addContact}>Submit</button>
      </div>
    )
  }
}

export default Contact;