import classNames from 'classnames/bind';
import styles from './ShowHistory.module.scss';
import { Link } from 'react-router-dom';
import { BiTimeFive, MdOutlineCancel } from '../../asset/icons';
import { deleteSearch } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function ShowHistory({ index , data }) {
    const dispatch = useDispatch()

    const handleDelete = () => {
        dispatch(deleteSearch(index))    
    }

    return (
        <div className={cx('wrapper')}>
            <Link to={`/product/${data}`} className={cx('search-box')}>
                <span className={cx('icon')}>
                    <BiTimeFive/>
                </span>
                <div className={cx('title-search')}>
                    <p className={cx('text')}>
                        {data}
                    </p>
                </div>
            </Link>
            <span className={cx('icon', 'delete-btn')} onClick={() => handleDelete()}>
                    <MdOutlineCancel/>
            </span>
        </div>

    );
}

export default ShowHistory;
