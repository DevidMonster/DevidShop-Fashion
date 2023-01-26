import styles from './QuantityBox.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

import Button from '../../../components/Button';
import { RiArrowUpSLine, RiArrowDownSLine } from '../../../asset/icons';

const cx = classNames.bind(styles)

function QuantityBox({ quantity }) {
    const [number, setNumber] = useState(0)

    const handleIncrease = () => {
        if(number < quantity) {
            setNumber(prev => parseInt(prev) + 1)
        }
    }

    const handleDecrease = () => {
        if(number > 0) {
            setNumber(prev => parseInt(prev) - 1)
        }
    }

    const changeQuantity = (e) => {
        if(e.currentTarget.value >= 0 && e.currentTarget.value <= quantity) {
            setNumber(e.currentTarget.value)
        }
    }

    return (  
        <div className={cx('wrapper')}>
            <Button text icon={<RiArrowDownSLine/>} onClick={handleDecrease} className={cx('des_btn')}/>
            <div className={cx('number')}>
                <input type={"number"} value={number} onChange={e => changeQuantity(e)} className={cx('quantity_input')}/>
            </div>
            <Button text icon={<RiArrowUpSLine/>} onClick={handleIncrease} className={cx('inc_btn')}/>
        </div>
    );
}

export default QuantityBox;