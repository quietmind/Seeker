import React from 'react';
import { Grid, Segment, Form } from 'semantic-ui-react';

const Recap = (props) => (
  <Form>
    <Grid columns='equal'>
      <Grid.Row>
        <Grid.Column style={{display: 'flex', justifyContent: 'center'}}>
          <b>Resume Provided:</b>
          <br></br>
          <a href={props.resume ? props.resume.s3_url :  null}>{props.resume ? props.resume.file_name : '(None)'}</a>
        </Grid.Column>
        <Grid.Column style={{display: 'flex', justifyContent: 'center'}}>
          <b>Cover Letter Provided:</b>
          <br></br>
          <a href={props.coverletter ? props.coverletter.s3_url :  null}>{props.coverletter ? props.coverletter.file_name : '(None)'}</a>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{display: 'flex', justifyContent: 'center'}}>
          <b>Created At:<br></br>
          {new Date(props.app.date_created).toDateString().substring(4)}</b>
        </Grid.Column>
        <Grid.Column style={{display: 'flex', justifyContent: 'center'}}>
          <b>Last Activity:<br></br>
          {new Date(props.app.last_update).toDateString().substring(4)}</b>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{display: 'flex', justifyContent: 'center'}}>
        <b>Current Phase:<br></br>
        {props.phase.phase_label}</b>
      </Grid.Row>
    </Grid>
  </Form>
)

export default Recap;
