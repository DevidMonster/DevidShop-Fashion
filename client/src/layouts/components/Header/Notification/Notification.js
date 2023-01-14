import styles from './Notification.module.scss';
import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';
import { useSelector } from "react-redux";
import { Wrapper } from "../../../../components/popper";
import { FaBell } from '../../../../asset/icons';
import Button from "../../../../components/Button";

const cx = classNames.bind(styles)

function Notification() {
    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;

    const renderAlert = (attrs) => (
        <div className={cx('alert-list')} tabIndex="-1" {...attrs}>
            <Wrapper>
            </Wrapper>
        </div>
    );

    return ( 
        <div>
            <div className={cx("notification")}>
                <div>
                    <Tippy
                        interactive
                        hideOnClick
                        theme={mode ? 'light' : 'material'}
                        trigger="click"
                        placement="bottom-end"
                        render={(attrs) => renderAlert(attrs)}
                    >
                            <div><Button icon={<FaBell />} /></div>
                    </Tippy>
                </div>
                <span className={cx("total_alert")}>0</span>
            </div>
        </div>
    );
}

export default Notification;