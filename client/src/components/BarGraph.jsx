import React from 'react';
import {Grid, Header, Button} from 'semantic-ui-react';
import C3Chart from 'react-c3js';

const BarGraph = (props) => (
  <Grid.Column>
    <Header size="huge" textAlign="center">Application Progress</Header>
    <Button onClick={props.toggleView}>Toggle</Button>
    <C3Chart data={props.data} axis={props.axis}/>
  </Grid.Column>
)

export default BarGraph;