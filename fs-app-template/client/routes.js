import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import SingleProduct from './components/SingleProduct'
import {Login, Signup, Home, Cart} from './components'
import AdminView from './components/AdminView'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    //console.log('Routes Component Did Mount')
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    console.log(isLoggedIn)
    //isLoggedIn = true
    //console.log(this.props)
    

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/home/:id" component={SingleProduct} />
            <Route path="/home" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/admin" component={AdminView} />
            <Redirect to="/home" />            
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route path="/home/:id" component={SingleProduct} />
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
