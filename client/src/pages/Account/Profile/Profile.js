import styles from './Profile.module.scss'
import className from 'classnames/bind';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import reducer from '../../../redux/reducer';

import Button from '../../../components/Button';
import * as request from '../../../utils/httpRequest.js';
import Loading from '../../../components/Loading';

const cx = className.bind(styles);

function Profile({ user }) {
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [err, setErr] = useState({})

    const dispatch = useDispatch()

    useEffect(() => {
        setUserName(user.name)
        setEmail(user.email)
        setPhoneNumber(user.phoneNumber)
        setAddress(user.address)
    }, [editing])

    const saveProfile = async () => {
        const profile = {
            id: user._id,
            name: userName,
            email: email,
            phoneNumber: phoneNumber,
            address: address
        }
        setLoading(true)
        const newUser = await request.put('/general/user/profile', {
            ...profile
        })
        setLoading(false)
        setEditing(false)
        dispatch(reducer.actions.notification({ content: 'Update Profile Success', type: 'success' }))
        dispatch(reducer.actions.currentUser(newUser))
    }

    return (  
        <div className={cx('wrapper')}>
            <h1>Your Profile</h1>
            <div className={cx('profile_info')}>
                {loading && (
                    <div className={cx('pending')}>
                        <Loading/>
                    </div>
                )}
                <div className={cx('form-group')}>
                    <label htmlFor='userName'>User Name</label>
                    {!editing? (
                        <h2>{user.name}</h2>
                    ) : (
                        <input type="text" placeholder='Enter user Name' name="userName" id="userName" value={userName} onChange={e => setUserName(e.target.value)} required/>
                    )}
                    <span>{err.name}</span>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor='email'>Email</label>
                    {!editing? (
                        <h2>{user.email}</h2>
                    ) : (
                        <input type="email" placeholder='Eg. aaa@gmail.com' name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    )}
                    <span>{err.email}</span>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor='phoneNumber'>Phone Number</label>
                    {!editing? (
                        <h2>{user.phoneNumber}</h2>
                    ) : (
                        <input type="tel" name="phoneNumber" placeholder='(+84) *********' id="phoneNumber" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                    )}
                    <span>{err.phone}</span>
                </div>
                <div className={cx('form-group')}>
                    <label htmlFor='address'>Address</label>
                    {!editing? (
                        <h2>{user.address || "Not address"}</h2>
                    ) : (
                        <input type="text" name="address" placeholder='Your Location' id="address" value={address || ""} onChange={e => setAddress(e.target.value)}/>
                    )}
                    <span>{err.address}</span>
                </div>
                {editing? (
                    <div>
                        <Button onClick={() => setEditing(false)}>Cancel</Button>
                        <Button onClick={saveProfile}>Save</Button>
                    </div>
                        ): (
                    <div>
                        <Button onClick={() => setEditing(true)}>Edit Profile</Button>
                        <Button>Change Password</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Profile;