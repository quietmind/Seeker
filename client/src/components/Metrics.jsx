import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
import C3Chart from 'react-c3js';
import ProgressView from './ProgressView.jsx';
import StatusView from './StatusView.jsx';

export default class Metrics extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			defaultView: true,
			data1: {
				columns: [
					['Applications', ...this.getCumulativeQuantities()]
				],
				type: 'bar'
			},
			axis1: {
				x: {
					type: 'category',
					categories: [...this.sortPhases().map(phase => phase.phase_label)]
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
				columns: [
					['dates', ...this.getDateRange().map((date) => new Date(date))],
					['New Applications', ...this.getQuantityPerDate()]
				]
			},
			axis2: {
				x: {
					type: 'timeseries',
					tick: {
						count: this.getDateRange().length,
						format: '%m/%d'
					}
				},
				y: {
					label: {
						text: 'Applications',
						position: 'outer-middle'
					}
				}
			},
			data3: {
				columns: this.collateQuantities(),
				type: 'pie'
			}
		},
		this.toggleView = this.toggleView.bind(this)
		this.sortPhases = this.sortPhases.bind(this)
		this.getQuantities = this.getQuantities.bind(this)
		this.getCumulativeQuantities = this.getCumulativeQuantities.bind(this)
	}

	toggleView() {
		this.setState({defaultView: !this.state.defaultView})
	}

	sortPhases() {
		return this.props.phases.sort((a, b) => {
			return a.phase_order - b.phase_order
		})
	}

	getQuantities() {
		return this.sortPhases().map((phase) => {
			return this.props.apps.reduce((sum, app) => {
				return app.phase_id === phase.id ? sum + 1 : sum
			}, 0)
		})
	}

	collateQuantities() {
		let quantities = this.getQuantities()
		return this.sortPhases().map((phase, i) => {
			return [phase.phase_label, quantities[i]]
		})
	}

	getCumulativeQuantities() {
		let runningTotal = 0
		return this.getQuantities().reverse().map((quantity) => {
			runningTotal += quantity
			return runningTotal
		}).reverse()
	}

	getQuantityPerDate() {
		return this.getDateRange().map((date) => {
			return this.props.apps.reduce((sum, app) => {
				return date === app.date_created ? sum + 1 : sum
			}, 0)
		})
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

	getRatios() {
		let quantities = this.getCumulativeQuantities()
		return quantities.map((quantity, i) => {
			return i === 0 ? { ratio: 1, index: 0 } : { ratio: quantity / quantities[i-1], index: i }
		})
	}

	getLargestDropoff() {
		let worstRatio = this.getRatios().reduce((acc, el) => {
			return el.ratio < acc.ratio ? el : acc
		})
		return this.sortPhases()[worstRatio.index].phase_label
	}

	render(){
		const defaultView = this.state.defaultView;
		return(
			<Grid>
				{this.state.defaultView ? 
					<ProgressView
						data={this.state.data1}
						axis={this.state.axis1}
						apps={this.props.apps}
						files={this.props.files}
						reminders={this.props.reminders}
						toggleView={this.toggleView}
						sortPhases={this.sortPhases}
						getCumulativeQuantities={this.getCumulativeQuantities}
					/>
				: 
					<StatusView
						data={this.state.data3}
						apps={this.props.apps}
						files={this.props.files}
						reminders={this.props.reminders}
						toggleView={this.toggleView}
						sortPhases={this.sortPhases}
						getQuantities={this.getQuantities}
					/>
				}
				<Grid.Row columns={2}>
					<Grid.Column>
						<Header size="huge" textAlign="center">Conclusions</Header>
						<div className="conclusions">
							It looks like you're experiencing difficulty reaching the "{this.getLargestDropoff()}" phase.
							We suggest practicing the skills involved in successfully completing this step in the application process.
						</div>
					</Grid.Column>
					<Grid.Column>
						<Header size="huge" textAlign="center">Activity Over Time</Header>
						<C3Chart data={this.state.data2} axis={this.state.axis2}/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		)
	}
}