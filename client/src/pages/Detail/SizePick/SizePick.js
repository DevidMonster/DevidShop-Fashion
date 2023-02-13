import styles from './SizePick.module.scss';
import classNames from 'classnames/bind';
import { useState, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import detail from '../../../redux/detail';

const cx = classNames.bind(styles)

function SizePick({ data = [] }) {
    const [pick, setPick] = useState(data[0] || {})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(detail.actions.addSize(pick))
    }, [pick])

    return ( 
        <div className={cx('size_wrapper')}>
            {data.map((size, index) => (
                <label htmlFor={`sized${index}`} key={index} className={cx('size_box')}>
                    <input type={"radio"} className={cx('size_input')} value={size} checked={pick._id === size._id} name="sized" id={`sized${index}`} onChange={() => setPick(size)}/>
                    <span className={cx('size_title')} >{size.size_code}</span>
                </label>
            ))}
        </div>
    );
}

export default memo(SizePick);