import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import { Sidebar, Segment, Button, Menu, Image, Icon, Header} from 'semantic-ui-react'


class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
  		menuVisible: false
  	}

  	this.toggleMenu = this.toggleMenu.bind(this)
  }

  toggleMenu(){
  	this.setState({
  		menuVisible: !this.state.menuVisible
  	})
  }

  render () {
  	return(
  		<div className="app-container">
  		<Menu secondary attached="top">
  			<Menu.Item onClick={this.toggleMenu}>
  			<Icon name="sidebar" /> Menu
  			</Menu.Item>
  		</Menu>
  		 <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} animation='slide along' width='very wide' visible={this.state.menuVisible} icon='labeled' vertical inverted>
            <Menu.Item name='home'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item name='metrics'>
              <Icon name='bar chart' />
              Metrics
            </Menu.Item>
            <Menu.Item name='camera'>
              <Icon name='book' />
              My Apps
            </Menu.Item>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
  		</div>
  	)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));


