import React from 'react';
import { Button, Input, Form } from 'semantic-ui-react';

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
				<Form>
					<Form.Field>
						<Input placeholder='Username' icon='user' iconPosition='left' value={this.state.username} onChange={(e)=>this.setState({username: e.target.value})}/>
					</Form.Field>
					<Form.Field>
						<Input icon='lock' iconPosition='left' placeholder='Password' value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})}/>
					</Form.Field>
					<Button type="submit" onClick={() => {
							this.props.handleClick(this.state.username, this.state.password);
							this.setState({username: '', password: ''})
						}}>Sign Up
					</Button>
				</Form>
			</div>
		)
	}
}
