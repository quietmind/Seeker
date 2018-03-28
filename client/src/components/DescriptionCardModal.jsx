import React from 'react';
import { Button, Header, Icon, Modal, Table } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';

class DescriptionCard extends React.Component{
  constructor(props) {
    super(props)

    this.state = {
      date: moment(),
      reminderText: '',
      modalOpen: false,
      notesText: '',
      notes: []
    }

    this.sendReminder = this.sendReminder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteApplication = this.deleteApplication.bind(this);
    this.addNote = this.addNote.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    this.setState({ modalOpen: true }, this.props.toggle)
  }

  handleClose() {
    this.setState({ reminderText: '', notesText: '', modalOpen: false });
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
    .then(()=> {this.props.handleClick()})
  }

  addNote() {
    axios.post('/notes', {appId: this.props.app.id, text: this.state.notesText, userId: this.props.id})
    .then(()=> this.setState({notesText: ''}))
  }

  render() {
    return (
      <Modal
      trigger={
        <Table.Row className="appListItem">
          <Table.Cell>{this.props.app.job_title}</Table.Cell>
          <Table.Cell>{this.props.app.company}</Table.Cell>
          <Table.Cell>{this.props.app.date_created}</Table.Cell>
          <Table.Cell>{this.props.app.last_update}</Table.Cell>
          <Table.Cell>{this.props.phase.phase_label}</Table.Cell>
          <Table.Cell>{this.props.resume ? this.props.resume.file_name :  ''}</Table.Cell>
          <Table.Cell>{this.props.coverletter ? this.props.coverletter.file_name : ''}</Table.Cell>
        </Table.Row>
      }
      // open={this.state.modalOpen}
      // onClose={this.handleClose}
      closeIcon={true}
      // basic
      >
      <Header icon='building' content={this.props.app.company} />
      <Modal.Content>
        <h1>{this.props.app.job_title}</h1>
        <p>Resume Provided:<br></br>
        {this.props.resume ? this.props.resume.file_name : ''}</p>
        <p>Cover Letter Provided:<br></br>
        {this.props.coverletter ? this.props.coverletter.file_name : ''}</p>
        <p>Last Activity:<br></br>
        {this.props.app.last_update}</p>
        <div className="field">
          <div class="reminder">
            <p>Add a Reminder</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              placeholder="Choose a date"
            />
            <input type="text" value={this.state.reminderText} placeholder="Reminder Description" onChange={(e)=>this.setState({reminderText: e.target.value})}></input>
            <button onClick={this.sendReminder}>Submit</button>
          </div>
          <div class="reminder">
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
