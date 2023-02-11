import styles from './RelatedProduct.module.scss';
import classNames from "classnames/bind";
import ProductSession from '../../../components/ProductSession';
import * as request from '../../../utils/httpRequest';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles)

function RelatedProduct({cateId}) {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchAPI = async () => {
            const dataResult = await request.get("/item/cate", {
                params: {
                    id: cateId
                }
            })
            setData(dataResult)
        } 
        fetchAPI()
    }, [cateId])

    return (
        <div className={cx('wrapper')}>
            <ProductSession data={data} title={"Related Products"}/>
        </div>
    )
}

export default RelatedProduct;