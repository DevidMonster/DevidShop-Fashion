import styles from './CTA.module.scss';
import classNames from 'classnames/bind';

import Button from '../Button';

const cx = classNames.bind(styles)

function CTA({ url, title, to }) {
    return (  
        <div className={cx('wrapper')} style={{ backgroundImage: `url(${url})` }}>
            <div className={cx('content')}>
                <h3>{title}</h3>
                <Button outline round to={to}>See now</Button>
            </div>
        </div>
    );
}

export default CTA;


