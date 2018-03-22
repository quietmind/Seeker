import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import C3Chart from 'react-c3js';

export default class Metrics extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			data1: {
				columns: [
					['Applications', ...this.props.phases.map((phase) => {
						return this.props.apps.reduce((sum, app) => {
							if (app.phase_id === phase.id) {
								return sum + 1 
							} else {
								return sum
							} 
						}, 0)
					})]
				],
				types: {
					Applications: 'bar'
				}
			},
			axis1: {
				x: {
					type: 'category',
					categories: [...this.props.phases.map(phase => phase.phase_label)]
				},
				y: {
					label: {
						text: 'Applications',
						position: 'outer-middle'
					}
				}
			},
			data2: {
				x: 'dates',
				xFormat: '%Y%m%d',
				columns: [
					['dates', ...this.getDateRange().map((date) => new Date(date))],
					['New Applications', ...this.getDateRange().map((date) => {
						return this.props.apps.reduce((sum, app) => {
							if (date === app.date_created) {
								return sum + 1 
							} else {
								return sum
							} 
						}, 0)
					})]
				]
			},
			axis2: {
				x: {
					type: 'timeseries',
					tick: {
						count: this.getDateRange().length,
						format: '%Y-%m-%d'
					}
				},
				y: {
					label: {
						text: 'Applications',
						position: 'outer-middle'
					}
				}
			}
		}
	}

	getDateRange() {
		return Array.from(new Set(this.props.apps.map((app) => {
			return app.date_created
		}).sort((a, b) => {
			let date1 = new Date(a)
			let date2 = new Date(b)
			return date2.getTime() - date1.getTime()
		})))
	}

	render(){
		console.log('date range', this.getDateRange())
		console.log(typeof this.getDateRange()[0])
		return(
			<Grid>
				<Grid.Row columns={2}>
					<Grid.Column>
						<Header size="huge" textAlign="center">Stats at a Glance</Header>
						<Grid>
							<Grid.Row columns={2} textAlign="center">
								<Grid.Column>
									<div>You have created {this.props.apps.length} applications.</div>
									{this.props.phases.map((phase, i) => (
										<div key={i}>Of these, {this.props.apps.filter(app => app.phase_id === phase.id).length} have progressed to the {phase.phase_label} phase.</div>
									))}
								</Grid.Column>
								<Grid.Column>
									<div>You have uploaded {this.props.resumes.length} versions of your resume.</div>
									<div>You have uploaded {this.props.coverletters.length} different cover letters.</div>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Grid.Column>
					<Grid.Column>
						<Header size="huge" textAlign="center">Application Status</Header>
						<C3Chart data={this.state.data1} axis={this.state.axis1}/>
					</Grid.Column>
				</Grid.Row>
				<Grid.Row columns={1}>
					<Grid.Column>
						<Header size="huge" textAlign="center">Activity Over Time</Header>
						<C3Chart data={this.state.data2} axis={this.state.axis2}/>
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