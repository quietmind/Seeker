import React from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'
import ProgressBoard from './components/ProgressBoard.jsx'
import Metrics from './components/Metrics.jsx'
import ApplicationList from './components/ApplicationList.jsx'
import Welcome from './components/Welcome.jsx'
import AppModal from './components/AppModal.jsx'
import DocModal from './components/DocModal.jsx'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		menuVisible: false,
      userId: null,
      phases: [],
      applications: [],
      reminders: [],
      files: [],
      notes: [],
      userEmail: null
  	}

  	this.toggleMenu = this.toggleMenu.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.getUserData = this.getUserData.bind(this);
    this.decorateAppList = this.decorateAppList.bind(this);
    this.decorateDataVis = this.decorateDataVis.bind(this);
    this.decorateProgressBoard = this.decorateProgressBoard.bind(this);
    this.logout = this.logout.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.createPhase = this.createPhase.bind(this);
    this.deletePhase = this.deletePhase.bind(this);
    this.registerServiceWorker = this.registerServiceWorker.bind(this)
    this.updatePhaseOrder = this.updatePhaseOrder.bind(this)
  }

  registerServiceWorker() {
    return navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      return registration;
    })
    .catch((err) => {
      console.error('Unable to register service worker.', err);
    });
  }

  componentDidMount() {
    this.registerServiceWorker()
    axios.get('/session')
    .then((response) => this.setState({userId: response.data}, this.getUserData))
    .catch((err) => console.error(err))
  }

  toggleMenu() {
  	this.setState({
  		menuVisible: !this.state.menuVisible
  	})
  }

  signup(userEmail, password) {
    event.preventDefault()
    axios.post('/users', {userEmail: userEmail, password: password})
    .then((response) => {
      this.setState({userId: response.data, userEmail: userEmail})
      this.getUserData()
    })
    .catch((err)=> alert("Invalid email or password"))
  }

  login(userEmail, password) {
    event.preventDefault()
    axios.get('/users', {params: {userEmail: userEmail, password: password}})
    .then((response) => {
      this.setState({userId: response.data, userEmail: userEmail})
      this.getUserData()
    })
    .catch((err) => alert("Invalid email or password"))
  }

  logout() {
    axios.post('/logout')
    .then(() => {
    this.setState({userId: null})
    })
  }

  getUserData() {
    Promise.all([
      axios.get('/phases'),
      axios.get('/applications'),
      axios.get('/reminders'),
      axios.get('/files'),
      axios.get('/notes'),
    ])
    .then((response) => {
      this.setState({
        phases: response[0].data,
        applications: response[1].data,
        reminders: response[2].data,
        files: response[3].data,
        notes: response[4].data
      })
    })
    .catch((err) => console.error(err))
  }

  updateStatus(status) {
    axios.post('/updateStatus', status)
    .then((response) => {
      this.getUserData()
    })
    .catch((err) => console.error(err))
  }

  createPhase(){
    let phaseName = prompt('Enter a phase Name')
    axios.post('/phase',
      {userId: this.state.userId,
       phaseLabel: phaseName,
       phaseOrder: this.state.phases.length + 1
      })
      .then((done) => {
        this.getUserData()
      })
  }

  deletePhase(phaseId){
    if(confirm('Are you sure you want to delete this Phase ?')){
      var firstPhaseId = this.state.phases[0].id
      axios.post('/phases', {phaseId: phaseId, firstPhase: firstPhaseId})
           .then((done) => {
            axios.get('/phases')
                 .then((phases) => {
                  console.log(phases)
                  this.updatePhaseOrder(phases.data)
               })
                 .catch((err) => console.error(err))
           })
           .catch((err) => console.error(err))
    }
  }

  updatePhaseOrder(newPhaseOrder){
    axios.post('/order', { phases: newPhaseOrder })
         .then((done) => this.getUserData())
         .catch((err) => console.error(err))
  }

  decorateProgressBoard() {
    return <ProgressBoard
      phases={this.state.phases}
      apps={this.state.applications}
      reminders={this.state.reminders}
      files={this.state.files}
      updateStatus={this.updateStatus}
      createPhase={this.createPhase}
      deletePhase={this.deletePhase}
      updatePhaseOrder={this.updatePhaseOrder}
    />
  }

  decorateDataVis() {
    return <Metrics
      phases={this.state.phases}
      apps={this.state.applications}
      reminders={this.state.reminders}
      files={this.state.files}
    />
  }

  decorateAppList() {
    return <ApplicationList
      phases={this.state.phases}
      apps={this.state.applications}
      reminders={this.state.reminders}
      files={this.state.files}
      email={this.state.userEmail}
      userId={this.state.userId}
      notes={this.state.notes}
      handleClick={this.getUserData}
    />
  }

  render () {
    if (this.state.userId) {
      return(
        <Router history={history}>
          <div className="app-container">
            <Menu secondary attached="top">
              <Menu.Item onClick={this.toggleMenu}>
              <Icon name="sidebar" /> Seeker
              </Menu.Item>
              <Menu.Item position="right" onClick={this.logout}>
              Log Out
              </Menu.Item>
            </Menu>
            <Sidebar.Pushable as={Segment}>
              <Sidebar
                 as={Menu}
                 animation='slide along'
                 width='thin'
                 visible={this.state.menuVisible}
                 icon='labeled'
                 vertical
                 inverted>
                  <Menu.Item
                     name='home'
                     className="navbutton"
                     as={Link} to='/'
                     onClick={this.toggleMenu}>
                      <Icon name='home' />
                    Home
                  </Menu.Item>
                  <Menu.Item
                    name='metrics'
                    className="navbutton"
                    as={Link} to='/metrics'
                    onClick={this.toggleMenu}>
                      <Icon name='bar chart' />
                    Metrics
                  </Menu.Item>
                  <Menu.Item
                    name='apps'
                    className="navbutton"
                    as={Link} to='/list'
                    onClick={this.toggleMenu}>
                      <Icon name='book' />
                    My Apps
                  </Menu.Item>
                  <DocModal
                    toggle={this.toggleMenu}
                    getUserData={this.getUserData}
                    files= {this.state.files}/>
                  <AppModal
                    toggle={this.toggleMenu}
                    getUserData={this.getUserData}
                    phases={this.state.phases}
                    files={this.state.files}/>
              </Sidebar>
              <Sidebar.Pusher>
                <Switch>
                  <Route  exact path='/' render={this.decorateProgressBoard}/>
                  <Route  path='/metrics' render={this.decorateDataVis}/>
                  <Route  path='/list' render={this.decorateAppList}/>
                </Switch>
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

ReactDOM.render(<App />, document.getElementById('app'))

//is valid token? function?
