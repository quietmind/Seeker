import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';

export default class Login extends React.Component{
	constructor(props){
		super(props)
		this.state ={

		}
	}

	render(){
		return(
			<div className="login">
				<div> This is the Login </div>
				<Menu.Item>
					<Input placeholder='Username' icon='user' iconPosition='left'/>
				</Menu.Item>
				<Menu.Item>
					<Input icon='lock' iconPosition='left' placeholder='Password' />
				</Menu.Item>
				<Button onClick={this.submit}>Login</Button>
			</div>
		)
	}
}
