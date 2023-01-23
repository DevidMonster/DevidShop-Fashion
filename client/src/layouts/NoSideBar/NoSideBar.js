import styles from './NoSideBar.module.scss';
import classNames from 'classnames/bind';

import Header from '../components/Header';
import Footer from '../components/Footer';

const cx = classNames.bind(styles)

function NoSideBar({ children }) {
    return ( 
        <div className={cx('wrapper')}>
            <Header/>
                {children}
            <Footer/>
        </div>    
    );
}

export default NoSideBar;