import styles from './CategoryHeader.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import * as request from '../../../utils/httpRequest';
import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCateGorySelected } from '../../../redux/selectors';
import reducers from '../../../redux/reducer';

const cx = classNames.bind(styles)

function CategoryHeader() {
    const cate = useSelector(setCateGorySelected)
    const dispatch = useDispatch()

    console.log(cate)
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const dataResult = await request.get("/category")
            setData(dataResult)
        } 
        fetchAPI()
    }, [])

    const handleSetCate = (item) => {
        dispatch(reducers.actions.changeCate(item))
    }

    return (  
        <div className={cx('wrapper')}>
            <Button className={cx({ active: cate.name === "All" })} round onClick={() => handleSetCate({_id: "lord", name: "All"})}>All</Button>
            {data.map(item => (
                <Button className={cx({ active: cate.name === item.name })} key={item._id} round onClick={() => handleSetCate(item)}>{item.name}</Button>
            ))}
        </div>
    );
}

export default CategoryHeader;