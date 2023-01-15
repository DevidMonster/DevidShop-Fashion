import classNames from "classnames/bind";
import styles from "./Header.module.scss";

import { BsSearch, AiOutlineLeft,AiOutlineMenu } from "../../../asset/icons"
import images from "../../../asset/images";

import Button from "../../../components/Button";
import Search from "./Search";
import Timer from "../../../components/Timer";
import Account from "./Account";
import Notification from "./Notification";
import SwitchMode from "../../../components/SwitchMode";
import CartAlert from "./CartAlert";

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../../redux/actions";

const cx = classNames.bind(styles)

function Header() {
    const user = true  //localStorage.getItem("user") || false
    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    
    let toggleMode = useSelector(state => state.toggle_mode) || false

    const dispatch = useDispatch()

    const toggleClass = () => {
        console.log(1)
        search.current.classList.toggle(cx("show_search_box"))
    }

    const handleToggleMenu = () => {
        dispatch(menuToggle(toggleMode))
    }
    
    const search = useRef()


    return <header className={cx('header_wrapper')}>
        <div className={cx("menu_toggle")} onClick={handleToggleMenu}>
            <AiOutlineMenu/>
        </div>
        <div className={cx('logo_box')} >
            <Button text normal className={cx("logo_navigate")} to={"/"}>
                <img src={mode ? images.logo_white : images.logo} alt="Logo" />
                <span className={cx('logo_title')}><h2>DevidShop || Fashion</h2></span>
            </Button>
        </div>
        <div className={cx('box_search_popup')} ref={search}>
            <Button className={cx('close_search')} icon={<AiOutlineLeft/>} onClick={toggleClass}/>
            <div  className={cx('search_popup')}>
                <Search/>
            </div>
        </div>
        <div className={cx("btn_search")}>
            <Button icon={<BsSearch />} onClick={toggleClass}/>
        </div>
        <div className={cx('action_box')}>
            <Timer/>
            <div className={cx('theme_action')}>
                <SwitchMode/>
            </div>
            <CartAlert/>
            <Notification/>
            {user ? (
                <Account/>
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