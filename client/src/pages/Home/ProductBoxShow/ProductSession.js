import styles from './ProductBoxShow.module.scss';
import classNames from 'classnames/bind';
import ItemBox from '../../../components/ItemBox';

const cx = classNames.bind(styles)

function ProductSession({ title ,data = [] }) {

    //const settings = {
        //infinite: true,
        //speed: 500,
        //slidesToShow: data.length <= 5? data.length : 5,
        //slidesToScroll: 1,
        //autoplay: true,
        //useURLhash: true,
        //autoplaySpeed: 6000,
        //swipeToSlide: true,
        //focusOnSelect: true,
        //asNavFor: nav1,
        //prevArrow: <PrevButton/>,
        //nextArrow: <NextButton/>,
        //dots: true
    //};

    return (  
        <div className={cx('hp_wrapper')}>
            <h1 className={cx('title')}>{title}</h1>
            <div className={cx('show')}>
                {data.map((item, index) => <ItemBox key={index} item={item}/>)}
            </div>
        </div>
    );
}

export default ProductSession;
