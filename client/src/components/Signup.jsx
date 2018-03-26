import React from 'react'
import { Button, Input, Form } from 'semantic-ui-react'

export default class Signup extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			userEmail: '',
			password: ''
		}
	}

	render(){
		return(
			<div className="signup">
				<Form>
					<Form.Field>
						<Input 
						  placeholder='Email' 
						  icon='user' 
						  iconPosition='left' 
						  value={this.state.userEmail} 
						  onChange={(e)=>this.setState({userEmail: e.target.value})}/>
					</Form.Field>
					<Form.Field>
						<Input 
							icon='lock' 
							iconPosition='left' 
						  placeholder='Password' 
						  value={this.state.password} 
						  onChange={(e)=>this.setState({password: e.target.value})}/>
					</Form.Field>
					<Button type="submit" onClick={() => {
							this.props.handleClick(this.state.userEmail, this.state.password);
							this.setState({userEmail: '', password: ''})

						}}>Sign Up
					</Button>
				</Form>
			</div>
		)
	}
}
