import styles from './Avatar.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import images from '../../../asset/images';
import { AiFillEdit, IoCloseSharp } from '../../../asset/icons';
import Button from '../../../components/Button';
import reducers from '../../../redux/reducer';
import Loading from '../../../components/Loading';
import { useUploadImage } from '../../../hooks';
import * as request from '../../../utils/httpRequest';

const cx = classNames.bind(styles)

function Avatar({ user }) {
    const [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [newAvatar, setNewAvatar] = useState("")

    const dispatch = useDispatch()

    const getNewImage = useUploadImage()

    const uploadImage = async (e) => {
        setLoading(true)
        const newImage = await getNewImage(e.target.files)
        setLoading(false)
        setNewAvatar(newImage)
    }

    const saveImage = async () => {
        setLoading(true)
        const res = await request.put("/general/user/img", {
            id: user._id,
            avatar: newAvatar
        })
        setLoading(false)
        dispatch(reducers.actions.notification({ content: 'Change Avatar Success', type: 'success' }))
        dispatch(reducers.actions.currentUser(res))
        setShow(false)
        setNewAvatar("")
    }

    return (
        <div className={cx('header')}>
            <div className={cx('avatar')}>
                <img src={user.avatar || images.user} alt={user.name} />
                <Button className={cx('edit')} small red rightIcon={<AiFillEdit />} onClick={() => setShow(prev => !prev)}>Edit Avatar</Button>
                {show && (
                    <div className={cx('image_popup')}>
                        <div className={cx('top')}>
                            <h1>Change Avatar</h1>
                            <Button icon={<IoCloseSharp />} onClick={() => {
                                setNewAvatar("")
                                setShow(false)
                            }} />
                        </div>
                        <div className={cx('mid')}>
                            <div>
                                <input type="file" name="file" id="file" className={cx("inputfile")} multiple onChange={e => uploadImage(e)} />
                                <label htmlFor="file">Choose a file</label>
                            </div>
                            <div className={cx('showImage')}>
                                {
                                    loading ? (
                                        <Loading />
                                    ) : (
                                        newAvatar !== "" && (
                                            <img src={newAvatar} />
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className={cx('bot')}>
                            <Button className={cx('cancel')} onClick={() => setNewAvatar("")} disibled={newAvatar === "" ? true : false}>Cancel</Button>
                            <Button className={cx('save')} onClick={() => saveImage()} disibled={newAvatar === "" ? true : false}>Save</Button>
                        </div>
                    </div>
                )}
            </div>
            <div className={cx('name_info')}>
                <h1>{user.name}</h1>
                <p>{user.email}</p>
            </div>
        </div>
    );
}

export default Avatar;