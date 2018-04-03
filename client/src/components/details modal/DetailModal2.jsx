import React from 'react';
import { Button, Header, Icon, Modal, Table, Menu } from 'semantic-ui-react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import Recap from './Recap.jsx'
import Reminder from './Reminder.jsx'
import Contact from './Contact.jsx'
import Notes from './Notes.jsx'
import { Card } from 'semantic-ui-react'
import moment from 'moment'

let pubKey = 'BKn9Z71eyV2fgYztoT3XDC31ANF3HLmKuXKmkQR9OoMw-9trIi4JguYx-Y5kJ0xLddXlJTrPWmpnWcA5ebFHRfY';

class DescriptionCard2 extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      activeItem: 'Recap',
      open: false
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
    this.setState({ notesText: '', open: false });
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
      cardContent = <Recap resume={this.props.resume} coverLetter={this.props.coverletter} app={this.props.app} />;
     } else if (activeItem === 'Notes') {
      cardContent = <Notes notes={this.props.notes} app={this.props.app} handleClick={this.props.handleClick} />;
    } else if (activeItem === 'Reminder') {
      cardContent = <Reminder app={this.props.app} email={this.props.email} userId={this.props.app.user_id} reminder={this.props.reminder} handleClick={this.props.handleClick} />;
    } else if (activeItem === 'Contact') {
      cardContent = <Contact contact={this.props.contact} app={this.props.app} handleClick={this.props.handleClick} />;
    }

    return (
      <Modal
      trigger={
        <h3 onClick={this.handleOpen}>{this.props.app.company}</h3>
      }
      open={this.state.open}
      onClose={this.handleClose}
      closeIcon={true}
      size='small'
      closeOnDimmerClick={false}
      >
      <Header icon='building' content={this.props.app.job_title + " at " + this.props.app.company} />
      <Modal.Content>
        <Menu tabular>
          <Menu.Item name='Recap' active={activeItem === 'Recap'} onClick={this.handleItemClick} />
          <Menu.Item name='Notes' active={activeItem === 'Notes'} onClick={this.handleItemClick} />
          <Menu.Item name='Reminder' active={activeItem === 'Reminder'} onClick={this.handleItemClick} />
          <Menu.Item name='Contact' active={activeItem === 'Contact'} onClick={this.handleItemClick} />
        </Menu>
        {cardContent}
        <button style={{clear:'both'}} onClick={this.deleteApplication}>Delete this Application</button>
      </Modal.Content>
    </Modal>
    )
  }
}

export default DescriptionCard2;