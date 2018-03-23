import React from 'react';
import { Button, Header, Icon, Modal, Table } from 'semantic-ui-react';

const DescriptionCard = (props) => (
  <Modal 
    trigger={
      <Table.Row key={props.i} props={props.info}>
        <Table.Cell>{props.info.job_title}</Table.Cell>
        <Table.Cell>{props.info.company}</Table.Cell>
        <Table.Cell>{props.info.date_created}</Table.Cell>
        <Table.Cell>{props.info.last_update}</Table.Cell>
        <Table.Cell>{props.info.phase_id}</Table.Cell>
        <Table.Cell>{props.info.resume_id}</Table.Cell>
        <Table.Cell>{props.info.cover_letter_id}</Table.Cell>
      </Table.Row>
    } 
    closeIcon={true}
    closeOnDimmerClick={false}
  >
    <Header icon='building' content={props.info.company} />
    <Modal.Content>
      <h1>{props.info.job_title}</h1>
      <p>Resume Provided:<br></br>
      {props.info.resume_id}</p>
      <p>Cover Letter Provided:<br></br>
      {props.info.cover_letter_id}</p>
      <p>{props.info.last_update}</p>
    </Modal.Content>

  </Modal>
)

export default DescriptionCard;
