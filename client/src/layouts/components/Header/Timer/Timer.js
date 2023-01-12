import styles from './Timer.module.scss';
import classNames from 'classnames/bind';

import { useDispatch, useSelector } from "react-redux";
import { switchMode } from "../../../../redux/actions";
import { useEffect, useState } from "react";

const cx = classNames.bind(styles)

function Timer() {
    const [time, setTime] = useState("")
    const [night, setNight] = useState()

    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    
    const dispatch = useDispatch()


    useEffect(() => {
        const currentTimeSet = setInterval(() => {
          const currentTime = new Date();
          const currentHours = currentTime.getHours()

          if(currentHours >= 18 && currentHours < 5 && mode === false) {
            dispatch(switchMode(false));
          }
          
          if(currentHours >= 5 && currentHours < 18 && mode === true && !localStorage.getItem('mode')) {
            dispatch(switchMode(true));
          }
          
          setNight(currentHours >= 5 && currentHours < 18 ? false : true)
          setTime(currentTime.toLocaleTimeString(undefined, {hour: '2-digit', minute: '2-digit'}));
        }, 1000);
      
        // Trả về một hàm để clearInterval khi component unmount
        return () => clearInterval(currentTimeSet);
    });
    return ( 
        <div className={cx('current-time')}><span className={cx('time')}>{time}</span> <span className={cx('day-state')}>{night ? '🌑' : '🌞'}</span></div>
    );
}

export default Timer;