import styles from './Article.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function Article({ src, title, children }) {
    return (  
        <div className={cx('wrapper')}>
            <img src={src}/>
            <h1>{title}</h1>
            <div>
                <p dangerouslySetInnerHTML={{ __html: children}}></p>
            </div>
        </div>
    );
}

export default Article;