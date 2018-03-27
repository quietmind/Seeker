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
      reminderText: ''
    }
    this.sendReminder = this.sendReminder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    console.log(date);
    this.setState({
      startDate: date
    })
  }

  sendReminder() {
    axios.post('/reminders', {date: this.state.date, description: this.state.reminderText, email: this.props.email, company: this.props.app.company})
    .then(()=>this.setState({date: '', reminderText: ''})
  )}

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
        </Table.Row>}
      closeIcon={true}
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
          <div id="reminder">
            <p>Add a Reminder</p>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleChange}
              placeholder="Choose a date"
            />
            <input type="text" value={this.state.reminderText} placeholder="Reminder Description" onChange={(e)=>this.setState({reminderText: e.target.value})}></input>
            <button onClick={()=>{this.sendReminder()}}>Submit</button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
    )
  }
}

export default DescriptionCard;
