import classNames from "classnames/bind";
import styles from "./Account.module.scss";

const cx = classNames.bind(styles)

function MultiPage({ children, className }) {
    return ( 
        <div className={cx('multi_page_renderer', { [className]: className })}>
            { children }
        </div>
    );
}

export default MultiPage;