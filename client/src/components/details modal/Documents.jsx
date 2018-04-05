import React from 'react';
import { Form, Button, Segment } from 'semantic-ui-react';
import axios from 'axios';

class Documents extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resume: null,
      coverletter: null
    }

    this.addResume = this.addResume.bind(this)
    this.addCoverLetter = this.addCoverLetter.bind(this)
  }

  addResume() {
    axios.post('/appinfo/resume', {
      resume: this.state.resume,
      app: this.props.app.id
    })
    .then((response) => {
      this.props.getUserData()
    })
    .catch((err) => console.error(err))
  }

  addCoverLetter() {
    axios.post('/appinfo/coverletter', {
      coverletter: this.state.coverletter,
      app: this.props.app.id
    })
    .then((response) => {
      this.props.getUserData()
    })
    .catch((err) => console.error(err))
  }

  render() {
    let resumeOptions = [{text: 'N/A', value: null, key: null}].concat(this.props.files.map(function(ele, i) { return {text: ele.file_name, value: ele.id, key: i}}));
    let coverLetterOptions = [{text: 'N/A', value: null, key: null}].concat(this.props.files.map(function(ele, i) { return {text: ele.file_name, value: ele.id, key: i}}));
    
    return (
      <div>
        {this.props.resume ? 
          <Segment>
            <b>Resume Provided:&nbsp;</b>
            <a href={this.props.resume.s3_url}>{this.props.resume.file_name}</a>
          </Segment>
        :
          <Form>
            <Form.Select fluid label='Resume Used' options={resumeOptions} placeholder='Resume' value= {this.state.resume} onChange={(e, { value })=>this.setState({resume: value})}/>
            <Button onClick={this.addResume}>Save</Button>
          </Form>
        }
        <br/>
        {this.props.coverletter ?
          <Segment>
            <b>Cover Letter Provided:&nbsp;</b>
            <a href={this.props.coverletter.s3_url}>{this.props.coverletter.file_name}</a>
          </Segment>
        :
          <Form>
            <Form.Select fluid label='Cover Letter Used' options={coverLetterOptions} placeholder='Cover Letter' value={this.state.coverletter} onChange={(e, { value })=>this.setState({coverletter: value})}/>
            <Button onClick={this.addCoverLetter}>Save</Button>
          </Form>
        }
      </div>
    )
  }
}

export default Documents