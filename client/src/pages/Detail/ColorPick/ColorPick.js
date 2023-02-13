import styles from './ColorPick.module.scss';
import classNames from 'classnames/bind'
import { useState, memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import detail from '../../../redux/detail';

const cx = classNames.bind(styles)

function ColorPick({ data = [] }) {
    const [pick, setPick] = useState(data[0] || {})
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(detail.actions.addColor(pick))
    }, [pick])

    return (  
        <div className={cx('color_wrapper')}>
            {data.map((color, index) => (
                <label htmlFor={`colord${index}`} key={index} className={cx('color_box')}>
                    <input type={"radio"} className={cx('color_input')} value={color} checked={pick._id === color._id} name="colord" id={`colord${index}`} onChange={() => setPick(color)}/>
                    <span className={cx('color_title')} style={{ backgroundColor: `#${color.hex_code}` }}></span>
                </label>
            ))}
        </div>
    ); 
}

export default memo(ColorPick);