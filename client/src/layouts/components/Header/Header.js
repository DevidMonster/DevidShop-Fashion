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
import AccountFormBox from "../../../components/AccountFormBox";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { menuToggle } from "../../../redux/actions";
import reducers from "../../../redux/reducer";
import { screenModeSelector, toggleSideBarSelector, userSelector } from "../../../redux/selectors";

const cx = classNames.bind(styles)

function Header({ isSideBar = true }) {
    const [hasLogin, setHasLogin] = useState(false)
    let mode = useSelector(screenModeSelector) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    
    let toggleMode = useSelector(toggleSideBarSelector)
    
    let user = useSelector(userSelector)
    if(localStorage.getItem("user")) user = JSON.parse(localStorage.getItem("user"))
    
    const dispatch = useDispatch()

    const toggleClass = () => {
        search.current.classList.toggle(cx("show_search_box"))
    }

    const handleToggleMenu = () => {
        dispatch(reducers.actions.menuToggle(toggleMode))
    }
    
    const search = useRef()

    useEffect(() => {
        if(user) {
            setHasLogin(true)
        } else {
            setHasLogin(false)
        }
    }, [user])
    return <header className={cx('header_wrapper')}>
        {isSideBar && (            
            <div className={cx("menu_toggle")} onClick={handleToggleMenu}>
                <AiOutlineMenu/>
            </div>
        )}
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
            {hasLogin ? (
                <>
                    <Notification/>
                    <Account/>
                </>
            ) : (
                <AccountFormBox/>
            )}
        </div>  
    </header>;
}

export default Header;