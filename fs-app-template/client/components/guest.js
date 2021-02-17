import React from 'react'
import { connect } from 'react-redux'

class Guest extends React.Component {
    // componentDidMount() {
    //     this.props.getCartItems()
    // }

    // constructor(props) {
    //     super(props)
    // }

    // TODO : MAKE SURE CART COMPONENT RENDERS ON REFRESH

    render() {
        return (
            <div>
                <h1>Welcome Guest!!</h1>
                <button id='guestbutton' onClick={()=>{window.localStorage.setItem('user','guest')}}><a href='/home'>Continue as Guest</a></button>
                <button><a href='/signup'>Sign Up</a></button>
                <button><a href='login'>Login</a></button>
            </div>
        )
    }
}

const mapState = (state) => state

// const mapDispatch = (dispatch) => {
//     return {
//         getCartItems: () => dispatch(getCartItems()),
//         deleteCartItem: (id) => dispatch(deleteCartItem(id)),
//     }
// }

export default connect(mapState)(Guest)

