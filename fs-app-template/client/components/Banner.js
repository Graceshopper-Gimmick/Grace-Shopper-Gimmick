import React, { Component } from 'react'
import Slider from 'react-slick'

export default class AutoPlay extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            cssEase: 'linear',
        }
        return (
            <div className="banner">
                <Slider {...settings} className="slider">
                    <div>
                        <h3 style={{ textAlign: 'center' }}>
                            So I heard you're getting another stimulus check...
                        </h3>
                    </div>
                    <div>
                        <h3>You know what you should spend that money on?</h3>
                    </div>
                    <div>
                        <h3>Stupid Sh*t.</h3>
                    </div>
                    <div>
                        <h3>For you, your friends, and family! </h3>
                    </div>
                    <div>
                        <h3>ʕ•́ᴥ•̀ʔっ♡ Spread a Smile! ʕ•́ᴥ•̀ʔっ♡</h3>
                    </div>
                </Slider>
            </div>
        )
    }
}
