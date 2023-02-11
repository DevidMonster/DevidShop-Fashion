import styles from './ProductBoxShow.module.scss';
import classNames from 'classnames/bind';

import CTA from '../../../components/CTA';
import ProductSession from '../../../components/ProductSession';
import images from '../../../asset/images';

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
            <ProductSession data={data} title={'Hot Product'}/>
            <div className={cx('post')}>
                <CTA to={"/sale"} url={images.sale1} title={"50% discount for customers"}/>
                <CTA to={"/product"} url={images.productPic} title={"Many beautiful and outstanding products"}/>
            </div>
            <ProductSession data={data} title={'New Product'}/>
        </div>
    );
}

export default ProductBoxShow;