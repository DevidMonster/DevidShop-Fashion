import styles from './Product.module.scss';
import classNames from 'classnames/bind';
import PaginatedItems from '../../components/PaginatedItems';
import * as request from '../../utils/httpRequest';
import { setCateGorySelected } from '../../redux/selectors';
import reducers from '../../redux/reducer';

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, memo } from 'react';

import CategoryHeader from './CategoryHeader';
import Loading from '../../components/Loading';
import Filter from './Filter';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';

const cx = classNames.bind(styles)

function Product() {
    const cate = useSelector(setCateGorySelected)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [ search ] = useSearchParams()
    let currentSearch = search.get('search') || ''

    const handleDelete = () => {
        navigate('/product')
    }


    const fetchAPI= async () => {
        setLoading(true)  
        if(cate.name === "All") {
            const dataResult = await request.get("/item", {
                params: {
                    search: currentSearch
                },
            })
            setData(dataResult)
        } else {
            const dataResult = await request.get("/item/cate", {
                params: {
                    id: cate._id,
                    search: currentSearch
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
    }, [cate, search])

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_scroll')}>
                <CategoryHeader/>
            </div>
            <Filter/>
            {currentSearch !== '' && (
                <p className={cx('text_result')}>
                    {data.length} Result for search key: "{currentSearch}" 
                    <span className={cx('icon')} onClick={() => handleDelete()}>
                        <MdOutlineCancel/>
                    </span>
                </p>
            )}
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