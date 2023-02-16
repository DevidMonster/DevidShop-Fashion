import styles from './Favorite.module.scss';
import classNames from "classnames/bind";

import { useEffect, useState } from "react";
import * as request from '../../utils/httpRequest';
import PaginatedItems from "../../components/PaginatedItems";
import { useSelector } from "react-redux";
import { userSelector, willReRender } from "../../redux/selectors";
import Loading from '../../components/Loading';

const cx = classNames.bind(styles)

function Favorite() {
    const user = useSelector(userSelector)
    const reload = useSelector(willReRender)

    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const fetchAPI = async () => {
        setLoading(true)
        const dataResult = await request.get('/item')
        setData(dataResult.filter(item => item.liked.includes(user._id)))
        setLoading(false)
    }

    useEffect(() => {
        console.log('reload')
        fetchAPI()
    }, [reload])

    if(!user) {
        return (
            <div className={cx('pending')}>
                <h1>You need to login to use this page</h1>
            </div>
        )
    }

    if(data.length === 0) {
        return (
            <div className={cx('pending')}>
                <h1>Not Favorite Item Yet</h1>
            </div>
        )
    }

    return (
        loading ? (
            <div className={cx('pending')}>
                <Loading/>
            </div>
        ) : (
            <PaginatedItems itemsPerPage={20} items={data}/>
        )
    );
}

export default Favorite;