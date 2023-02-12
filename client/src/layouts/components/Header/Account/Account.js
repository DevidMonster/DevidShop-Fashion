import classNames from "classnames/bind";
import styles from "./Account.module.scss";

import Tippy from '@tippyjs/react/headless';

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Wrapper } from "../../../../components/popper";
import { FaUserCircle, AiOutlineRight, CgLogOut } from '../../../../asset/icons';
import images from "../../../../asset/images";
import Button from "../../../../components/Button";
import MultiPage from "./MultiPage";
import SwitchMode from "../../../../components/SwitchMode";
import { screenModeSelector, userSelector } from "../../../../redux/selectors";
import reducers from "../../../../redux/reducer";

const cx = classNames.bind(styles)

function Account() {
    let mode = useSelector(screenModeSelector)
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;

    let user = useSelector(userSelector)
    if(localStorage.getItem("user")) user = JSON.parse(localStorage.getItem("user"))
    
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(reducers.actions.logout())
    }

    const renderResult = (attrs) => (


        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <Wrapper>
                <Link to={'/account'} className={cx('account_nav')}>
                    <div className={cx("avatar")}>
                        {user.avatar ?
                            <img src={user.avatar} alt={user.name}/> 
                                :
                            <img src={images.user} alt="User_Avatar"/>
                        }
                    </div>
                    <div className={cx('User_Name')}>
                        <h3>{user.name}</h3>
                        <AiOutlineRight className={cx('arrow_right')}/>
                        <span>Account setting</span>
                    </div>
                </Link>
                <MultiPage>
                    <Button className={cx("fix")} leftIcon={<FaUserCircle />} text to={'/account'}>Your Account</Button> 
                    <Button className={cx("fix", "showed_group")} leftIcon={<SwitchMode />} text>Dark mode</Button> 
                </MultiPage>
                <MultiPage>
                    <Button className={cx("fix")} leftIcon={<CgLogOut />} text onClick={handleLogout}>LogOut</Button> 
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
                            {user.avatar ?
                                <img src={user.avatar} alt={user.name}/> 
                                    :
                                <img src={images.user} alt="User_Avatar"/>
                            }
                        </div>
                        <h3>{user.name}</h3>
                </div>
            </Tippy>
        </div>
    );
}

export default Account;