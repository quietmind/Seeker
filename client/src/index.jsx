import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'
import createHistory from 'history/createBrowserHistory';
import ProgressBoard from './components/ProgressBoard.jsx'
import Metrics from './components/Metrics.jsx'
import ApplicationList from './components/ApplicationList.jsx'
import Welcome from './components/Welcome.jsx'
import axios from 'axios';

// const history = createHistory();

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		menuVisible: false,
      user: null,
      phases: [],
      applications: []
  	}

  	this.toggleMenu = this.toggleMenu.bind(this);
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
    this.getUserData = this.getUserData.bind(this)
  }

  toggleMenu(){
  	this.setState({
  		menuVisible: !this.state.menuVisible
  	})
  }
  //======AUTHENTICATION ACTIONS=========
  signup(username, password) {
    axios.post('/users', {username: username, password: password})
      //find something to redirect to login
      .then((response)=> this.setState({user: response.data}))
      .catch((err)=> alert("Please enter a valid username"))
  }

  login(username, password) {
    console.log('loggin in')
    axios.get('/users', {params: {username: username, password: password}})
      //double check what returning value will be
      .then((response) => {
        this.setState({user: response.data})
        this.getUserData()
      })
      .catch((err) => alert("Please enter a valid username"))
  }

  getUserData(){
    axios.get('/phases')
    .then((data) =>  {
      this.setState({phases: data.data}, () =>{
        axios.get('/applications')
        .then((data) =>  this.setState({applications: data.data}, () => console.log('got data', this.state.applications, this.state.phases)))
        .catch((err) => console.error(err))
      }
        )
    })
    .catch((err) => console.error(err))
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
              </Sidebar>
              <Sidebar.Pusher>
                <Route  exact path='/' component={ProgressBoard} onEnter={this.requireAuth}/>
                <Route  path='/metrics' component={Metrics} onEnter={this.requireAuth}/>
                <Route  path='/list' component={ApplicationList} onEnter={this.requireAuth}/>
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
