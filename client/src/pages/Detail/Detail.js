import styles from './Detail.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/Button';
import { AiOutlineLeft } from '../../asset/icons';

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

const cx = classNames.bind(styles)

function Detail() {
    const [data, setData] = useState([]);
    const prevUrl = useSelector(prevUrlSelector)
    const navigate = useNavigate()
    
    const [id] = useSearchParams()
    console.log(id.get('id'))
    useEffect(() => {
        const fetchAPI = async () => {
            const datas = await request.get("/item", {
                params: {
                    id: id.get('id')
                }
            })
            setData(datas)
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
            </div>
            <div className={cx('main')}>
                <div className={cx('item_detail_box')}>
                    <div className={cx('item-picture')}>
                        <ImageSilde data={data.images}/>
                    </div>
                    <div className={cx('item-description')}>
                        <TitleBox title={"Name "}>
                            <h2 className={cx('item_name')}>{data.name}</h2>
                        </TitleBox>
                        <TitleBox title={"Price "}>
                            <p className={cx('item_price')}>{data.price} VNĐ</p>
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
                        <Button large>Add to cart</Button>
                    </div>
                </div>
                <div className={cx('description_box')}>

                </div>
                <div className={cx('comment_box')}>
                </div>
            </div>
            <div className={cx('bottom')}>
                <div className={cx('related_products')}>
                </div>
            </div>
        </div>
     );
}

export default Detail;