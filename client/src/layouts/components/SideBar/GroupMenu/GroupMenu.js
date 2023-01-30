import styles from './GroupMenu.module.scss';
import classNames from 'classnames/bind';

import { useSelector } from 'react-redux';
import { toggleSideBarSelector } from '../../../../redux/selectors';

const cx = classNames.bind(styles)

function GroupMenu({ title, children, border_bot = false, className }) {
    
    let toggleMode = useSelector(toggleSideBarSelector)

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