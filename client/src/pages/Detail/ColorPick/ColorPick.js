import styles from './ColorPick.module.scss';
import classNames from 'classnames/bind'
import { useState, memo } from 'react';

const cx = classNames.bind(styles)

function ColorPick({ data = [] }) {
    const [pick, setPick] = useState([])

    return (  
        <div className={cx('color_wrapper')}>
            {data.map((color, index) => (
                <label htmlFor={`colord${index}`} key={index} className={cx('color_box')}>
                    <input type={"radio"} className={cx('color_input')} checked={pick.includes(color._id)} id={`colord${index}`} onChange={() => setPick([color._id])}/>
                    <span className={cx('color_title')} style={{ backgroundColor: `#${color.hex_code}` }}></span>
                </label>
            ))}
        </div>
    ); 
}

export default memo(ColorPick);