import styles from './BoxContent.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import reducers from '../../../../redux/reducer';
import { userSelector } from '../../../../redux/selectors';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function BoxContent({ active = false}) {
    const dispatch = useDispatch()
    const user = useSelector(userSelector)

    const navigate = useNavigate()
    
    const handelOnclick = () => {
        if(user) {
            navigate('/sale')
        } else {
            dispatch(reducers.actions.toggleModel({ bool: true, type: "login"}))
        }
    }

    return ( 
        <div className={cx("wrapper", { menu_toggle: active })}>
            <div className={cx("content_box")}>
                <p className={cx('title')}>
                    50% off all orders now
                </p>
                <button className={cx("action")} onClick={handelOnclick}>{user? 'Get now' : 'Register now'}</button>
            </div>
        </div>
    );
}

export default BoxContent;