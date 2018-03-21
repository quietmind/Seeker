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
	}

  componentDidMount(){
    dragula(Array.from(document.getElementsByClassName('phase')))
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