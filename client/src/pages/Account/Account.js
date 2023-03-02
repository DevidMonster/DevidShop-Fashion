import styles from './Account.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadImage } from '../../hooks';
import Tippy from '@tippyjs/react/headless';
import * as request from '../../utils/httpRequest';

import { userSelector } from '../../redux/selectors';
import images from '../../asset/images';
import { AiFillEdit } from '../../asset/icons';
import Button from '../../components/Button';
import reducers from '../../redux/reducer';

const cx = classNames.bind(styles)

function Account() {
    const getUser = useSelector(userSelector)
    const [user, setUser] = useState(getUser || {})
    const [show, setShow] = useState(false)
    const [newAvatar, setNewAvatar] = useState("")

    let mode = useSelector(state => state.active) || false
    if(localStorage.getItem('mode'))  mode = localStorage.getItem('mode') === "true" ? true : false;
    const dispatch = useDispatch()

    const getNewImage = useUploadImage()

    const uploadImage = async (e) => {
        const newImage = await getNewImage(e.target.files)
        setNewAvatar(newImage)
    }

    const saveImage = async () => {
        const res = await request.put("/general/user/img", {
            id: user._id,
            avatar: newAvatar
        })
        dispatch(reducers.actions.currentUser(res))
        setShow(false)
        setNewAvatar("" )
    }

    useEffect(() => {
        setUser(getUser || {})
    }, [getUser])

    return (  
        <div className={cx('wrapper')}>
            <div className={cx('header')}>   
                <div className={cx('avatar')}>
                    <img src={user.avatar || images.user} alt={user.name}/>
                    <Tippy
                        interactive
                        theme={mode ? 'light' : 'material'}
                        placement="bottom"
                        render={(attrs) => (
                            <Button className={cx('edit')} onClick={() => setShow(prev => !prev)}>Upload Image</Button>
                        )}
                    >
                        <span>Edit Avatar <AiFillEdit/></span>
                    </Tippy>
                    {show && (
                        <div className={cx('image_popup')}>
                            <Button onClick={() => setShow(false)}>Close</Button>
                            <input type="file" multiple onChange={e => uploadImage(e)}/>
                            <img src={newAvatar}/>
                            <Button className={cx('cancel')} onClick={() => setNewAvatar("")}>Cancel</Button>
                            <Button className={cx('save')} onClick={() => saveImage()}>Save</Button>
                        </div>
                    )}
                </div>
                <div className={cx('name_info')}>
                    <h1>{user.name}</h1>
                    <p>{user.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Account;