import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/Button';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import * as request from '../../utils/httpRequest';
import ImageSilde from './ImageSilde';
import TitleBox from './TitleBox';
import SizePick from './SizePick';
import ColorPick from './ColorPick';
import QuantityBox from './QuantityBox';
import ReviewBox from './ReviewBox';
import { useScroll } from '../../hooks';
import Loading from '../../components/Loading';
import RelatedProduct from './RelatedProduct';
import detail from '../../redux/detail';
import reducers from '../../redux/reducer';
import Liked from '../../components/Liked';
import BackButton from '../../components/BackButton';
import { colorSelector, quantitySelector, sizeSelector } from '../../redux/selectors';

const cx = classNames.bind(styles)

function Detail() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const currentQuantity = useSelector(quantitySelector) || 1
    const currentColor = useSelector(colorSelector)
    const currentSize = useSelector(sizeSelector)
    const dispatch = useDispatch()
    
    const [id] = useSearchParams()
    useEffect(useScroll, [id])
    
    useEffect(() => {
        if(!!id.get('id')) {
            setLoading(true)
            const fetchAPI = async () => {
                
                const datas = await request.get("/item", {
                    params: {
                        id: id.get('id')
                    }
                })
                setData(datas)
                setLoading(false)
            }
            fetchAPI()
        }
    }, [id])

    const handleSubmit = () => {
        const prevCart = JSON.parse(localStorage.getItem("carts")) || []
       
        if(prevCart.length > 0) {
            const prevItem = prevCart.find(item => item.id === `${id.get('id')}${currentColor.color}${currentSize.size}`)
            if(prevItem) {
                const newQuantity = prevItem.quantity + currentQuantity
                console.log(prevItem.quantity + currentQuantity)
                if(newQuantity > data.quantity) {
                    dispatch(reducers.actions.notification({ content: "Max item in your cart can't add more" }))
                    return
                }
            }
        }

        dispatch(reducers.actions.notification({ content: "Add Item Success", type: "success" }))
        dispatch(detail.actions.addItem({
            id: data._id,
            name: data.name,
            price: data.sale_off === 0 ? data.price : data.price - (data.price * (data.sale_off / 100)),
            image: data.images[0],
            maxQuantity: data.quantity
        }))
    }

    return ( 
        <div className={cx('wrapper')}>
            <BackButton currentPage={"Detail Page"}/>
            <div className={cx('main')}>
                {loading ? (
                    <div className={cx('pending')}>
                        <Loading/>
                    </div>
                ) : (
                    <div className={cx('item_detail_box')}>
                        <div className={cx('item-picture')}>
                            <ImageSilde data={data.images} count={data.quantity}/>
                            <Liked productId={data._id}/>
                        </div>
                        <div className={cx('item-description')}>
                            <TitleBox title={"Name "}>
                                <h2 className={cx('item_name')}>{data.name}</h2>
                            </TitleBox>
                            <TitleBox title={"Price "}>
                                {data.sale_off === 0 ? ( 
                                    <p className={cx('item_price')}>{data.price} VNĐ</p>
                                ) : (
                                    <p className={cx('item_price')}><span className={cx('old_price')}>({data.price})</span> {data.price - (data.price * (data.sale_off / 100))} VNĐ</p>
                                )}
                            </TitleBox>
                            <TitleBox title={"Description "}>
                                <p className={cx('item_description')}>{data.description}</p>
                            </TitleBox>
                            <div className={cx('options_detail')}>
                                <TitleBox title={"Size "}>
                                    <SizePick data={data.sizes}/>
                                </TitleBox>
                                <TitleBox title={"Color "}>
                                    <ColorPick data={data.colors}/>
                                </TitleBox>
                            </div>
                            <TitleBox title={"Quantity "}>
                                <QuantityBox quantity={data.quantity}/>
                            </TitleBox>
                            <Button large disibled={data.quantity === 0} onClick={handleSubmit}>Add to cart</Button>
                        </div>
                    </div>
                )}
                <div className={cx('item_review_box')}>
                    <ReviewBox item={data}/>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div className={cx('related_products')}>
                    <RelatedProduct cateId={data.cate_id}/>
                </div>
            </div>
        </div>
     );
}

export default Detail;