import React from 'react';
import {Grid, Header, Button, Segment, Statistic} from 'semantic-ui-react';
import C3Chart from 'react-c3js';

const ProgressView = (props) => (
  <Grid.Row columns={2}>
    <Grid.Column textAlign="center">
      <Segment className="statshot-container">
        <Header size="huge">Stats at a Glance</Header>
        <Grid columns={2}>
          {props.sortPhases().map((phase, i) => {
            if (phase.phase_order !== 0) {
              return (
                <Grid.Column key={i}>
                  <Statistic size="small" label={` are currently in the ${phase.phase_label} phase`} value={props.getCumulativeQuantities()[i]}/>
                </Grid.Column>
              )
            } else {
              return (
                <Grid.Column key={i}>
                   <Statistic size="small" label="applications tracked" value={props.apps.length}/>
                </Grid.Column>
              )
            }
          })}
          <Grid.Column>
            <Statistic size="small" label="documents uploaded" value={props.files.length}/>
          </Grid.Column>
          <Grid.Column>
            <Statistic size="small" label="reminders pending" value={props.reminders.length}/>
          </Grid.Column>
          <Grid.Column>
            <Button onClick={props.toggleView}>Toggle View</Button>
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment className="bar-graph-container">
        <Header size="huge" textAlign="center">Application Progress</Header>
        <C3Chart data={props.data} axis={props.axis}/>
      </Segment>
    </Grid.Column>
  </Grid.Row>
)

export default ProgressView;
