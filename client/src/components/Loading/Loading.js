import styles from './Loading.module.scss';
import classNames from 'classnames/bind';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const cx = classNames.bind(styles)

function Loading() {
    return (  
        <div className={cx('wrapper')}>
            <AiOutlineLoading3Quarters className={cx('loading')}/>
        </div>
    );
}

export default Loading;