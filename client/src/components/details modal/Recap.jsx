import React from 'react';
import { List } from 'semantic-ui-react';

const Recap = (props) => (
  <List bulleted size="large" className="recap">
    <List.Item>
      <b>Created: {new Date(props.app.date_created).toDateString().substring(4)}</b>
    </List.Item>
    <br/>
    <List.Item>
      <b>Last Update: {new Date(props.app.last_update).toDateString().substring(4)}</b>
    </List.Item>
    <br/>
    <List.Item>
      <b>Current Phase: {props.phase.phase_label}</b>
    </List.Item>
  </List>
)

export default Recap;
