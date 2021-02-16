import React from 'react'
//console.log('Hello')
import { Navbar,Menu } from './components'
import Routes from './routes'

const App = () => {
    return (
        <div id='App'>
            <Navbar />
            <Routes />
        </div>
    )
}

export default App
