import styles from './QuantityBox.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState, memo } from 'react';

import Button from '../../../components/Button';
import { RiArrowUpSLine, RiArrowDownSLine } from '../../../asset/icons';
import { useDispatch } from 'react-redux';
import detail from '../../../redux/detail';

const cx = classNames.bind(styles)

function QuantityBox({ quantity }) {
    const [number, setNumber] = useState(1)
    const dispatch = useDispatch()

    useEffect(() => {
        if(number === "") {
            setNumber(1)
            dispatch(detail.actions.addQuantity(1))
        } else {
            dispatch(detail.actions.addQuantity(Number(number)))
        }
    }, [number]) 

    const handleIncrease = () => {
        if(number < quantity) {
            setNumber(prev => parseInt(prev) + 1)
        }
    }

    const handleDecrease = () => {
        if(number > 1) {
            setNumber(prev => parseInt(prev) - 1)
        }
    }

    const changeQuantity = (e) => {
        
        if(e.currentTarget.value >= 1 && e.currentTarget.value <= quantity) {
            setNumber(e.currentTarget.value)
        }
    }

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('action')}>
                <Button type="button" small onClick={handleDecrease} className={cx('des_btn')}><RiArrowDownSLine/></Button>
                <div className={cx('number')}>
                    <input type={"number"} value={number} onChange={e => changeQuantity(e)} name="quantity" className={cx('quantity_input')}/>
                </div>
                <Button type="button" small onClick={handleIncrease} className={cx('inc_btn')}><RiArrowUpSLine/></Button>
            </div>
            <p>Number of products: {quantity}</p>
        </div>
    );
}

export default memo(QuantityBox);