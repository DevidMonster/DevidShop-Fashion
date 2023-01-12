import styles from './Banner.module.scss'
import classNames from 'classnames/bind';

// import { Navigation, Pagination, A11y, Autoplay } from 'swiper';

// import { Swiper, SwiperSlide } from 'swiper/react';

import NextButton from './NextButton'
import PrevButton from './PrevButton'

import Slider  from 'react-slick';

import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

// Import Swiper styles
// import 'swiper/scss';
// import 'swiper/scss/navigation';
// import 'swiper/scss/pagination';
// import 'swiper/scss/a11y';
// import 'swiper/scss/autoplay';


const cx = classNames.bind(styles)

const banners = [
    {
        id: 1,
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        title: 'Thành Quả của Học Viên',
        subTitle: 'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
        btnText: 'Xem thành quả',
        color: `#fe215e`,
        background: `linear-gradient(to right, rgb(254, 33, 94), rgb(255, 148, 2))`
    },
    {
        id: 2,
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        title: 'Thành Quả của Học Viên',
        subTitle: 'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
        btnText: 'Xem thành quả',
        color: `#007efe`,
        background: `linear-gradient(to right, rgb(0, 126, 254), rgb(6, 195, 254))`
    },
    {
        id: 3,
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        title: 'Thành Quả của Học Viên',
        subTitle: 'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
        btnText: 'Xem thành quả',
        color: `#7612ff`,
        background: `linear-gradient(to right, rgb(104, 40, 250), rgb(255, 186, 164))`
    },
    {
        id: 4,
        image: 'https://files.fullstack.edu.vn/f8-prod/banners/Banner_03_youtube.png',
        title: 'Thành Quả của Học Viên',
        subTitle: 'Để đạt được kết quả tốt trong mọi việc ta cần xác định mục tiêu rõ ràng cho việc đó. Học lập trình cũng không là ngoại lệ.',
        btnText: 'Xem thành quả',
        color: `#6828fa`,
        background: `linear-gradient(to right, rgb(40, 119, 250), rgb(103, 23, 205))`
    },
]

function Banner() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: <PrevButton/>,
        nextArrow: <NextButton/>

   
    };
    return (

        <Slider
            {...settings}
        >
            {banners.map((banner, index) => ( 
                <div key={index} >
                    <div className={cx('banner')} style={{ background: banner.background }}>
                        <div className={cx('Slideshow_left')}>
                            <h2 className={cx('Slideshow_heading')}>
                                <a rel="noreferrer noopener noreferrer" target="_blank" href="#">
                                    {banner.title}
                                </a>
                            </h2>
                            <p className={cx('Slideshow_desc')}>{banner.subTitle}</p>
                            <div>
                                <a rel="noreferrer noopener noreferrer" className={cx('Slideshow_ctaBtn')} target="_blank" onMouseOut={e => e.target.style.color = 'white'} onMouseOver={e => e.target.style.color = banner.color} href="#">
                                    {banner.btnText}
                                </a>
                            </div>
                        </div>
                        <div className={cx('Slideshow_right')}>
                            <a rel="noreferrer noopener noreferrer" target="_blank" href="#" >
                                <img className={cx('Slideshow_img')} src={banner.image} alt={banner.title}/>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    )
    ;
}

export default Banner;