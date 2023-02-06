import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import PaginatedItems from '../../components/PaginatedItems/PaginatedItems';
import * as request from '../../utils/httpRequest';
import { setCateGorySelected } from '../../redux/selectors';

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import CategoryHeader from './CategoryHeader';
import Loading from '../../components/Loading';

const cx = classNames.bind(styles)

function Product() {
    const cate = useSelector(setCateGorySelected)

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchAPI= async () => {
            if(cate.name === "All") {
                const dataResult = await request.get("/item")
                setData(dataResult)
            } else {
                const dataResult = await request.get("/item/cate", {
                    params: {
                        id: cate._id
                    }
                })
                setData(dataResult)
            }
            setLoading(false)
        }
        fetchAPI()
    }, [cate])
    console.log(loading)
    if(loading) {
        return (
            <div className={cx('pending')}>
                <Loading/>
            </div>
        )
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_scroll')}>
                <CategoryHeader/>
            </div>
            <PaginatedItems itemsPerPage={21} items={data}/>
        </div>
    );
}

export default Product;