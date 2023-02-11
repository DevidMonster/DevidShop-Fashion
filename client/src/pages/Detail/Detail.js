import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import { AiOutlineLeft, AiOutlineRight } from '../../asset/icons';

import { useSelector } from 'react-redux';
import { prevUrlSelector } from '../../redux/selectors';
import { useNavigate } from 'react-router-dom';
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

const cx = classNames.bind(styles)

function Detail() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false)
    const prevUrl = useSelector(prevUrlSelector)
    const navigate = useNavigate()
    
    const [id] = useSearchParams()
    console.log(id.get('id'))
    useEffect(useScroll, [])
    
    useEffect(() => {
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
    }, [id])


    const handleGoBack = () => {
        navigate(`${prevUrl}`)
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('top')}>
                <Button leftIcon={<AiOutlineLeft/>} text onClick={handleGoBack}>
                    Go back
                </Button>
                <span className={cx('nav_prev')}>
                    <p>{prevUrl === "/" ? "Home" : prevUrl.slice(1, prevUrl.length)} <AiOutlineRight/> Detai Page</p>
                </span>
            </div>
            <div className={cx('main')}>
                {loading ? (
                    <div className={cx('pending')}>
                        <Loading/>
                    </div>
                ) : (
                    <div className={cx('item_detail_box')}>
                        <div className={cx('item-picture')}>
                            <ImageSilde data={data.images} count={data.quantity}/>
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
                            <Button large disibled={data.quantity === 0}>Add to cart</Button>
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