import styles from './Blog.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function Blog() {
    return (  
        <div className={cx('wrapper')}>
            <h1 style={{ display: "block" ,fontSize: "3rem", textAlign: "center", padding: "50px 0", color: "var(--text-color)" }}>Coming soon</h1>
        </div>
    );
}

export default Blog;