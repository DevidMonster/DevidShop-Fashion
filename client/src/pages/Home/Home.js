import styles from './Home.module.scss'
import classNames from 'classnames/bind';
import Banner from './Banner';

const cx = classNames.bind(styles)

function Home() {
    return <div className={cx('wrapper')}>
        <div className={cx('banner_box')}>
            <Banner/>
        </div>
    </div>;
}

export default Home;