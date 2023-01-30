import styles from './BoxContent.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function BoxContent() {
    const navigate = useNavigate()

    return ( 
        <div className={cx("wrapper", { menu_toggle: true })}>
            <div className={cx("content_box")}>
                <p className={cx('title')}>
                    50% off all orders now
                </p>
                <button className={cx("action")} onClick={() => navigate("/login")}>Register now</button>
            </div>
        </div>
    );
}

export default BoxContent;