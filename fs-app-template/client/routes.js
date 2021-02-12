import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Login, Signup, Home, Cart} from './components'
import {me} from './store'
import { v4 as uuidv4 } from 'uuid';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    console.log('Routes Component Did Mount')
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    
    isLoggedIn?window.localStorage.removeItem('userId'):window.localStorage.setItem('userId','999')
    //console.log(isLoggedIn)
    //isLoggedIn = true
    //console.log(this.props)
    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/home" />
          </Switch>
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
