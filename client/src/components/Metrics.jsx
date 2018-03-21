import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import C3Chart from 'react-c3js';

export default class Metrics extends React.Component{
	constructor(props){
		super(props)
		this.state ={
			dataset1: {
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 50, 20, 10, 40, 15, 25]
				]
			},
			dataset2: {
				columns: [
					['data1', 30, 200, 100, 400, 150, 250],
					['data2', 50, 20, 10, 40, 15, 25]
				]
			}

		}
	}

	render(){
		return(
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Header size="huge" textAlign="center">Stats at a Glance</Header>
					</Grid.Column>
					<Grid.Column>
						<Header size="huge" textAlign="center">Application Status</Header>
						<C3Chart data={this.state.dataset1}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Header size="huge" textAlign="center">Activity Over Time</Header>
						<C3Chart data={this.state.dataset2}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Header size="huge" textAlign="center">Conclusions</Header>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}