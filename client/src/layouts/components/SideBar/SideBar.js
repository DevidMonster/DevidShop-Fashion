import styles from './SideBar.module.scss';
import classNames from 'classnames/bind';

import { useSelector } from 'react-redux';
import { toggleSideBarSelector } from '../../../redux/selectors';
import GroupMenu, { MenuItem } from './GroupMenu';
import BoxContent from './BoxContent';

import { AiFillHome, AiFillPhone, FaTshirt, BiNews, HiUserGroup, TbShoppingCartDiscount, MdOutlineFavoriteBorder, MdOndemandVideo } from '../../../asset/icons';

const cx = classNames.bind(styles)

function SideBar() {

    let toggleMode = useSelector(toggleSideBarSelector)
   
    return (
        <aside className={cx("sidebar_menu", { sidebar_menu_toggle: toggleMode })}>
            <div className={cx("sidebar_wrapper")}>
                <GroupMenu title={"Page"} border_bot>
                    <MenuItem to={"/"} icon={<AiFillHome />} title={"Home"}/>
                    <MenuItem to={"/product"} icon={<FaTshirt />} title={"Product"}/>
                </GroupMenu>
                <GroupMenu title={"Community"} border_bot>
                    <MenuItem to={"/about"} icon={<HiUserGroup />} title={"About Us"}/>
                    <MenuItem to={"/blog"} icon={<BiNews />} title={"Blog"}/>
                    <MenuItem to={"/contact"} icon={<AiFillPhone />} title={"Contact"}/>
                </GroupMenu>
                <GroupMenu className={cx("sidebar_subnav")}>
                    <MenuItem to={"/sale"} icon={<TbShoppingCartDiscount />} title={"Sale code"}/>
                    <MenuItem to={"/favorite"} icon={<MdOutlineFavoriteBorder />} title={"Favorite"}/>
                    <BoxContent/>
                    <MenuItem to={"/film"} icon={<MdOndemandVideo />} title={"Short Film"}/>
                </GroupMenu>
            </div>
        </aside>
    );
}

export default SideBar;