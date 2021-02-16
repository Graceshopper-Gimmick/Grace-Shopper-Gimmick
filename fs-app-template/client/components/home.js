import React from 'react'
import {connect} from 'react-redux'
import HomePageItems from './homePageItems'

/**
 * COMPONENT
 */
export const Home = props => {
  const {email} = props

  return (
    <div id='Home'>
      <h3>Welcome, {email?email:'Guest'}!</h3>
      <HomePageItems/>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.auth.email
  }
}

export default connect(mapState)(Home)
