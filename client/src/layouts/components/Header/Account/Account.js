import classNames from "classnames/bind";
import styles from "./Account.module.scss";

import Tippy from '@tippyjs/react/headless';

import { useSelector } from "react-redux";
import { Wrapper } from "../../../../components/popper";
import { FaUserCircle, AiOutlineRight } from '../../../../asset/icons';
import images from "../../../../asset/images";
import Button from "../../../../components/Button";
import MultiPage from "./MultiPage";
import { Link } from "react-router-dom";
import SwitchMode from "../../../../components/SwitchMode";

const cx = classNames.bind(styles)

function Account() {
    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper>
                <Link to={'/account'} className={cx('account_nav')}>
                    <div className={cx("avatar")}>
                        <img src={images.user} alt="User_Avatar"/>
                    </div>
                    <div className={cx('User_Name')}>
                        <h3>DevidMonster</h3>
                        <AiOutlineRight className={cx('arrow_right')}/>
                        <span>Account setting</span>
                    </div>
                </Link>
                <MultiPage>
                    <Button className={cx("fix")} leftIcon={<FaUserCircle />} text to={'/account'}>Tài Khoản</Button> 
                </MultiPage>
                <MultiPage className={cx('showed_group')}>
                    <Button className={cx("fix")} leftIcon={<SwitchMode />} text>Dark mode</Button> 
                </MultiPage>
            </Wrapper>
        </div>
    );

    return ( 
        <div>
            <Tippy
                interactive
                hideOnClick
                theme={mode ? 'light' : 'material'}
                trigger="click"
                placement="bottom-end"
                render={(attrs) => renderResult(attrs)}
            >
                <div className={cx("account")}>
                        <div className={cx("avatar")}>
                            <img src={images.user} alt="User_Avatar"/>
                        </div>
                        <h3>DevidMonster</h3>
                </div>
            </Tippy>
        </div>
    );
}

export default Account;