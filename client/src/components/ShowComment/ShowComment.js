import styles from './ShowComment.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as request from '../../utils/httpRequest';

const cx = classNames.bind(styles)

function ShowComment({ reload, id }) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const dataResult = await request.get(`/comment/${id}`)
            dataResult.reverse()
            setData([...dataResult])
        }
        fetchAPI()
    }, [reload, id])

    return (  
        <div className={cx('wrapper')}>
            <div className={cx("product-avg-ratting")}>
                <span>{data.length} Comments</span>
            </div>
            <div className={cx("product-comment-box")}>
                {data.map((item) => (
                    <div key={item._id} className={cx("product-comment-view")}>
                        <div className={cx("product-comment-view-info")}>
                            <div className={cx("product-comment-author")}>
                                <span>{item.name}</span>
                            </div>
                            <div className={cx("product-comment-time")}>
                                <span>{item.createdAt.slice(0, 10)}</span>
                            </div>
                        </div>
                        <p className={cx("product-comment-view-title")}>
                            {item.content}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ShowComment;