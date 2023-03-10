import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

import { useDispatch, useSelector } from "react-redux";
// import { menuToggle } from "../../redux/actions";
import reducers from "../../redux/reducer";
import { toggleSideBarSelector } from "../../redux/selectors";

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {

    let toggleMode = useSelector(toggleSideBarSelector) || false
    const dispatch = useDispatch()

    const handleColseMenu = () => {
        dispatch(reducers.actions.menuToggle(toggleMode))
    }

    return (      
        <div>
            <Header/>
            <div className={cx("content_wrapper")}>
                <div className={cx(!toggleMode === true ? 'background-sideBar' : 'none')} onClick={handleColseMenu}></div>
                <SideBar/>
                <div className={cx("main_container")}>
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;