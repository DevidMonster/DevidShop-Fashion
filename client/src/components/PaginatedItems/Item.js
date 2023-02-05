import styles from './PaginatedItems.module.scss';
import classNames from 'classnames/bind';
import ItemBox from '../ItemBox';

const cx = classNames.bind(styles)

function Item({ currentItems = [] }) {
    return (  
        <div className={cx('s_wrapper')}>
            {currentItems.length > 0 ? 
                (currentItems.map(item => (<ItemBox key={item._id} item={item}/>)))
                :
                (<ItemBox pending/>)
            }
        </div>
    );
}

export default Item;