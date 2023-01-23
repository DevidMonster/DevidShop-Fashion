import styles from './SizePick.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';

const cx = classNames.bind(styles)

function SizePick({ data = [] }) {
    console.log(data)
    const [pick, setPick] = useState([])

    return ( 
        <div className={cx('size_wapper')}>
            {data.map((size, index) => (
                <label htmlFor={`sized ${index}`} key={index} className={cx('size_box')}>
                    <input type={"radio"} className={cx('size_input')} checked={pick.includes(size._id)} id={`sized ${index}`} onChange={() => setPick([size._id])}/>
                    <span className={cx('size_title')} >{size.size_code}</span>
                </label>
            ))}
        </div>
    );
}

export default SizePick;