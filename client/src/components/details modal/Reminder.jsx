import React from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class Reminder extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      date: moment(), //this.props.reminder ? this.props.reminder.due_date : moment(),
      reminderText: this.props.reminder ? this.props.reminder.text_desc : ''
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
    if (!this.props.email) {
      axios.post('/calendar', {
        date: `${this.state.date._d.getFullYear()}-${this.state.date._d.getMonth()+1}-${this.state.date._d.getDate()}`,
        description: this.state.reminderText,
        company: this.props.app.company,
        job_title: this.props.app.job_title
      })
      .then(() => console.log('successfully posted to google calendar'))
      .catch((err) => console.error(err))
    }
    axios.post('/reminders', {
      date: this.state.date,
      description: this.state.reminderText,
      email: this.props.email,
      company: this.props.app.company,
      job_title: this.props.app.job_title,
      userId: this.props.userId,
      appId: this.props.app.id
    })
    .then((response) => {
      console.log('received response and ran second function')
      let app = this.props.app
      app.reminder_id = response.data
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
      <div className="reminder">
        <p>Add a Reminder</p>
        <DatePicker
          selected={this.state.date}
          onChange={this.handleChange}
          placeholderText="Choose a date"
          dateFormat="LLL"
        />
        <input type="text" value={this.state.reminderText} placeholder="Reminder Description" onChange={(event) => this.setState({reminderText: event.target.value})}></input>
        <button onClick={this.sendReminder}>Submit</button>
      </div>
    )
  }
}

export default Reminder