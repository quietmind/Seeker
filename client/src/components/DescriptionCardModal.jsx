import React from 'react';
import { Button, Header, Icon, Modal, Table } from 'semantic-ui-react';

const DescriptionCard = (props) => (
  <Modal 
    trigger={
      <Table.Row>
        <Table.Cell>{props.app.job_title}</Table.Cell>
        <Table.Cell>{props.app.company}</Table.Cell>
        <Table.Cell>{props.app.date_created}</Table.Cell>
        <Table.Cell>{props.app.last_update}</Table.Cell>
        <Table.Cell>{props.phase.phase_label}</Table.Cell>
        <Table.Cell>{props.resume ? props.resume.file_name :  ''}</Table.Cell>
        <Table.Cell>{props.coverletter ? props.coverletter.file_name : ''}</Table.Cell>
      </Table.Row>
    }  
    closeIcon={true}
  >
    <Header icon='building' content={props.app.company} />
    <Modal.Content>
      <h1>{props.app.job_title}</h1>
      <p>Resume Provided:<br></br>
      {props.resume ? props.resume.file_name : ''}</p>
      <p>Cover Letter Provided:<br></br>
      {props.coverletter ? props.coverletter.file_name : ''}</p>
      <p>Last Activity:<br></br>
      {props.app.last_update}</p>
    </Modal.Content>

  </Modal>
)

export default DescriptionCard;
