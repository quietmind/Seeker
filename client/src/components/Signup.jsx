import React from 'react';
import { Input, Menu, Button } from 'semantic-ui-react';

export default class Signup extends React.Component{
	constructor(props){
		super(props)
		this.state ={
			username: '',
			password: ''
		}
	}

	render(){
		return(
			<div className="signup">
				<Menu.Item>
					<Input placeholder='Username' icon='user' iconPosition='left' value={this.state.username} onChange={(e)=>this.setState({username: e.target.value})}/>
				</Menu.Item>
				<Menu.Item>
					<Input icon='lock' iconPosition='left' placeholder='Password' value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})}/>
				</Menu.Item>
				<Button onClick={() => {
					  this.props.handleClick(this.state.username, this.state.password);
						this.setState({username: '', password: ''})
					}
				}>Sign Up</Button>
			</div>
		)
	}
}
