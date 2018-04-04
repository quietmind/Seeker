import React from 'react';
import { Button, Header, Icon, Modal, Table, Menu, Segment } from 'semantic-ui-react';
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

    this.deleteApplication = this.deleteApplication.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleOpen() {
    this.props.keepSwitch();
    this.setState({ open: true }, this.props.toggle);
  }

  handleClose() {
    this.setState({ notesText: '', open: false });
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  deleteApplication() {
    axios.delete('/applications', {data: {appId: this.props.app.id}})
    .then((response) => this.props.getUserData())
    .then((response) => this.handleClose())
    .catch((err) => console.error(err))
  }

  render() {
    const { activeItem } = this.state;
    var cardContent;

    if (activeItem === 'Recap') {
      cardContent = <Recap resume={this.props.resume} coverLetter={this.props.coverletter} app={this.props.app} phase={this.props.phase} />;
     } else if (activeItem === 'Notes') {
      cardContent = <Notes notes={this.props.notes} app={this.props.app} getUserData={this.props.getUserData}/>
    } else if (activeItem === 'Reminder') {
      cardContent = <Reminder app={this.props.app} email={this.props.email} userId={this.props.app.user_id} reminder={this.props.reminder} getUserData={this.props.getUserData} />;
    } else if (activeItem === 'Contact') {
      cardContent = <Contact contact={this.props.contact} app={this.props.app} getUserData={this.props.getUserData} />;
    }

    return (
      <Modal
      trigger={
        <h3 className="card-title" onClick={this.handleOpen}>{this.props.app.company}</h3>
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
        <Segment>{cardContent}</Segment>
        <Button style={{clear:'both'}} onClick={this.deleteApplication}>Delete this Application</Button>
      </Modal.Content>
    </Modal>
    )
  }
}

export default DescriptionCard2;
