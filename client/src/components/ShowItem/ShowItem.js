import classNames from 'classnames/bind';
import styles from './ShowItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function ShowItem({ data }) {
    return (
        <Link to={`/detail?id=${data._id}`} className={cx('wrapper')}>
            <img className={cx('image')} src={data.images} alt={data.name}/>
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    {data.name}
                </h4>
                <p className={cx('price')}>
                    {data.price}$
                </p>
            </div>
        </Link>
    );
}

export default ShowItem;
