import styles from './Home.module.scss'
import classNames from 'classnames/bind';

import Banner from './Banner';
import ProductBoxShow from './ProductBoxShow';

const cx = classNames.bind(styles)

function Home() {
    return <div className={cx('wrapper')}>
        <div className={cx('banner_box')}>
            <Banner/>
        </div>
        <div>
            <ProductBoxShow/>
        </div>
    </div>;
}

export default Home;