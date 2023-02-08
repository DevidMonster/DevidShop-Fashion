import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import PaginatedItems from '../../components/PaginatedItems/PaginatedItems';
import * as request from '../../utils/httpRequest';
import { setCateGorySelected } from '../../redux/selectors';
import reducers from '../../redux/reducer';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, memo } from 'react';

import CategoryHeader from './CategoryHeader';
import Loading from '../../components/Loading';
import Filter from './Filter';

const cx = classNames.bind(styles)

function Product() {
    const cate = useSelector(setCateGorySelected)
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchAPI= async () => {
        setLoading(true)  
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

    useEffect(() => {
        fetchAPI()
        return () => {
            dispatch(reducers.actions.selectFilter({
                id: 1,
                value: "default",
                label: "Default"
            }))
        }
    }, [cate])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_scroll')}>
                <CategoryHeader/>
            </div>
            <Filter/>
            {loading ? (
                <div className={cx('pending')}>
                    <Loading/>
                </div>
            ) : (
                <PaginatedItems itemsPerPage={21} items={data}/>
            )}
        </div>
    );
}

export default memo(Product);