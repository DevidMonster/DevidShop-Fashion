import styles from './Account.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { userSelector } from '../../redux/selectors';

import Avatar from './Avatar/Avatar';
import Profile from './Profile';
import { useScroll } from '../../hooks';

const cx = classNames.bind(styles)

function Account() {
    const getUser = useSelector(userSelector)
    const [user, setUser] = useState(getUser || {})

    const dispatch = useDispatch()

    useEffect(useScroll,[getUser])

    useEffect(() => {
        setUser(getUser || {})
    }, [getUser])

    return (  
        <div className={cx('wrapper')}>
            <Avatar user={user}/>
            <Profile user={user}/>
        </div>
    );
}

export default Account;