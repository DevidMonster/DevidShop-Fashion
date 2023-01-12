import styles from './GroupMenu.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function GroupMenu({ title, children, border_bot = false, className }) {
    return (
        <div className={cx("wrapper", {border_bot: border_bot, [className]: className})}>
            <h2>{title}</h2>
            <nav className={cx("menu_list")}>
                {children}
            </nav>
        </div>
    );
}

export default GroupMenu;