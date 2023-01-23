import styles from './ImageSilde.module.scss'
import classNames from 'classnames/bind';
import PrevButton from '../../../components/Slick/PrevButton';
import NextButton from '../../../components/Slick/NextButton';

import Slider from 'react-slick';
import { useState } from 'react';


import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

const cx = classNames.bind(styles)

function ImageSilde({ data = [] }) {

    const [nav1, setNav1] = useState();
    const [nav2, setNav2] = useState();

    //let initWidth = ((20/100) *35/100) * window.innerWidth 
    let initWidth = (20/100) * 475

    if(data.length >= 1 && data.length <= 5) {
        initWidth *= data.length 
    } else if (data.length > 5) {
        initWidth = 475
    }


    const settings = {
        prevArrow: <PrevButton/>,
        nextArrow: <NextButton/>,
        asNavFor: nav2
    };

    const settingSubs = {
        infinite: true,
        speed: 500,
        slidesToShow: data.length <= 5? data.length : 5,
        slidesToScroll: 1,
        autoplay: true,
        useURLhash: true,
        autoplaySpeed: 6000,
        swipeToSlide: true,
        focusOnSelect: true,
        asNavFor: nav1
    };

    return (
        <div className={cx('image_slideShow')}>
            <div className={cx('slide_top')}>
                <Slider {...settings} ref={(slider1) => setNav1(slider1)}>
                    {data.map((pic, index) => (
                        <div className={cx('main_image')} key={index}>
                            <img src={pic}/>
                        </div>
                    ))}
                </Slider>
            </div> 
            <div  className={cx('slide_bot')} style={{ width: initWidth + 'px' }}>
                <Slider {...settingSubs} ref={(slider2) => setNav2(slider2)} >
                    {data.map((pic, index) => (
                        <div className={cx('sub_image')} key={index}>
                            <img src={pic}/>
                        </div>
                    ))}
                </Slider>
           </div>
            
        </div>
    );
}

export default ImageSilde;