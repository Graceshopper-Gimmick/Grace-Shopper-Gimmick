import React from 'react'
import { connect } from 'react-redux'
import HomePageItems from './homePageItems'

/**
 * COMPONENT
 */
export const Home = (props) => {
    const { email } = props

    return (
        <div id="Home" style={{ textAlign: 'center' }}>
            <h3
                style={{
                    fontFamily: 'Bitter',
                    backgroundColor: '#767ce8',
                    marginTop: '0',
                    marginBottom: '10px',
                    position: 'relative',
                    color: 'white',
                }}
            >
                Come Get Yer Gimmicks, {email ? email : 'Guest'}!
            </h3>
            <HomePageItems />
        </div>
    )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
    return {
        email: state.auth.email,
    }
}

export default connect(mapState)(Home)
