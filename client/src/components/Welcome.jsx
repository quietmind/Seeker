import React from 'react';
import { BrowserRouter as Router, Route, Link, BrowserHistory } from 'react-router-dom';
import { Button, Menu, Header, Segment} from 'semantic-ui-react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default class Welcome extends React.Component{
	constructor(props){
		super(props)

	}

  render() {
    return (
      <Router>
      <div className = "welcome">
        <Header as='h2' textAlign='center'>
          Welcome to Seeker
        </Header>
        <Button.Group color = 'teal' attached='top' textAlign='center'>
          <Button color='teal' style={{ maxWidth: 350, margin:10 }} as={Link} to='/signup'>Signup</Button>
          <Button color='teal' style={{ maxWidth: 350, margin:10 }} as={Link} to='/login'>Login</Button>
        </Button.Group>
          <Route  path='/login'
						render = {(props) => <Login {...props} handleClick={this.props.login }/> } />
					<Route  path='/signup'
						render = {(props) => <Signup {...props} handleClick={this.props.signup }/> }  />
      </div>
      </Router>
    )
  }

}
