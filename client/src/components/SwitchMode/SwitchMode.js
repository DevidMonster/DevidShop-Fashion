import styles from './SwitchMode.module.scss';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from "react-redux";
// import { switchMode } from "../../redux/actions";
import reducers from '../../redux/reducer';
import { screenModeSelector } from '../../redux/selectors';

const cx = classNames.bind(styles)

function SwitchMode() {
    let mode = useSelector(screenModeSelector) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    console.log(mode)
    const dispatch = useDispatch()
    

    const handleSwitch = () => {
        dispatch(reducers.actions.switchMode(mode))
    }

    return ( 
        <div className={cx("mode")}>
            <label htmlFor="switch" className={cx("switch-mode")}>
                <input type="checkbox" id="switch" className={cx("switch-checkbox")} checked={mode} onChange={() => handleSwitch()}/>
                <span className={cx("change_state_mode")}></span>
            </label>
        </div>
    );
}

export default SwitchMode;