import styles from './BoxContent.module.scss';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import reducers from '../../../../redux/reducer';

const cx = classNames.bind(styles)

function BoxContent({ active = false}) {
    const dispatch = useDispatch()

    return ( 
        <div className={cx("wrapper", { menu_toggle: active })}>
            <div className={cx("content_box")}>
                <p className={cx('title')}>
                    50% off all orders now
                </p>
                <button className={cx("action")} onClick={() => dispatch(reducers.actions.toggleModel({ bool: true, type: "login"}))}>Register now</button>
            </div>
        </div>
    );
}

export default BoxContent;