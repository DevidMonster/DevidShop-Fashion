import styles from "./CartAlert.module.scss";
import classNames from "classnames/bind";

import { memo } from 'react';
import { Link } from "react-router-dom";


const cx = classNames.bind(styles)

function ItemInCart({ item }) {
    return (
        <Link to="/cart" className={cx('item')}>
            <div className={cx('item_box')}>
                <img src={item.image} alt={item.name}/>
                <div className={cx('info')}>
                    <h2>{item.name}</h2>
                    <p className={cx('item_price')}>{item.price} VNĐ x<span className={cx('item_quantity')}>{item.quantity}</span></p>  
                </div>
            </div>
        </Link>
    )
}

export default memo(ItemInCart);