import styles from './TitleBox.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

const cx = classNames.bind(styles)

function TitleBox({ title, children }) {
    return ( 
        <div  className={cx('wrapper')}>
            <h1 className={cx('title')}>{title}</h1>
            <div className={cx('content')}>
                { children }
            </div>
        </div>
    );
}

export default memo(TitleBox);