import styles from './ProductBoxShow.module.scss';
import classNames from 'classnames/bind';
import ItemBox from '../../../components/ItemBox';

import ResizeDetector from 'react-resize-detector';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import PrevButton from '../../../components/Slick/PrevButton';
import NextButton from '../../../components/Slick/NextButton';

const cx = classNames.bind(styles)

function ProductSession({ title ,data = [] }) {
    const [type, setType] = useState('flex')
    const settings = {
        slidesToShow: 1,
        slidesToScroll: 1,
        focusOnSelect: true,
        prevArrow: <PrevButton/>,
        nextArrow: <NextButton/>
    };

    useEffect(() => {
        if(window.innerWidth > 660) {
            setType('flex')
        }
    }, [])

    const handleCheckResize = () => {
        if(window.innerWidth <= 660) {
            console.log(window.innerWidth)
            setType('slide')
        } else {
            setType('flex')
        }
    }

    return (  
        <div className={cx('hp_wrapper')}>
            <ResizeDetector handleWidth onResize={handleCheckResize}/>
            <h1 className={cx('title')}>{title}</h1>      
            {type === 'flex'? 
                (
                    <div className={cx('show')}>
                        {data.length === 0 ? (<ItemBox pending={true}/>) : (data.map((item, index) => <ItemBox key={index} item={item}/>))}
                    </div>
                )
                    : 
                (
                    <Slider {...settings}>
                        {data.length === 0 ? (<ItemBox pending={true}/>) : (data.map((item, index) => <ItemBox key={index} item={item}/>))}
                    </Slider>
                )
            }
        </div>
    );
}

export default ProductSession;
