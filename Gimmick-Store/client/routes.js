import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch, Redirect } from 'react-router-dom'
import {
    Login,
    Signup,
    Home,
    Cart,
    Checkout,
    SingleProduct,
    Guest,
    UserHistory,
    EditProfile
} from './components'
import AdminView from './components/AdminView'
import { me } from './store'
import UpdateProduct from './components/UpdateProduct'

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        console.log('Routes Component Did Mount')
        this.props.loadInitialData()
    }

    render() {
        const { isLoggedIn } = this.props

        return (
            <div id="Routes">
                {isLoggedIn ? (
                    <Switch>
                        <Route exact path="/admin" component={AdminView} />
                        <Route
                            path="/admin/update/:id"
                            component={UpdateProduct}
                        />
                        <Route exact path="/Purchases" component={UserHistory} />
                        <Route exact path="/Profile" component={EditProfile} />
                        <Route exact path="/home" component={Home} />
                        <Route path="/home/:id" component={SingleProduct} />
                        <Route exact path="/cart" component={Cart} />
                        <Route path="/checkout" component={Checkout} />
                        <Redirect to="/home" />
                    </Switch>
                ) : (
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route path="/home/:id" component={SingleProduct} />
                        <Route path="/cart" component={Cart} />
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/checkout" component={Checkout} />
                        <Route exact path="/guest" component={Guest} />
                        <Redirect to="/guest" />                        
                    </Switch>
                )}
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
        // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
        isLoggedIn: !!state.auth.id,
    }
}

const mapDispatch = (dispatch) => {
    return {
        loadInitialData() {
            dispatch(me())
        },
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))
