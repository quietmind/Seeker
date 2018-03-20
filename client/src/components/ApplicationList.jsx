import React from 'react';
import { Table } from 'semantic-ui-react';
import Welcome from './Welcome.jsx';
import axios from 'axios';

export default class ApplicationList extends React.Component{
	constructor(props){
		super(props)
		this.state ={ 
      applications : [],
      user: null
		}

    this.arrangeByJobTitle = this.arrangeByJobTitle.bind(this);
    this.arrangeByCompany = this.arrangeByCompany.bind(this);
		this.arrangeByStatus = this.arrangeByStatus.bind(this);
		this.arrangeByResume = this.arrangeByResume.bind(this);
		this.arrangeByCoverLetter = this.arrangeByCoverLetter.bind(this);
    this.arrangeByDate = this.arrangeByDate.bind(this);
  }
  
  componentDidMount() {
    axios.get('/applications')
    .then((response) => {
      console.log('it worked', response.data)
      this.setState({user: response.data})
    })
    .catch((err) => {
      console.error(err)
    })
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

  arrangeByDate() {
    var arrangedArray = this.state.applications.sort(function(a, b) {
      let date1 = new Date(a.last_update);
      let date2 = new Date(b.last_update);
      return date1.getTime() > date2.getTime() ? -1 : date1.getTime() < date2.getTime() ? 1 : 0;
    });
    this.setState({applications: arrangedArray});
  }

	render(){
		return(
			<div>
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
