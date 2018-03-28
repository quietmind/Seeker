import React from 'react'
import {Grid, Header, Button} from 'semantic-ui-react'
import C3Chart from 'react-c3js'

const StatusView = (props) => (
  <Grid.Row columns={2}>
    <Grid.Column textAlign="center">
      <Header size="huge">Stats at a Glance</Header>
      <Grid columns={2}>
        {props.sortPhases().map((phase, i) => {
          if (phase.phase_order !== 0) {
            return (
              <Grid.Column key={i}>
                <Header size="large">{props.getQuantities()[i]}</Header>
                <div className="statshot">are currently in the {phase.phase_label} phase.</div>
              </Grid.Column>
            )
          } else {
            return (
              <Grid.Column key={i}>
                <Header size="large">{props.apps.length}</Header>
                <div className="statshot">applications created.</div>
              </Grid.Column>
            )
          }
        })}
        <Grid.Column>
          <Header size="large">{props.files.length}</Header>
          <div className="statshot">documents uploaded.</div>
        </Grid.Column>
        <Grid.Column>
          <Header size="large">{props.reminders.length}</Header>
          <div className="statshot">reminders pending.</div>
        </Grid.Column>
        <Grid.Column>
          <Button onClick={props.toggleView}>Toggle View</Button>
        </Grid.Column>
      </Grid>
    </Grid.Column>
    <Grid.Column>
      <Header size="huge" textAlign="center">Application Status</Header>
      <C3Chart data={props.data} />
    </Grid.Column>
  </Grid.Row>
)

export default StatusView
