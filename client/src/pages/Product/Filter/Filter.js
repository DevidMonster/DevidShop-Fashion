import styles from './Filter.module.scss';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from 'react-redux';
import { setFilterSelected } from '../../../redux/selectors';
import reducers from '../../../redux/reducer'; 
import { RxDot, RxDotFilled } from 'react-icons/rx';
import { useEffect } from 'react';

const cx = classNames.bind(styles)

const options = [
    { id: 1, value: "default", label: "Default" },
    { id: 2, value: "ND", label: "Name Desc" },
    { id: 3, value: "NI", label: "Name Incs" },
    { id: 4, value: "TD", label: "Time Desc" },
    { id: 5, value: "TI", label: "Time Incs" },
    { id: 6, value: "PD", label: "Price Desc" },
    { id: 7, value: "PI", label: "Price Incs" }
]

function Filter() {
    const selected = useSelector(setFilterSelected)
    const dispatch = useDispatch()

    const handleSelected = item => {
        console.log(item)
        dispatch(reducers.actions.selectFilter(item))
    }


    return (
        <div className={cx('wrapper')}>
            <span className={cx('title')}>Choose Filter:</span>
            <div className={cx('option')}>
                {options.map(item => (
                    <label htmlFor={`filter${item.id}`} className={cx('box')} key={item.id}>
                        {item.id === selected.id ? (
                            <RxDotFilled className={cx('fix')}/>
                        ) : (
                            <RxDot className={cx('fix')}/>
                        )}
                        <input type={"radio"} id={`filter${item.id}`} value={item.value} checked={item.id === selected.id} onChange={() => handleSelected(item)}/>
                        <span>{item.label}</span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default Filter;