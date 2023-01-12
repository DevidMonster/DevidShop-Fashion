import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import Tippy from '@tippyjs/react/headless';
import { useDispatch, useSelector } from "react-redux";
import { BsCart2, FaBell, FaUserCircle } from '../../../asset/icons';
import { Wrapper } from "../../../components/popper";
import { switchMode } from "../../../redux/actions";

import images from "../../../asset/images";


import Button from "../../../components/Button/Button";
import Search from "./Search";
import Timer from "./Timer";


const cx = classNames.bind(styles)

function Header() {
    const user = true  //localStorage.getItem("user") || false
    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    const dispatch = useDispatch()
    
    const handleSwitch = () => {
        dispatch(switchMode(mode))
    }

    const renderAlert = (attrs) => (
        <div className={cx('alert-list')} tabIndex="-1" {...attrs}>
            <Wrapper>
            </Wrapper>
        </div>
    );
    
    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper>
                <Button className={cx("fix")} leftIcon={<FaUserCircle />} text to={'/account'}>Tài Khoản</Button> 
            </Wrapper>
        </div>
    );

    return <header className={cx('header_wrapper')}>
        <div className={cx('logo_box')} >
            <Button text normal className={cx("logo_navigate")} to={"/"}>
                <img src={mode ? images.logo_white : images.logo} alt="Logo" />
                <span><h2>DevidShop || Fashion</h2></span>
            </Button>
        </div>
        <Search />
        <div className={cx('action_box')}>
            <Timer/>
            <div className={cx("mode")}>
                <label htmlFor="switch" className={cx("switch-mode")}>
                    <input type="checkbox" id="switch" className={cx("switch-checkbox")} checked={mode} onChange={e => handleSwitch()}/>
                    <span className={cx("change_state_mode")}></span>
                </label>
            </div>
            <div className={cx("cart_view")}>
                <Button icon={<BsCart2/>} to={"/cart"}/>
                <span className={cx("total_item")}>0</span>
            </div>
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
            {user ? (
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
                                <p>DevidMonster</p>
                        </div>
                    </Tippy>
                </div>
            ) : (
                <div className={cx("signIn_signUp")}>
                        <Button outline small>SignIn</Button>
                        <Button small>SignUp</Button>
                </div>
            )}
        </div>  
    </header>;
}

export default Header;