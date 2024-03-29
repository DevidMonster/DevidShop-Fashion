import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import images from '../../../asset/images';

import Button from '../../../components/Button/Button';
import { BsYoutube, BsFacebook } from 'react-icons/bs'
import { FaTiktok } from 'react-icons/fa'
import { QRCode } from 'antd';

import { useSelector } from "react-redux";
import MenuGroup from './MenuGroup/MenuGroup';

const cx = classNames.bind(styles)

function Footer() {
    let mode = useSelector(state => state.active) || false
    if (localStorage.getItem('mode')) mode = localStorage.getItem('mode') === "true" ? true : false;
    return (
        <div className={cx("wrapper")}>
            <div className={cx("top")}>
                <div className={cx("info")}>
                    <div className={cx('logo_box')} >
                        <Button text normal className={cx("logo_navigate")} to={"/"}>
                            <img src={mode ? images.logo_white : images.logo} alt="Logo" />
                            <span><h2>DevidShop || Fashion</h2></span>
                        </Button>
                    </div>
                    <p className={cx("contact-list")}>
                        Phone number: <a href='tel:0396.626.650'>0396265650</a><br />Email: <a href='mailto: mrabt905@gmail.com'>mrbat905@gmail.com</a><br />Address: Nhà số 46, Phố Hàng Bồ, Quận Hoàn Kiếm, Thành Phố Hà Nội
                    </p>
                </div>
                <div className={cx('ft_session')}>
                    <MenuGroup title={"Info"} list={[{ title: "What's new", href: "" }, { title: "Term of Use", href: "" }, { title: "Privacy Statement", href: "" }, { title: "Our USP", href: "" }]} />
                    <MenuGroup type='to' title={"Navigate"} list={[{ title: "Home", href: "/" }, { title: "Product", href: "/product" }, { title: "Favorite", href: "/favorite" }, { title: "Contact Us", href: "/contact" }, { title: "About Us", href: "/about" }]} />
                </div>
            </div>
            <div className={cx("bottom")}>
                <p className={cx("copyright")}>
                    © 2022 - 2023 DevidShop. Clothing shopping platform
                </p>
                <div className={cx("hyperlink")}>
                    <div className={cx('QRCode')}>
                        <QRCode
                            errorLevel="H"
                            value="https://quangdang.ml/"
                            icon={mode ? images.logo_white : images.logo}
                        />
                    </div>
                    <div className={cx('icon_nav')}>
                        <a className={cx("yt_link")} href='https://youtube.com' target="_blank" rel="noopener noreferrer">
                            <BsYoutube />
                        </a>
                        <a className={cx("fb_link")} href='https://facebook.com' target="_blank" rel="noopener noreferrer">
                            <BsFacebook />
                        </a>
                        <a className={cx("tt_link")} href='https://tiktok.com' target="_blank" rel="noopener noreferrer">
                            <FaTiktok />
                        </a>
                    </div>
                </div>
            </div>
            <div className={cx("mg_bottom")}>

            </div>
        </div>);
}

export default Footer;