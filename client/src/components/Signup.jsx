import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';

export default class Signup extends React.Component{
	constructor(props){
		super(props)
		this.state ={

		}
	}

	render(){
		return(
			<div className="signup">
				<div> This is the Signup </div>
				<Menu.Item>
					<Input placeholder='Username' icon='user' iconPosition='left'/>
				</Menu.Item>
				<Menu.Item>
					<Input icon='lock' iconPosition='left' placeholder='Password' />
				</Menu.Item>
				<Button onClick={this.submit}>Signup</Button>
			</div>
		)
	}
}
