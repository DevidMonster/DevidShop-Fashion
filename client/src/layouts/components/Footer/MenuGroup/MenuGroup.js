import styles from './MenuGroup.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles)

function MenuGroup({ type = "href", title, list = [] }) {
    return (  
        <div className={cx('wrapper')}>
            <h1>{title}</h1>
            <ul className={cx('list')}>
                {list.map(item => (
                    <li>
                        {type === "href" ? (
                            <a href={item.href} onClick={e => e.preventDefault()}>{item.title}</a>
                        ) : (
                            <Link to={item.href}>{item.title}</Link>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MenuGroup;