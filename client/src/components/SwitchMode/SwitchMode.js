import styles from './SwitchMode.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from "react-redux";
// import { switchMode } from "../../redux/actions";
import reducers from '../../redux/reducer';

const cx = classNames.bind(styles)

function SwitchMode() {
    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    const dispatch = useDispatch()
    

    const handleSwitch = () => {
        dispatch(reducers.actions.switchMode(mode))
    }

    return ( 
        <div className={cx("mode")}>
            <label htmlFor="switch" className={cx("switch-mode")}>
                <input type="checkbox" id="switch" className={cx("switch-checkbox")} checked={mode} onChange={e => handleSwitch()}/>
                <span className={cx("change_state_mode")}></span>
            </label>
        </div>
    );
}

export default SwitchMode;