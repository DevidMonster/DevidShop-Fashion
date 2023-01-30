import { NavLink } from "react-router-dom";
import styles from './GroupMenu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function MenuItem({ to, icon, activeIcon, title }) {
    
    return (
        <NavLink className={(nav) => cx('menu-item', { active: nav.isActive })} to={to}>
            <span className={cx('icon')}>{icon}</span>
            <span className={cx('menu-title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;