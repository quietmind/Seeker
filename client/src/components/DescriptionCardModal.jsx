import React from 'react';
import { Button, Header, Icon, Modal, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

let pubKey = 'BKn9Z71eyV2fgYztoT3XDC31ANF3HLmKuXKmkQR9OoMw-9trIi4JguYx-Y5kJ0xLddXlJTrPWmpnWcA5ebFHRfY';

class DescriptionCard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      date: moment(),
      reminderText: '',
      open: false,
      notesText: '',
      notes: []
    }

    this.sendReminder             = this.sendReminder.bind(this);
    this.handleChange             = this.handleChange.bind(this);
    this.deleteApplication        = this.deleteApplication.bind(this);
    this.addNote                  = this.addNote.bind(this);
    this.handleClose              = this.handleClose.bind(this);
    this.handleOpen               = this.handleOpen.bind(this);
    this.askPermission            = this.askPermission.bind(this);
    this.urlB64ToUint8Array       = this.urlB64ToUint8Array.bind(this)
    this.subscribeUser            = this.subscribeUser.bind(this)
    this.sendSubscriptionToServer = this.sendSubscriptionToServer.bind(this)
  }

  componentWillMount(){
    this.askPermission()
  }

  handleOpen() {
    this.setState({ open: true }, this.props.toggle)
  }

  handleClose() {
    this.setState({ reminderText: '', notesText: '', open: false });
  }


  handleChange(date) {
    console.log(date);
    this.setState({
      startDate: date
    })
  }

  sendReminder() {
    axios.post('/reminders', {date: this.state.date,
                              description: this.state.reminderText,
                              email: this.props.email,
                              company: this.props.app.company,
                              job_title: this.props.app.job_title,
                              userId: this.props.userId,
                              point_of_contact: this.props.app.point_of_contact,
                              appId: this.props.app.id
                              })
    .then(()=>this.setState({date: '', reminderText: ''})
  )}


  deleteApplication() {
    axios.delete('/applications', {data: {appId: this.props.app.id}})
    .then((response) => this.props.handleClick())
    .then((response) => this.handleClose())
  }

  addNote() {
    axios.post('/notes', {appId: this.props.app.id, text: this.state.notesText, userId: this.props.id})
    .then(()=> this.setState({notesText: ''}))
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
    }).then((res) => console.log(JSON.stringify(res)))
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


  render() {
    return (
      <Modal
      trigger={
        <Table.Row className="appListItem" onClick={this.handleOpen}>
          <Table.Cell>{this.props.app.job_title}</Table.Cell>
          <Table.Cell>{this.props.app.company}</Table.Cell>
          <Table.Cell>{this.props.app.date_created}</Table.Cell>
          <Table.Cell>{this.props.app.last_update}</Table.Cell>
          <Table.Cell>{this.props.phase.phase_label}</Table.Cell>
          <Table.Cell>{this.props.resume ? this.props.resume.file_name :  ''}</Table.Cell>
          <Table.Cell>{this.props.coverletter ? this.props.coverletter.file_name : ''}</Table.Cell>
        </Table.Row>
      }
      open={this.state.open}
      onClose={this.handleClose}
      closeIcon={true}
      // basic
      >
      <Header icon='building' content={this.props.app.company} />
      <Modal.Content>
        <h1>{this.props.app.job_title}</h1>
        <p>Resume Provided:</p>
        <a href={this.props.resume.s3_url}>{this.props.resume ? this.props.resume.file_name : ''}</a>
        <p>Cover Letter Provided:</p>
        <a href={this.props.coverletter.s3_url}>{this.props.coverletter ? this.props.coverletter.file_name : ''}</a>
        <p>Last Activity:<br></br>
        {this.props.app.last_update}</p>
        <div className="field">
          <div className="reminder">
            <p>Add a Reminder</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              placeholder="Choose a date"
            />
            <input type="text" value={this.state.reminderText} placeholder="Reminder Description" onChange={(e)=>this.setState({reminderText: e.target.value})}></input>
            <button onClick={this.sendReminder}>Submit</button>
          </div>
          <div>
            <p>Add a note to this entry</p>
            <input type="text" value={this.state.notesText} placeholder="Notes Description" onChange={(e)=>this.setState({notesText: e.target.value})}></input>
            <button onClick={this.addNote}>Submit</button>
          </div>
          <h1>Notes:</h1>
          {this.props.notes.map((note, i) => (
            <p>{note.note_text}</p>
          ))}
          {this.state.notes.map((note, i) => (
            <p>{note.note_text}</p>
          ))}
          <button onClick={this.deleteApplication}>Delete this Application</button>
        </div>
      </Modal.Content>
    </Modal>
    )
  }
}

export default DescriptionCard;
