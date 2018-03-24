import React from 'react';
import {Grid, Header, Button} from 'semantic-ui-react';
import C3Chart from 'react-c3js';

const PieChart = (props) => {
  return (
    <Grid.Column>
      <Header size="huge" textAlign="center">Application Status</Header>
      <Button onClick={props.toggleView}>Toggle</Button>
      <C3Chart data={props.data}/>
    </Grid.Column>
  )
}

export default PieChart;