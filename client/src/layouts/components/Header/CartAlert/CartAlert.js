import styles from './CartAlert.module.scss';
import classNames from 'classnames/bind';

import { BsCart2 } from '../../../../asset/icons';
import Button from "../../../../components/Button";
import { Wrapper } from "../../../../components/popper";

import Tippy from '@tippyjs/react/headless';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ItemInCart from './ItemInCart';
import { cartsStateSelector, itemUpload } from '../../../../redux/selectors';

const cx = classNames.bind(styles)

function CartAlert() {
    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;

    const item = useSelector(itemUpload)

    const reload = useSelector(cartsStateSelector)

    const [data, setData] = useState(JSON.parse(localStorage.getItem('carts')) || [])

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('carts')) || [])
    }, [item, reload])

    const renderAlert = (attrs) => (
        <div className={cx('alert-list')} tabIndex="-1" {...attrs}>
            <Wrapper className={cx('cart_popup')}>
                {data.length > 0 ? (
                    <div>
                        <h2>{data.length} Item in cart</h2>
                        {data.map((item, index) => (
                            <ItemInCart key={index} item={item}/>
                        ))}
                    </div>
                ) : (
                    <div className={cx('no_result')}>
                        <p>Not item in your cart</p>
                    </div>
                )}
            </Wrapper>
        </div>
    );

    return ( 
        <Tippy
            interactive
            hideOnClick
            theme={mode ? 'light' : 'material'}
            placement="bottom"
            render={(attrs) => renderAlert(attrs)}
        >
            <div className={cx("cart_view")}>
                <Button icon={<BsCart2/>} to={"/cart"}/>
                <span className={cx("total_item")}>{data.length}</span>
            </div>
        </Tippy>
    );
}

export default CartAlert;