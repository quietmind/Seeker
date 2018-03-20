import React from 'react'
import dragula from 'react-dragula'
import Phase from './Phase.jsx'
import axios from 'axios'

export default class ProgressBoard extends React.Component{
	constructor(props){
		super(props)
		this.state ={
      phases: []
		}
    this.getPhases = this.getPhases.bind(this)
	}

  componentDidMount(){
    dragula(Array.from(document.getElementsByClassName('phase')))
    this.getPhases()
  }

  getPhases(){
    console.log('triggered')
    axios.get('/phases')
         .then((data) =>{
          console.log(data)
          this.setState({
            phases: data.data
          },() => console.log(this.state.phases))
         })
  }

	render(){
		return(
			<div className="progressboard-container">
        <Phase title={'Wishlist'}/><Phase title={'Applied'}/>
        <Phase title={'Interview'}/><Phase title={'Offer'}/>
        <Phase title={'Reject'}/>
      </div>
		)
	}
}