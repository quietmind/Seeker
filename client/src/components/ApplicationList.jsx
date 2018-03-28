import React from 'react';
import { Table } from 'semantic-ui-react';
import DescriptionCard from './DescriptionCardModal.jsx';
import axios from 'axios';

export default class ApplicationList extends React.Component{
	constructor(props){
		super(props)
		this.state ={
			showModal: false,
			featuredItem: null,
			applications: []
		}

    this.arrangeByJobTitle = this.arrangeByJobTitle.bind(this);
    this.arrangeByCompany = this.arrangeByCompany.bind(this);
		this.arrangeByStatus = this.arrangeByStatus.bind(this);
		this.arrangeByResume = this.arrangeByResume.bind(this);
		this.arrangeByCoverLetter = this.arrangeByCoverLetter.bind(this);
    this.arrangeByDateCreated = this.arrangeByDateCreated.bind(this);
    this.arrangeByLastUpdate = this.arrangeByLastUpdate.bind(this);
  }

	arrangeByStatus() {
		this.setState({applications: this.props.apps.sort(dynamicSort("phase_id"))});
	}

  arrangeByResume() {
    this.setState({applications: this.props.apps.sort(dynamicSort("resume_id"))});
  }

	arrangeByCoverLetter() {
		this.setState({applications: this.props.apps.sort(dynamicSort("cover_letter_id"))});
	}

	arrangeByJobTitle() {
		this.setState({applications: this.props.apps.sort(dynamicSort("job_title"))});
	}

  arrangeByCompany() {
    this.setState({applications: this.props.apps.sort(dynamicSort("company"))});
  }

  arrangeByDateCreated() {
    var arrangedArray = this.props.apps.sort(function(a, b) {
      let date1 = new Date(a.date_created);
      let date2 = new Date(b.date_created);
      return date1.getTime() > date2.getTime() ? -1 : date1.getTime() < date2.getTime() ? 1 : 0;
    });
    this.setState({applications: arrangedArray});
  }

  arrangeByLastUpdate() {
    var arrangedArray = this.props.apps.sort(function(a, b) {
      let date1 = new Date(a.date_applied);
      let date2 = new Date(b.date_applied);
      return date1.getTime() > date2.getTime() ? -1 : date1.getTime() < date2.getTime() ? 1 : 0;
    });
    this.setState({applications: arrangedArray});
  }

	render() {
		return(
			<div>
        <Table className="applicationListTable">
          <Table.Header className="applicationListHeaders">
            <Table.Row>
              <Table.HeaderCell onClick={this.arrangeByJobTitle}>Job Title</Table.HeaderCell>
              <Table.HeaderCell onClick={this.arrangeByCompany}>Company</Table.HeaderCell>
              <Table.HeaderCell onClick={this.arrangeByDateCreated}>Date Created</Table.HeaderCell>
              <Table.HeaderCell onClick={this.arrangeByLastUpdate}>Last Activity</Table.HeaderCell>
              <Table.HeaderCell onClick={this.arrangeByStatus}>Status</Table.HeaderCell>
              <Table.HeaderCell onClick={this.arrangeByResume}>Resume Used</Table.HeaderCell>
              <Table.HeaderCell onClick={this.arrangeByCoverLetter}>Cover Letter Used</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="applicationListBody">
            {this.props.apps.map((app, i) => (
              <DescriptionCard
                app={app}
								userId={this.props.userId}
                phase={this.props.phases.filter((phase) => phase.id === app.phase_id)[0]}
                resume={this.props.files.filter((file) => file.id === app.resume_id)[0]}
                coverletter={this.props.files.filter((file) => file.id === app.cover_letter_id)[0]}
								email={this.props.email}
                key={i}
								id={this.props.userId}
								notes={this.props.notes.filter((note) => note.app_id === app.id)}
								handleClick={this.props.handleClick}
              />
						))}
          </Table.Body>
        </Table>
			</div>
		)
	}
}

function dynamicSort(property) {
  return function (a,b) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result;
  }
}
