import styles from './ProductBoxShow.module.scss';
import classNames from 'classnames/bind';
import ItemBox from '../../../components/ItemBox';

const cx = classNames.bind(styles)

function HotProduct({ data = [] }) {
    return (  
        <div className={cx('hp_wrapper')}>
            <h1 className={cx('title')}>Hot Item</h1>
            <div className={cx('show')}>
                {data.map((item, index) => <ItemBox key={index} item={item}/>)}
            </div>
        </div>
    );
}

export default HotProduct;