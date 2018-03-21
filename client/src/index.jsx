import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'
import ProgressBoard from './components/ProgressBoard.jsx'
import Metrics from './components/Metrics.jsx'
import ApplicationList from './components/ApplicationList.jsx'
import Welcome from './components/Welcome.jsx'
import FormModal from './components/formModal.jsx'
import axios from 'axios';

// const history = createHistory();

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		menuVisible: false,
      user: null,
<<<<<<< HEAD
      phases: [],
      applications: []
=======
      applications:[]
>>>>>>> formModal
  	}

  	this.toggleMenu = this.toggleMenu.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
<<<<<<< HEAD

    this.getUserData = this.getUserData.bind(this)
    this.decorateProgressBoard = this.decorateProgressBoard.bind(this)
    this.logout = this.logout.bind(this);
=======
>>>>>>> formModal
    this.submitNewApplication = this.submitNewApplication.bind(this);
  }

  toggleMenu(){
  	this.setState({
  		menuVisible: !this.state.menuVisible
  	})
  }
<<<<<<< HEAD
=======

>>>>>>> formModal
//id, user_id, phase_id, reminder_id, resume_id, cover_letter_id, job_title, company, date_created, last_update
  submitNewApplication(phase, resume, cover_letter, job_title, company){
    axios.post('/applications', {userId: this.state.user,
                                phaseId: phase,
<<<<<<< HEAD
                                reminderId: 1,
                                resumeId: resume,
                                coverLetterId: cover_letter,
                                jobTitle: job_title,
                                company: company,
                                dateCreated: Date.now(), lastUpdate: Date.now()})
    .then((response) => { axios.get('/applications')
      .then((results) => this.setState({applications: results.data}))});
=======
                                reminderId: null,
                                resumeId: null,
                                coverLetterId: null,
                                jobTitle: job_title,
                                company: company,
                                date: new Date()})
    // .then((response) => { axios.get('/applications')
    //   .then((results) => this.setState({applications: results.data}))});
>>>>>>> formModal
  }

  //======AUTHENTICATION ACTIONS=========
  signup(username, password) {
    axios.post('/users', {username: username, password: password})
    //find something to redirect to login
    .then((response) => {
      this.setState({user: response.data})
      this.getUserData()
    })
    .catch((err)=> alert("Please enter a valid username"))
  }

  login(username, password) {
    axios.get('/users', {params: {username: username, password: password}})
    //double check what returning value will be
    .then((response) => {
      this.setState({user: response.data})
      this.getUserData()
    })
    .catch((err) => alert("Please enter a valid username"))
  }

  logout() {
    console.log('loggin out')
    this.setState({user: null})
  }

  getUserData(){
    axios.get('/phases')
    .then((response) =>  {
      this.setState({phases: response.data}, () =>{
        axios.get('/applications')
        .then((response) =>  this.setState({applications: response.data}, () => console.log('got data', this.state.applications, this.state.phases)))
        .catch((err) => console.error(err))
      })
    })
    .catch((err) => console.error(err))
  }

  decorateProgressBoard(){
    return <ProgressBoard
            phases={this.state.phases}
            apps={this.state.applications}/>
  }

  render () {
    if (this.state.user) {
      return(
        <Router history={history}>
          <div className="app-container">
            <Menu secondary attached="top">
              <Menu.Item onClick={this.toggleMenu}>
              <Icon name="sidebar" /> Menu
              </Menu.Item>
              <Menu.Item onClick={this.logout}>
              Log Out
              </Menu.Item>
            </Menu>
            <Sidebar.Pushable as={Segment}>
              <Sidebar as={Menu} animation='slide along' width='very wide' visible={this.state.menuVisible} icon='labeled' vertical inverted>
                <Menu.Item name='home' as={Link} to='/'>
                  <Icon name='home' />
                  Home
                </Menu.Item>
                <Menu.Item name='metrics' as={Link} to='/metrics'>
                  <Icon name='bar chart' />
                  Metrics
                </Menu.Item>
                <Menu.Item name='apps' as={Link} to='/list'>
                  <Icon name='book' />
                  My Apps
                </Menu.Item>
					    <FormModal />
              </Sidebar>
              <Sidebar.Pusher>
                <Route  path='/' render={this.decorateProgressBoard}/>
                <Route  path='/metrics' component={Metrics}/>
                <Route  path='/list' component={ApplicationList}/>

              </Sidebar.Pusher>
            </Sidebar.Pushable>
          </div>
        </Router>
      )
    } else {
      return(<Welcome login={this.login} signup={this.signup}/>)
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
