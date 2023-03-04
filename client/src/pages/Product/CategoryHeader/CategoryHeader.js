import styles from './CategoryHeader.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import * as request from '../../../utils/httpRequest';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCateGorySelected } from '../../../redux/selectors';
import reducers from '../../../redux/reducer'; 
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles)

function CategoryHeader() {
    const cate = useSelector(setCateGorySelected)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const fetchAPI = async () => {
            const dataResult = await request.get("/category")
            setData(dataResult)
            setLoading(false)
        } 
        fetchAPI()

        return () => {
            dispatch(reducers.actions.changeCate('All'))
        }
    }, [])

    const handleSetCate = (item) => {
        navigate(`/product/${item}`)
    }

    return (  
        <div className={cx('wrapper')}>
            <Button className={cx({ active: cate === "All" })} round onClick={() => handleSetCate("All")}>All</Button>
            {loading && 
                <Button round>
                    <p className={cx('loader')}>
                        <span className={cx("dot-1")}></span>
                        <span className={cx("dot-2")}></span>
                        <span className={cx("dot-3")}></span>
                    </p>
                </Button>}
            {data.map(item => (
                <Button className={cx({ active: cate === item.name })} key={item._id} round onClick={() => handleSetCate(item.name)}>{item.name}</Button>
            ))}
        </div>
    );
}

export default memo(CategoryHeader);