import React from 'react';
import { Table } from 'semantic-ui-react';
import Welcome from './Welcome.jsx';

export default class ApplicationList extends React.Component{
	constructor(props){
		super(props)
		this.state ={ applications : [
			{job_title: "clerk", company: "Days Inn", date_applied: 'Feb 12 2014 10:00:00 AM', resume_id: 1, cover_letter_id: 2, phase_id: 3},
			{job_title: "data analyst", company: "Hack Reactor", date_applied: 'Mar 12 2011 10:00:00 AM', resume_id: 4, cover_letter_id: 1, phase_id: 2},
      {job_title: "accountant", company: "Zumix", date_applied: 'Mar 8 2012 08:00:00 AM', resume_id: 2, cover_letter_id: 5, phase_id: 1}
      ]
		}

    this.arrangeByJobTitle = this.arrangeByJobTitle.bind(this);
    this.arrangeByCompany = this.arrangeByCompany.bind(this);
		this.arrangeByStatus = this.arrangeByStatus.bind(this);
		this.arrangeByResume = this.arrangeByResume.bind(this);
		this.arrangeByCoverLetter = this.arrangeByCoverLetter.bind(this);
//    this.arrangeByDate = this.arrangeByDate.bind(this);
	}

	arrangeByStatus() {
		this.setState({applications: this.state.applications.sort(dynamicSort("phase_id"))});
	}

  arrangeByResume() {
    this.setState({applications: this.state.applications.sort(dynamicSort("resume_id"))});
  }

	arrangeByCoverLetter() {
		this.setState({applications: this.state.applications.sort(dynamicSort("cover_letter_id"))});
	}

	arrangeByJobTitle() {
		this.setState({applications: this.state.applications.sort(dynamicSort("job_title"))});
	}

  arrangeByCompany() {
    this.setState({applications: this.state.applications.sort(dynamicSort("company"))});
  }

  // arrangeByDate() {
  //   var arrangedArray = this.state.applications.sort(function(a, b) {
  //     a = new Date(a.dateModified);
  //     b = new Date(b.dateModified);
  //     return a>b ? -1 : a<b ? 1 : 0;
  //   });
	//
  //   this.setState({applications: arrangedArray});
  // }


	render(){
		return(
			<div>
			   <div> This is the Application List</div>
			   <Table className="applicationListTable">
            <Table.Header className="applicationListHeaders">
	             <Table.Row><Table.HeaderCell onClick={this.arrangeByJobTitle}>Job Title</Table.HeaderCell>
	              <Table.HeaderCell onClick={this.arrangeByCompany}>Company</Table.HeaderCell>
	              <Table.HeaderCell onClick={this.arrangeByDate}>Date Submitted</Table.HeaderCell>
	              <Table.HeaderCell onClick={this.arrangeByStatus}>Status</Table.HeaderCell>
	              <Table.HeaderCell onClick={this.arrangeByResume}>Resume Used</Table.HeaderCell>
	              <Table.HeaderCell onClick={this.arrangeByCoverLetter}>Cover Letter Used</Table.HeaderCell>
	            </Table.Row>
						</Table.Header>

            <Table.Body className="applicationListBody">
              {this.state.applications.map((ele, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{ele.job_title}</Table.Cell>
                  <Table.Cell>{ele.company}</Table.Cell>
                  <Table.Cell>{ele.date_applied}</Table.Cell>
                  <Table.Cell>{ele.phase_id}</Table.Cell>
                  <Table.Cell>{ele.resume_id}</Table.Cell>
                  <Table.Cell>{ele.cover_letter_id}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
         </Table>

			</div>
		)
	}
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
