import styles from './ItemBox.module.scss';
import classNames from 'classnames/bind';

import { BsPlusSquare } from '../../asset/icons';
import { Link } from 'react-router-dom';
import Button from '../Button';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

const cx = classNames.bind(styles)

function ItemBox({ pending = false, item }) {
    if(pending) {
        return (
            <div className={cx('wrapper_pending')}>
                
            </div>
        )
    } else {
        return (  
            <div className={cx('wrapper')}>
                <div className={cx('image_item')}>
                    <img src={item.images[0]} alt={item.name}/>
                    <div className={cx('bg_hover', { disabled: item.quantity === 0 })}>
                        {item.quantity > 0 ? (
                            <Tippy       
                                placement='bottom'        
                                delay={(0, 50)}
                                content={"View Detail"}
                            >
                                <div><Button icon={<BsPlusSquare/>} to={`/detail?id=${item._id}`} className={cx('fix_color')}/></div>
                            </Tippy>
                        ) : (
                            <p>Sold out</p>
                        )}
                    </div>
                </div>
                <h2 className={cx('name_pd')}><Link to={`/detail?id=${item._id}`}>{item.name}</Link></h2>
                {item.sale_off === 0 ? (
                    <p className={cx('item_price')}>{item.price} VNĐ</p>
                ) : (
                    <p className={cx('item_price')}><span className={cx('old_price')}>({item.price})</span> {item.price - (item.price * (item.sale_off / 100))} VNĐ</p>
                )}
            </div>
        );
    }
}

export default ItemBox;