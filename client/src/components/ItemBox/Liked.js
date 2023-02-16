import styles from './ItemBox.module.scss';
import classNames from 'classnames/bind';

import { useEffect, useState, memo } from "react";
import { MdOutlineFavoriteBorder, MdOutlineFavorite } from "../../asset/icons";

import * as request from '../../utils/httpRequest';
import Button from "../Button";
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import reducers from '../../redux/reducer';

const cx = classNames.bind(styles)

function Liked({ productId, className }) {
    const [likes, setLikes] = useState([])
    const [likeCount, setLikeCount] = useState(likes.length)
    
    let user = useSelector(userSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        if(likes[0] == "") {
            setLikeCount(0)
        } else {
            setLikeCount(likes.length)
        }
    }, [likes])

    useEffect(() => {
        fetchAPI()
    }, [user])

    const fetchAPI = async () => {
        const dataResult = await request.get(`/item/get/${productId}`)
        setLikes(dataResult.liked)
    }

    const postAPI = async (newData) => {
        await request.post("/item/edit", {
            id: productId,
            likes: newData,
        }) 
        fetchAPI()
    }

    const handleLikedProduct = () => {
        const newData = [...likes, user._id].filter(item => item !== "")
        dispatch(reducers.actions.notification({ content: 'Add to favorite' }))
        dispatch(reducers.actions.reRenderComponent())
        postAPI(newData)
    }

    const handleUnLikedProduct = () => {
        const newData = likes.filter(item => item !== user._id)
        dispatch(reducers.actions.notification({ content: 'Unlike Item' }))
        dispatch(reducers.actions.reRenderComponent())
        postAPI(newData)
    }


    const handleAlert = () => {
        dispatch(reducers.actions.notification({ content: "You need to login to use this feature", type: "error" }))
    }

    if(!user) {
        return (
            <div className={cx('wrapper', { [className]: className })}>
                <Button icon={<MdOutlineFavoriteBorder/>} onClick={handleAlert}/>
                <p className={cx('count')}>{likeCount}</p>
            </div>
        )
    }

    return (
        <div className={cx('wrapper', { [className]: className })}>
            {likes.includes(user._id) ? (
                    <Button icon={<MdOutlineFavorite/>} onClick={handleUnLikedProduct}/>
                ) :(
                    <Button icon={<MdOutlineFavoriteBorder/>} onClick={handleLikedProduct}/>
            )}
            <p className={cx('count')}>{likeCount}</p>
        </div>
    )
    
}

export default memo(Liked);