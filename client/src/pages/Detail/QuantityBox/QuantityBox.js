import styles from './QuantityBox.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';

import Button from '../../../components/Button';
import { RiArrowUpSLine, RiArrowDownSLine } from '../../../asset/icons';

const cx = classNames.bind(styles)

function QuantityBox({ quantity }) {
    const [number, setNumber] = useState(0)

    useEffect(() => {
        if(number === "") {
            setNumber(0)
        }
    }, [number]) 

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
            <div className={cx('action')}>
                <Button text icon={<RiArrowDownSLine/>} onClick={handleDecrease} className={cx('des_btn')}/>
                <div className={cx('number')}>
                    <input type={"number"} value={number} defaultValue={0} onChange={e => changeQuantity(e)} className={cx('quantity_input')}/>
                </div>
                <Button text icon={<RiArrowUpSLine/>} onClick={handleIncrease} className={cx('inc_btn')}/>
            </div>
            <p>Number of products: {quantity}</p>
        </div>
    );
}

export default memo(QuantityBox);