import React from 'react'
//console.log('Hello')
import { Navbar, Menu } from './components'
import FooterPage from './components/FooterPage'
import Routes from './routes'

const App = () => {
    return (
        <div id="App">
            <Navbar />
            <Routes />
            <FooterPage />
        </div>
    )
}

export default App
