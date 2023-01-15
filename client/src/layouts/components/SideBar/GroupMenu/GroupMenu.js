import styles from './GroupMenu.module.scss';
import classNames from 'classnames/bind';

import { useSelector } from 'react-redux';

const cx = classNames.bind(styles)

function GroupMenu({ title, children, border_bot = false, className }) {
    
    let toggleMode = useSelector(state => state.toggle_mode) || false

    return (
        <div className={cx("wrapper", {border_bot: border_bot, [className]: className, group_toggle: toggleMode})}>
            <h2>{title}</h2>
            <nav className={cx("menu_list")}>
                {children}
            </nav>
        </div>
    );
}

export default GroupMenu;