import React from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact'

const FooterPage = () => {
    return (
        <MDBFooter color="blue" className="font-small pt-4 mt-4">
            <div className="footer-copyright text-center py-3">
                <MDBContainer
                    fluid
                    style={{
                        justifyContent: 'center',
                        width: '100vw',
                        display: 'flex',
                    }}
                >
                    &copy; {new Date().getFullYear()} Copyright:{' '}
                    <a href="https://grace-shopper-gimmicks.herokuapp.com/home">
                        {' '}
                        grace-shopper-gimmicks.herokuapp.com{' '}
                    </a>
                </MDBContainer>
            </div>
        </MDBFooter>
    )
}

export default FooterPage
