import React from 'react';
import { Button, Header, Icon, Modal, Table, Menu } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';

let pubKey = 'BKn9Z71eyV2fgYztoT3XDC31ANF3HLmKuXKmkQR9OoMw-9trIi4JguYx-Y5kJ0xLddXlJTrPWmpnWcA5ebFHRfY';

class DescriptionCard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      open: false,
      notesText: '',
      notes: [],
      firstName: '',
      lastName: '',
      contactPhone: '',
      contactEmail: '',
      title: '',
      department: '',
      contactId: null,
      activeItem: 'Recap'
    }

    this.deleteApplication        = this.deleteApplication.bind(this);
    this.handleClose              = this.handleClose.bind(this);
    this.handleOpen               = this.handleOpen.bind(this);
    this.askPermission            = this.askPermission.bind(this);
    this.urlB64ToUint8Array       = this.urlB64ToUint8Array.bind(this);
    this.subscribeUser            = this.subscribeUser.bind(this);
    this.sendSubscriptionToServer = this.sendSubscriptionToServer.bind(this);
    this.handleItemClick          = this.handleItemClick.bind(this);
  }

  componentWillMount(){
    if(Notification.permission === 'default') this.askPermission()
  }

  handleOpen() {
    this.props.keepSwitch();
    this.setState({ open: true }, this.props.toggle);
  }

  handleClose() {
    this.setState({ reminderText: '', notesText: '', open: false });
  }

  deleteApplication() {
    axios.delete('/applications', {data: {appId: this.props.app.id}})
    .then((response) => this.props.handleClick())
    .then((response) => this.handleClose())
    .catch((err) => console.error(err))
  }

  urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  subscribeUser() {
   navigator.serviceWorker.ready.then((reg) => {
    let subscribeParams = { userVisibleOnly: true };
    //Setting the public key of our VAPID key pair.
    let applicationServerKey = this.urlB64ToUint8Array(pubKey);
    subscribeParams.applicationServerKey = applicationServerKey;
    reg.pushManager.subscribe(subscribeParams)
        .then((subscription) => {
          console.log(JSON.stringify(subscription))
            // Update status to subscribe current user on server, and to let
            // other users know this user has subscribed
            let endpoint = subscription.endpoint;
            let key = subscription.getKey('p256dh');
            let auth = subscription.getKey('auth');
            let encodedKey = btoa(String.fromCharCode.apply(null, new Uint8Array(key)));
            let encodedAuth = btoa(String.fromCharCode.apply(null, new Uint8Array(auth)));

            const subscripObject = {
              endpoint: endpoint,
              keys: {
                "p256dh": encodedKey,
                "auth": encodedAuth
              }

            }
            this.sendSubscriptionToServer(subscripObject)
        })
        .catch((err) => {
          // A problem occurred with the subscription.
          console.log('Unable to subscribe to push.', err);
        });
    });

  }

  sendSubscriptionToServer(subscription) {
    console.log('sending subscription')

    // console.log(encodedAuth, encodedKey)
    axios.post('/saveSubscription', {
      data: JSON.stringify(subscription)
    })
    .then((res) => console.log(JSON.stringify(res)))
    .catch((err) => console.error(err))
  }

  askPermission() {
  return new Promise( (resolve, reject) => {
    const permissionResult = Notification.requestPermission(function(result) {
      resolve(result);
    });

    if (permissionResult) permissionResult.then(resolve, reject);

  })
  .then( (permissionResult) => {
    if (permissionResult !== 'granted') {
      throw new Error('We weren\'t granted permission.');
    } else {
      this.subscribeUser()
    }
  });
}

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    var cardContent;

    if (activeItem === 'Recap') {
      cardContent = <Recap resume={this.props.resume} coverletter={this.props.coverletter} app={this.props.app} />;
    } else if (activeItem === 'Notes') {
      cardContent = <Notes notes={this.props.notes} />;
    } else if (activeItem === 'Reminder') {
      cardContent = <Reminder email={this.props.email} app={this.props.app} />;
    } else if (activeItem === 'Contact') {
      cardContent = <Contact app={this.props.app}/>;
    }

    return (
      <Modal
      trigger={
        <Table.Row className="appListItem" onClick={this.handleOpen}>
          <Table.Cell>{this.props.app.job_title}</Table.Cell>
          <Table.Cell>{this.props.app.company}</Table.Cell>
          <Table.Cell>{new Date(this.props.app.date_created).toDateString().substring(4)}</Table.Cell>
          <Table.Cell>{new Date(this.props.app.last_update).toDateString().substring(4)}</Table.Cell>
          <Table.Cell>{this.props.phase.phase_label}</Table.Cell>
          <Table.Cell>{this.props.resume ? this.props.resume.file_name :  ''}</Table.Cell>
          <Table.Cell>{this.props.coverletter ? this.props.coverletter.file_name : ''}</Table.Cell>
        </Table.Row>
      }
      open={this.state.open}
      onClose={this.handleClose}
      closeIcon={true}
      size='small'
      >
      <Header icon='building' content={this.props.app.job_title + " at " + this.props.app.company} />
      <Modal.Content>
        <Menu tabular>
          <Menu.Item name='Recap' active={activeItem === 'Recap'}
            as={Link} to='/list/recap' onClick={this.handleItemClick} />
          <Menu.Item name='Notes' active={activeItem === 'Notes'}
            as={Link} to='/list/notes' onClick={this.handleItemClick} />
          <Menu.Item name='Reminder' active={activeItem === 'Reminder'}
            as={Link} to='/list/reminder' onClick={this.handleItemClick} />
          <Menu.Item name='Contact' active={activeItem === 'Contact'}
            as={Link} to='/list/contact' onClick={this.handleItemClick} />
        </Menu>
        {cardContent}
        <button onClick={this.deleteApplication}>Delete this Application</button>
      </Modal.Content>
    </Modal>
    )
  }
}

