import React from 'react';

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

export default Recap;