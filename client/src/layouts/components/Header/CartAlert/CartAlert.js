import styles from './CartAlert.module.scss';
import classNames from 'classnames/bind';

import { BsCart2 } from '../../../../asset/icons';

import Button from "../../../../components/Button";

const cx = classNames.bind(styles)

function CartAlert() {
    return ( 
        <div className={cx("cart_view")}>
            <Button icon={<BsCart2/>} to={"/cart"}/>
            <span className={cx("total_item")}>0</span>
        </div>
    );
}

export default CartAlert;