const Recap = (props) => (
  <div>
    <p>Resume Provided:</p>
    <a href={props.resume ? props.resume.s3_url :  ''}>{props.resume ? props.resume.file_name : ''}</a>
    <p>Cover Letter Provided:</p>
    <a href={props.coverletter ? props.coverletter.s3_url :  ''}>{props.coverletter ? props.coverletter.file_name : ''}</a>
    <p>Created At:<br></br>
    {new Date(props.app.date_created).toDateString().substring(4)}</p>
    <p>Last Activity:<br></br>
    {new Date(props.app.last_update).toDateString().substring(4)}</p>
  </div>
)

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        notesText: ''
    }
    this.addNote = this.addNote.bind(this);
  }

  addNote() {
    axios.post('/notes', {appId: this.props.app.id, text: this.state.notesText, userId: this.props.id})
    .then(() => this.props.handleClick())
    .then(() => this.setState({notesText: ''}))
    .catch((err) => console.error(err))
  }

  render() {
    return (
      <div>
        <p>Add a note to this entry</p>
        <input type="text" value={this.state.notesText} placeholder="Notes Description" onChange={(e) => this.setState({notesText: e.target.value})}></input>
        <button onClick={this.addNote}>Submit</button>
      <h1>Notes:</h1>
      {this.props.notes.map((note, i) => (
        <p key={i}>{note.note_text}</p>
      ))}
      </div>
    )
  }
}

class Reminder extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      date: moment(),
      reminderText: '',
      reminderId: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.sendReminder = this.sendReminder.bind(this);
  }

  handleChange(date) {
    this.setState({
      date: date
    })
  }

  sendReminder() {
    if (this.props.email) {
      axios.post('/reminders', {
        date: this.state.date,
        description: this.state.reminderText,
        email: this.props.email,
        company: this.props.app.company,
        job_title: this.props.app.job_title,
        userId: this.props.app.userId,
        point_of_contact: this.props.app.point_of_contact,
        appId: this.props.app.id
      })
      .then((response) => this.setState({reminderId: response.data}))
      .catch((err) => console.error(err))
    } else {
      axios.post('/calendar', {
        date: `${this.state.date._d.getFullYear()}-${this.state.date._d.getMonth()+1}-${this.state.date._d.getDate()}`,
        description: this.state.reminderText,
        email: this.props.email,
        company: this.props.app.company,
        job_title: this.props.app.job_title,
        userId: this.props.userId,
        point_of_contact: this.props.app.point_of_contact,
        appId: this.props.app.id
      })
      .then((response) => this.setState({reminderId: response.data}))
      .catch((err) => console.error(err))
    }
  }

  render() {
    return (
      <div className="reminder">
        <p>Add a Reminder</p>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleChange}
          placeholderText="Choose a date"
          dateFormat="LLL"
        />
        <input type="text" value={this.state.reminderText} placeholder="Reminder Description" onChange={(e) => this.setState({reminderText: e.target.value})}></input>
        <button onClick={this.sendReminder}>Submit</button>
      </div>
    )
  }
}

class Contact extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      contactPhone: '',
      contactEmail: '',
      title: '',
      department: ''
    }

    this.addContact = this.addContact.bind(this);
  }

  addContact() {
    if (this.props.email) {
      axios.post('/contacts', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        contactPhone: this.state.contactPhone,
        contactEmail: this.state.contactEmail,
        company: this.props.app.company,
        title: this.state.title,
        department: this.state.department
      })
      .then((response) => this.setState({contactId: response.data}))
      .catch((err) => console.error(err))
    } else {
      axios.post('/people', {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        contactPhone: this.state.contactPhone,
        contactEmail: this.state.contactEmail,
        company: this.props.app.company,
        title: this.state.title,
        department: this.state.department
      })
      .then((response) => this.setState({contactId: response.data}))
      .catch((err) => console.error(err))
    }
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

export default DescriptionCard;
