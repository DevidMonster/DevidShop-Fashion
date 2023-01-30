import styles from './ProductBoxShow.module.scss';
import classNames from 'classnames/bind';
import HotProduct from './HotProduct';

import * as request from '../../../utils/httpRequest';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)

function ProductBoxShow() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            let dataResult = await request.get('/item')
            setData(dataResult)
        }
        fetchAPI()
    }, [])

    return (  
        <div className={cx('wrapper')}>
            <HotProduct data={data}/>
        </div>
    );
}

export default ProductBoxShow;